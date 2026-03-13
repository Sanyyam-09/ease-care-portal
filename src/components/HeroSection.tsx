import { Search, Sparkles, Stethoscope, Video, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroDoctor from "@/assets/hero-doctor.png";

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
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-medical-indigo-light px-4 py-1.5">
              <Sparkles className="h-4 w-4 text-medical-indigo" />
              <span className="text-sm font-medium text-medical-indigo">AI-Powered Healthcare</span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              Cureva –{" "}
              <span className="text-primary">Bridging Tech</span> With Treatment
            </h1>

            <p className="max-w-lg text-lg text-muted-foreground">
              AI powered doctor matching, telemedicine, pharmacy, and lab services in one platform.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link to="/doctors">
                  <Stethoscope className="h-4 w-4" />
                  Find a Doctor
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link to="/consultation">
                  <Video className="h-4 w-4" />
                  Book Consultation
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="gap-2 border border-border">
                <Link to="/join-doctor">
                  <UserPlus className="h-4 w-4" />
                  Join as Doctor
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-medical-green" />
                2,500+ Verified Doctors
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                24/7 Telemedicine
              </span>
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
              alt="Doctor consulting patient digitally"
              className="w-full max-w-md"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
