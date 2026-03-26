import { useState, useEffect } from "react";
import { CalendarDays, Users, Star, Clock, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [doctorProfile, setDoctorProfile] = useState<any>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchDoctorData();
    }
  }, [user]);

  const fetchDoctorData = async () => {
    if (!user) return;

    // Get doctor profile by matching user email or name from profile
    const { data: profile } = await supabase.from("profiles").select("full_name").eq("user_id", user.id).single();
    if (profile?.full_name) {
      const { data: doctor } = await supabase.from("doctors").select("*").ilike("name", `%${profile.full_name}%`).maybeSingle();
      if (doctor) {
        setDoctorProfile(doctor);
        // Fetch appointments for this doctor
        const { data: appts } = await supabase
          .from("appointments")
          .select("*")
          .eq("doctor_id", doctor.id)
          .order("appointment_date", { ascending: true });
        if (appts) setAppointments(appts);

        // Fetch reviews
        const { data: revs } = await supabase
          .from("doctor_reviews")
          .select("*")
          .eq("doctor_id", doctor.id)
          .order("created_at", { ascending: false })
          .limit(10);
        if (revs) setReviews(revs);
      }
    }
  };

  const updateAppointmentStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Failed to update", variant: "destructive" });
    } else {
      toast({ title: `Appointment ${status}` });
      fetchDoctorData();
    }
  };

  const todayAppointments = appointments.filter(a => a.appointment_date === new Date().toISOString().split("T")[0]);
  const upcomingAppointments = appointments.filter(a => a.appointment_date >= new Date().toISOString().split("T")[0] && a.status !== "cancelled");

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome, {doctorProfile?.name || "Doctor"}
          </h1>
          <p className="text-muted-foreground mt-1">Manage your appointments and patient interactions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-primary bg-primary/10">
                <CalendarDays className="h-5 w-5" />
              </div>
              <span className="text-2xl font-bold text-foreground">{todayAppointments.length}</span>
            </div>
            <h3 className="font-semibold text-card-foreground text-sm">Today's Appointments</h3>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-medical-green bg-medical-green/10">
                <Users className="h-5 w-5" />
              </div>
              <span className="text-2xl font-bold text-foreground">{upcomingAppointments.length}</span>
            </div>
            <h3 className="font-semibold text-card-foreground text-sm">Upcoming Appointments</h3>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-amber-500 bg-amber-500/10">
                <Star className="h-5 w-5" />
              </div>
              <span className="text-2xl font-bold text-foreground">{doctorProfile?.rating || 0}</span>
            </div>
            <h3 className="font-semibold text-card-foreground text-sm">Rating</h3>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-primary bg-primary/10">
                <Clock className="h-5 w-5" />
              </div>
              <span className="text-2xl font-bold text-foreground">{doctorProfile?.total_reviews || 0}</span>
            </div>
            <h3 className="font-semibold text-card-foreground text-sm">Total Reviews</h3>
          </div>
        </div>

        {/* Appointments */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">Appointments</h2>
          {appointments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No appointments yet.</p>
          ) : (
            <div className="space-y-3">
              {appointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium text-foreground">{apt.appointment_date}</p>
                    <p className="text-sm text-muted-foreground">{apt.time_slot}</p>
                    {apt.notes && <p className="text-xs text-muted-foreground mt-1">{apt.notes}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      apt.status === "confirmed" ? "bg-medical-green/10 text-medical-green" :
                      apt.status === "cancelled" ? "bg-destructive/10 text-destructive" :
                      apt.status === "rescheduled" ? "bg-amber-500/10 text-amber-600" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {apt.status}
                    </span>
                    {apt.status === "confirmed" && (
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1"
                          onClick={() => updateAppointmentStatus(apt.id, "completed")}>
                          <CheckCircle2 className="h-3 w-3" /> Done
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-destructive"
                          onClick={() => updateAppointmentStatus(apt.id, "cancelled")}>
                          <XCircle className="h-3 w-3" /> Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reviews */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">Recent Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No reviews yet.</p>
          ) : (
            <div className="space-y-3">
              {reviews.map((r) => (
                <div key={r.id} className="border-b border-border pb-3 last:border-0">
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`h-3.5 w-3.5 ${s <= r.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-foreground">{r.review_text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(r.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
