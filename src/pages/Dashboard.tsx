import { CalendarDays, FileText, Pill, Clock, Upload, Stethoscope, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const dashboardCards = [
  {
    title: "Upcoming Appointments",
    icon: CalendarDays,
    value: "2",
    subtitle: "Next: Dr. Sarah Chen – Tomorrow 10:00 AM",
    color: "text-primary bg-medical-blue-light",
  },
  {
    title: "Recent Prescriptions",
    icon: Pill,
    value: "3",
    subtitle: "Last: Amoxicillin 500mg – 2 days ago",
    color: "text-medical-green bg-medical-green-light",
  },
  {
    title: "Lab Reports",
    icon: FileText,
    value: "5",
    subtitle: "New: Blood Test results available",
    color: "text-medical-indigo bg-medical-indigo-light",
  },
  {
    title: "Medication Reminders",
    icon: Clock,
    value: "4",
    subtitle: "Next dose: Metformin at 8:00 PM",
    color: "text-primary bg-medical-blue-light",
  },
];

const quickActions = [
  { label: "Upload Reports", icon: Upload, href: "/medical-records" },
  { label: "Find Specialist", icon: Stethoscope, href: "/doctors" },
  { label: "Book Video Call", icon: Video, href: "/consultation" },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Patient</h1>
          <p className="text-muted-foreground mt-1">Here's your health overview</p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Button key={action.label} variant="outline" className="gap-2" asChild>
              <Link to={action.href}>
                <action.icon className="h-4 w-4" />
                {action.label}
              </Link>
            </Button>
          ))}
        </div>

        {/* Dashboard Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardCards.map((card) => (
            <div key={card.title} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${card.color}`}>
                  <card.icon className="h-5 w-5" />
                </div>
                <span className="text-2xl font-bold text-foreground">{card.value}</span>
              </div>
              <h3 className="font-semibold text-card-foreground text-sm">{card.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{card.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { text: "Video consultation with Dr. James Okafor", time: "2 hours ago", type: "consultation" },
              { text: "Blood test report uploaded", time: "Yesterday", type: "report" },
              { text: "Prescription filled at MedPlus Pharmacy", time: "3 days ago", type: "pharmacy" },
              { text: "Appointment booked with Dr. Priya Sharma", time: "5 days ago", type: "appointment" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                <p className="text-sm text-foreground">{activity.text}</p>
                <span className="text-xs text-muted-foreground shrink-0 ml-4">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
