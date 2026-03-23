import { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import { CalendarIcon, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM",
  "04:30 PM", "05:00 PM",
];

const BookAppointment = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState("");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const t = useTranslation();

  useEffect(() => {
    supabase.from("doctors").select("*").order("name").then(({ data }) => {
      if (data) setDoctors(data);
    });
    if (user) fetchAppointments();
  }, [user]);

  const fetchAppointments = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("appointments")
      .select("*, doctors(name, specialty)")
      .eq("patient_id", user.id)
      .order("appointment_date", { ascending: true });
    if (data) setAppointments(data);
  };

  const handleBook = async () => {
    if (!user) { toast({ title: "Please login first", variant: "destructive" }); return; }
    if (!selectedDoctor || !date || !timeSlot) {
      toast({ title: "Please fill all fields", variant: "destructive" }); return;
    }
    const { error } = await supabase.from("appointments").insert({
      patient_id: user.id,
      doctor_id: selectedDoctor,
      appointment_date: format(date, "yyyy-MM-dd"),
      time_slot: timeSlot,
    });
    if (error) { toast({ title: "Booking failed", description: error.message, variant: "destructive" }); return; }
    setConfirmed(true);
    fetchAppointments();
    setTimeout(() => { setConfirmed(false); setSelectedDoctor(""); setDate(undefined); setTimeSlot(""); }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground mb-2">{t("booking.title")}</h1>

        {confirmed ? (
          <div className="mt-8 rounded-xl border border-medical-green/30 bg-medical-green/10 p-8 text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-medical-green mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">{t("booking.confirmed")}</h2>
            <p className="text-muted-foreground">You will receive a confirmation shortly.</p>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Select Doctor</label>
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger><SelectValue placeholder="Choose a doctor" /></SelectTrigger>
                <SelectContent>
                  {doctors.map((doc) => (
                    <SelectItem key={doc.id} value={doc.id}>
                      {doc.name} — {doc.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">{t("booking.selectDate")}</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single" selected={date} onSelect={setDate}
                    disabled={(d) => d < new Date() || d > addDays(new Date(), 30)}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">{t("booking.selectTime")}</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.map((slot) => (
                  <Button key={slot} variant={timeSlot === slot ? "default" : "outline"} size="sm"
                    onClick={() => setTimeSlot(slot)} className="gap-1">
                    <Clock className="h-3 w-3" />{slot}
                  </Button>
                ))}
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={handleBook}>{t("booking.confirm")}</Button>
          </div>
        )}

        {/* Existing appointments */}
        {appointments.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-foreground mb-4">{t("booking.yourAppointments")}</h2>
            <div className="space-y-3">
              {appointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                  <div>
                    <p className="font-medium text-foreground">{(apt.doctors as any)?.name}</p>
                    <p className="text-sm text-muted-foreground">{(apt.doctors as any)?.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{apt.appointment_date}</p>
                    <p className="text-xs text-muted-foreground">{apt.time_slot}</p>
                    <span className={`text-xs font-medium ${apt.status === "confirmed" ? "text-medical-green" : "text-muted-foreground"}`}>
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BookAppointment;
