import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users, Stethoscope, CalendarDays, FlaskConical, Pill, ShieldCheck,
  Activity, TrendingUp, LogOut, LayoutDashboard, Settings,
  FileText, Siren, Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const stats = [
  { label: "Total Patients", value: "12,458", icon: Users, trend: "+8.2%" },
  { label: "Active Doctors", value: "342", icon: Stethoscope, trend: "+3.1%" },
  { label: "Appointments Today", value: "186", icon: CalendarDays, trend: "+12%" },
  { label: "Lab Tests Pending", value: "47", icon: FlaskConical, trend: "-5%" },
  { label: "Pharmacy Orders", value: "89", icon: Pill, trend: "+6.4%" },
  { label: "Emergency Alerts", value: "3", icon: Siren, trend: "—" },
];

const sidebarItems = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Patients", icon: Users },
  { label: "Doctors", icon: Stethoscope },
  { label: "Appointments", icon: CalendarDays },
  { label: "Lab Tests", icon: FlaskConical },
  { label: "Pharmacy", icon: Pill },
  { label: "Reports", icon: FileText },
  { label: "Hospitals", icon: Building2 },
  { label: "Emergency", icon: Siren },
  { label: "Settings", icon: Settings },
];

const recentActivity = [
  { text: "Dr. Sharma approved — Cardiology", time: "2 min ago", type: "success" },
  { text: "Emergency SOS triggered — Sector 14", time: "8 min ago", type: "alert" },
  { text: "New patient registration spike — 23 in 1hr", time: "15 min ago", type: "info" },
  { text: "Lab report flagged — abnormal CBC", time: "22 min ago", type: "warning" },
  { text: "Pharmacy restock request — Paracetamol", time: "30 min ago", type: "info" },
];

const AdminDashboard = () => {
  const { user, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate("/admin-login");
  }, [user, loading]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card">
        <div className="flex h-16 items-center gap-2 border-b border-border px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <ShieldCheck className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-heading font-bold text-foreground">Admin Panel</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                item.active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center justify-between border-b border-border bg-card px-6">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-heading font-semibold text-foreground">Dashboard Overview</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user?.email || "admin@cureva.com"}</span>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-primary" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="border-border/50 hover:shadow-card-hover transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-heading font-bold text-foreground mt-1">{stat.value}</p>
                      </div>
                      <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs">
                      <TrendingUp className="h-3 w-3 text-secondary" />
                      <span className="text-secondary font-medium">{stat.trend}</span>
                      <span className="text-muted-foreground">vs last week</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-heading">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex items-start gap-3">
                    <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                      item.type === "alert" ? "bg-destructive" :
                      item.type === "warning" ? "bg-amber-500" :
                      item.type === "success" ? "bg-secondary" : "bg-primary"
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{item.text}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
