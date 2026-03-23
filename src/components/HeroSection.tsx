import { Sparkles, Stethoscope, Video, UserPlus, Shield, BadgeCheck, Lock, Heart } from "lucide-react";
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
              <span className="text-sm font-medium text-secondary">{t("hero.badge")}</span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              {t("hero.title1")}
              <span className="text-primary">{t("hero.title2")}</span>
              {t("hero.title3")}
            </h1>

            <p className="max-w-lg text-lg text-muted-foreground leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2">
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
                <Link to="/consultation">
                  <Video className="h-4 w-4" />
                  {t("hero.videoConsult")}
                </Link>
              </Button>
            </div>

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
