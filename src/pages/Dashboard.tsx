import { useState, useEffect } from "react";
import { CalendarDays, FileText, Pill, Clock, Upload, Stethoscope, Video } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const quickActions = [
  { label: "Upload Reports", icon: Upload, href: "/medical-records" },
  { label: "Find Specialist", icon: Stethoscope, href: "/doctors" },
  { label: "Book Video Call", icon: Video, href: "/video-consultation" },
  { label: "Book Appointment", icon: CalendarDays, href: "/book-appointment" },
];

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  if (!authLoading && !user) return <Navigate to="/login" replace />;
  const [profile, setProfile] = useState<any>(null);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [recordCount, setRecordCount] = useState(0);
  const [nextAppointment, setNextAppointment] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const [profileRes, apptRes, recRes] = await Promise.all([
        supabase.from("profiles").select("full_name").eq("user_id", user.id).maybeSingle(),
        supabase.from("appointments").select("*, doctors(name, specialty)").eq("patient_id", user.id).eq("status", "confirmed").order("appointment_date", { ascending: true }),
        supabase.from("medical_records").select("id", { count: "exact" }).eq("user_id", user.id),
      ]);
      if (profileRes.data) setProfile(profileRes.data);
      if (apptRes.data) {
        setAppointmentCount(apptRes.data.length);
        setNextAppointment(apptRes.data[0] || null);
      }
      if (recRes.count !== null) setRecordCount(recRes.count);
    };
    fetchData();
  }, [user]);

  const dashboardCards = [
    {
      title: "Upcoming Appointments",
      icon: CalendarDays,
      value: String(appointmentCount),
      subtitle: nextAppointment
        ? `Next: ${(nextAppointment.doctors as any)?.name} – ${nextAppointment.appointment_date}`
        : "No upcoming appointments",
      color: "text-primary bg-primary/10",
    },
    {
      title: "Medical Records",
      icon: FileText,
      value: String(recordCount),
      subtitle: recordCount > 0 ? "View your reports and prescriptions" : "Upload your first document",
      color: "text-medical-green bg-medical-green/10",
    },
    {
      title: "Pharmacy Orders",
      icon: Pill,
      value: "—",
      subtitle: "Order medicines with doorstep delivery",
      color: "text-medical-indigo bg-medical-indigo/10",
    },
    {
      title: "Health Score",
      icon: Clock,
      value: "—",
      subtitle: "Complete your profile for health insights",
      color: "text-primary bg-primary/10",
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}
          </h1>
          <p className="text-muted-foreground mt-1">Here's your health overview</p>
        </motion.div>

        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Button key={action.label} variant="outline" className="gap-2 hover:scale-105 transition-transform" asChild>
              <Link to={action.href}>
                <action.icon className="h-4 w-4" />
                {action.label}
              </Link>
            </Button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${card.color}`}>
                  <card.icon className="h-5 w-5" />
                </div>
                <span className="text-2xl font-bold text-foreground">{card.value}</span>
              </div>
              <h3 className="font-semibold text-card-foreground text-sm">{card.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{card.subtitle}</p>
            </motion.div>
          ))}
        </div>

        {nextAppointment && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl border border-border bg-card p-6 shadow-card"
          >
            <h2 className="text-lg font-semibold text-card-foreground mb-4">Next Appointment</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{(nextAppointment.doctors as any)?.name}</p>
                <p className="text-sm text-muted-foreground">{(nextAppointment.doctors as any)?.specialty}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{nextAppointment.appointment_date}</p>
                <p className="text-xs text-muted-foreground">{nextAppointment.time_slot}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
