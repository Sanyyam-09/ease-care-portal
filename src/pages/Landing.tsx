import { Siren, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";
import MedicalScene from "@/components/MedicalScene";
import { useTranslation } from "@/hooks/useTranslation";

const Landing = () => {
  const t = useTranslation();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <MedicalScene />

      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/70 pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 z-20">
        <div className="flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border/50">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md">
              <span className="text-xl font-bold text-primary-foreground">C</span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
            <Button variant="outline" size="sm" className="gap-1.5" asChild>
              <Link to="/admin-login">
                <ShieldCheck className="h-4 w-4" />
                {t("landing.admin")}
              </Link>
            </Button>
            <Button size="sm" variant="destructive" className="gap-1.5 animate-pulse-emergency shadow-lg" asChild>
              <Link to="/emergency">
                <Siren className="h-4 w-4" />
                SOS
              </Link>
            </Button>
          </div>
        </div>
      </div>

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
            {t("landing.tagline")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-2 max-w-md text-base text-muted-foreground leading-relaxed"
          >
            {t("landing.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button asChild size="lg" className="min-w-[160px] text-base shadow-md">
            <Link to="/login">{t("landing.login")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-w-[160px] text-base border-primary/30 shadow-md">
            <Link to="/register">{t("landing.register")}</Link>
          </Button>
        </motion.div>

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
    </div>
  );
};

export default Landing;
