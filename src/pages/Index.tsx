import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturesGridSection from "@/components/FeaturesGridSection";
import DoctorsSection from "@/components/DoctorsSection";
import TrustSection from "@/components/TrustSection";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";
import FloatingSOSButton from "@/components/FloatingSOSButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <ServicesSection />
      <FeaturesGridSection />
      <DoctorsSection />
      <TrustSection />
      <StatsSection />
      <Footer />
      <FloatingSOSButton />
    </div>
  );
};

export default Index;
