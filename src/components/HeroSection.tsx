import { Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import heroDoctor from "@/assets/hero-doctor.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left content */}
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
              Your health,{" "}
              <span className="text-primary">one platform</span> away
            </h1>

            <p className="max-w-lg text-lg text-muted-foreground">
              Connect with verified doctors, book telemedicine consultations, order medicines, and get lab tests — all in one secure place.
            </p>

            {/* Search bar */}
            <div className="relative max-w-lg">
              <div className="flex items-center rounded-xl border border-border bg-surface shadow-card transition-shadow focus-within:shadow-card-hover">
                <Search className="ml-4 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search symptoms, doctors, or specialties..."
                  className="flex-1 bg-transparent px-3 py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                <button className="mr-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                  Search
                </button>
              </div>
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

          {/* Right image */}
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
