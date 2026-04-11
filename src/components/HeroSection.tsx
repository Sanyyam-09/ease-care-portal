import { Sparkles, Stethoscope, Video, BadgeCheck, Lock, Heart, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import heroDoctor from "@/assets/hero-doctor.png";

const HeroSection = () => {
  const t = useTranslation();

  const trustBadges = [
    { icon: BadgeCheck, label: t("hero.verifiedDoctors") },
    { icon: Lock, label: t("hero.blockchainSecurity") },
    { icon: Heart, label: t("hero.trustedPatients") },
    { icon: Shield, label: t("hero.secureRecords") },
  ];

  return (
    <section className="relative overflow-hidden gradient-hero">
      {/* Floating gradient orbs for depth */}
      <motion.div
        className="absolute top-20 -left-32 w-80 h-80 rounded-full bg-primary/8 blur-3xl pointer-events-none"
        animate={{ y: [0, 30, 0], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 -right-32 w-96 h-96 rounded-full bg-secondary/6 blur-3xl pointer-events-none"
        animate={{ y: [0, -25, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/4 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-medical-teal-light px-4 py-1.5 border border-secondary/20"
            >
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">{t("hero.badge")}</span>
            </motion.div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              {t("hero.title1")}
              <span className="text-gradient">{t("hero.title2")}</span>
              {t("hero.title3")}
            </h1>

            <p className="max-w-lg text-lg text-muted-foreground leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button asChild size="lg" className="gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
                <Link to="/doctors">
                  <Stethoscope className="h-4 w-4" />
                  {t("hero.findDoctor")}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 border-secondary text-secondary hover:bg-secondary/10">
                <Link to="/symptom-checker">
                  <Sparkles className="h-4 w-4" />
                  {t("hero.symptomCheck")}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link to="/video-consultation">
                  <Video className="h-4 w-4" />
                  {t("hero.videoConsult")}
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-4 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {trustBadges.map((badge, i) => (
                <motion.span
                  key={badge.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <badge.icon className="h-4 w-4 text-secondary" />
                  {badge.label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="hidden md:flex justify-center relative"
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
            </div>
            <img
              src={heroDoctor}
              alt="AI healthcare dashboard illustration showing doctor consulting patient digitally"
              className="w-full max-w-md relative z-10 drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
