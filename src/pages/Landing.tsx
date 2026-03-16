import { Siren, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import MedicalScene from "@/components/MedicalScene";

const Landing = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* 3D Background */}
      <MedicalScene />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/70 pointer-events-none" />

      {/* Logo in top-left corner */}
      <div className="absolute top-6 left-6 z-20">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md">
            <span className="text-xl font-bold text-primary-foreground">C</span>
          </div>
        </Link>
      </div>

      {/* Admin login on the right side */}
      <div className="absolute top-6 right-6 z-20">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1.5" asChild>
          <Link to="/admin-login">
            <ShieldCheck className="h-4 w-4" />
            Admin
          </Link>
        </Button>
      </div>

      {/* SOS Button - top right below admin */}
      <div className="absolute top-16 right-6 z-20 mt-2">
        <Button size="sm" variant="destructive" className="gap-1.5 animate-pulse-emergency shadow-lg" asChild>
          <Link to="/emergency">
            <Siren className="h-4 w-4" />
            SOS
          </Link>
        </Button>
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-heading font-extrabold tracking-tight text-foreground drop-shadow-sm">
            Cureva
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl font-heading font-medium text-primary tracking-wide"
          >
            Bridging Tech With Treatment
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-2 max-w-md text-base text-muted-foreground leading-relaxed"
          >
            AI-powered doctor matching, telemedicine, pharmacy, and lab services — all in one secure platform.
          </motion.p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button asChild size="lg" className="min-w-[160px] text-base shadow-md">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-w-[160px] text-base border-primary/30 shadow-md">
            <Link to="/register">Register</Link>
          </Button>
        </motion.div>

        {/* Explore link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-6"
        >
          <Button asChild variant="link" className="text-muted-foreground">
            <Link to="/home">Explore Cureva →</Link>
          </Button>
        </motion.div>
      </div>

      {/* Floating SOS at bottom */}
      <Link
        to="/emergency"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-lg transition-transform hover:scale-110 active:scale-95 animate-pulse-emergency"
        aria-label="Emergency SOS"
      >
        <Siren className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default Landing;
