import { FlaskConical, Home, Building2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tests = [
  { name: "Complete Blood Count (CBC)", price: 399, popular: true, turnaround: "6 hours" },
  { name: "Thyroid Profile (T3, T4, TSH)", price: 699, popular: true, turnaround: "12 hours" },
  { name: "Diabetes Screening (HbA1c)", price: 549, popular: true, turnaround: "8 hours" },
  { name: "Full Body Checkup", price: 2499, popular: true, turnaround: "24 hours" },
  { name: "Lipid Profile", price: 349, popular: false, turnaround: "6 hours" },
  { name: "Liver Function Test", price: 599, popular: false, turnaround: "8 hours" },
  { name: "Kidney Function Test", price: 549, popular: false, turnaround: "8 hours" },
  { name: "Vitamin D Test", price: 449, popular: false, turnaround: "12 hours" },
];

const LabTests = () => {
  const [booked, setBooked] = useState<string | null>(null);
  const { toast } = useToast();

  const handleBook = (testName: string, type: string) => {
    setBooked(testName);
    toast({ title: "Test Booked!", description: `${testName} — ${type}. You'll receive confirmation shortly.` });
    setTimeout(() => setBooked(null), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Lab Tests</h1>
        <p className="text-muted-foreground mb-8">Book tests, collect samples at home, and get digital reports</p>

        <h2 className="text-xl font-semibold text-foreground mb-4">Popular Tests</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {tests.filter((t) => t.popular).map((test, i) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-medical-indigo/10 text-medical-indigo mb-3">
                <FlaskConical className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-card-foreground text-sm">{test.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">Results in {test.turnaround}</p>
              <div className="mt-3">
                <span className="text-lg font-bold text-foreground">₹{test.price}</span>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 gap-1 text-xs" onClick={() => handleBook(test.name, "Home Visit")}
                  disabled={booked === test.name}>
                  <Home className="h-3 w-3" />Home Visit
                </Button>
                <Button size="sm" className="flex-1 gap-1 text-xs" onClick={() => handleBook(test.name, "Lab Visit")}
                  disabled={booked === test.name}>
                  {booked === test.name ? <CheckCircle2 className="h-3 w-3" /> : <Building2 className="h-3 w-3" />}
                  {booked === test.name ? "Booked!" : "Lab Visit"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-4">All Tests</h2>
        <div className="space-y-3">
          {tests.map((test, i) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-center gap-3">
                <FlaskConical className="h-5 w-5 text-medical-indigo" />
                <div>
                  <h4 className="font-medium text-foreground text-sm">{test.name}</h4>
                  <p className="text-xs text-muted-foreground">Results in {test.turnaround}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-foreground">₹{test.price}</span>
                <Button size="sm" onClick={() => handleBook(test.name, "Lab Visit")} disabled={booked === test.name}>
                  {booked === test.name ? "Booked ✓" : "Book Now"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default LabTests;
