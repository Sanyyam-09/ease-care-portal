import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import FloatingSOSButton from "@/components/FloatingSOSButton";
import AIChatbot from "@/components/AIChatbot";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import DoctorSearch from "./pages/DoctorSearch";
import HospitalPricing from "./pages/HospitalPricing";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import SymptomChecker from "./pages/SymptomChecker";
import VideoConsultation from "./pages/VideoConsultation";
import MedicalRecords from "./pages/MedicalRecords";
import Pharmacy from "./pages/Pharmacy";
import LabTests from "./pages/LabTests";
import EmergencySOS from "./pages/EmergencySOS";
import HealthAwareness from "./pages/HealthAwareness";
import BookAppointment from "./pages/BookAppointment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/home" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path="/doctors" element={<DoctorSearch />} />
                <Route path="/hospital-pricing" element={<HospitalPricing />} />
                <Route path="/government-schemes" element={<GovernmentSchemes />} />
                <Route path="/symptom-checker" element={<SymptomChecker />} />
                <Route path="/consultation" element={<VideoConsultation />} />
                <Route path="/medical-records" element={<MedicalRecords />} />
                <Route path="/pharmacy" element={<Pharmacy />} />
                <Route path="/lab-tests" element={<LabTests />} />
                <Route path="/emergency" element={<EmergencySOS />} />
                <Route path="/health-awareness" element={<HealthAwareness />} />
                <Route path="/book-appointment" element={<BookAppointment />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <FloatingSOSButton />
              <AIChatbot />
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
