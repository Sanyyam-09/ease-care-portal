import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import DoctorSearch from "./pages/DoctorSearch";
import SymptomChecker from "./pages/SymptomChecker";
import VideoConsultation from "./pages/VideoConsultation";
import MedicalRecords from "./pages/MedicalRecords";
import Pharmacy from "./pages/Pharmacy";
import LabTests from "./pages/LabTests";
import EmergencySOS from "./pages/EmergencySOS";
import HealthAwareness from "./pages/HealthAwareness";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/doctors" element={<DoctorSearch />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/consultation" element={<VideoConsultation />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/lab-tests" element={<LabTests />} />
          <Route path="/emergency" element={<EmergencySOS />} />
          <Route path="/health-awareness" element={<HealthAwareness />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
