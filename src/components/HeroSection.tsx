import { Sparkles, Stethoscope, Video, UserPlus, Shield, BadgeCheck, Lock, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroDoctor from "@/assets/hero-doctor.png";

const trustBadges = [
  { icon: BadgeCheck, label: "Verified Doctors" },
  { icon: Lock, label: "Blockchain Security" },
  { icon: Heart, label: "Trusted by Patients" },
  { icon: Shield, label: "Secure Records" },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-medical-teal-light px-4 py-1.5">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">AI-Powered Healthcare</span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              Healthcare Made{" "}
              <span className="text-primary">Intelligent</span>, Secure, and Accessible
            </h1>

            <p className="max-w-lg text-lg text-muted-foreground leading-relaxed">
              Cureva connects patients with trusted doctors using AI-powered matchmaking, secure medical records, and integrated pharmacy and lab services.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link to="/doctors">
                  <Stethoscope className="h-4 w-4" />
                  Find a Doctor
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 border-secondary text-secondary hover:bg-secondary/10">
                <Link to="/symptom-checker">
                  <Sparkles className="h-4 w-4" />
                  Start Symptom Check
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="gap-2 border border-border">
                <Link to="/join-doctor">
                  <UserPlus className="h-4 w-4" />
                  Join as Doctor
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {trustBadges.map((badge) => (
                <span key={badge.label} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <badge.icon className="h-4 w-4 text-secondary" />
                  {badge.label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden md:flex justify-center"
          >
            <img
              src={heroDoctor}
              alt="AI healthcare dashboard illustration showing doctor consulting patient digitally"
              className="w-full max-w-md"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
