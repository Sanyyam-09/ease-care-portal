import { Shield, Clock, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Users, value: "2.5M+", label: "Patients served" },
  { icon: Award, value: "2,500+", label: "Verified doctors" },
  { icon: Clock, value: "< 15 min", label: "Avg. wait time" },
  { icon: Shield, value: "100%", label: "Data encrypted" },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4 text-primary-foreground">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/15">
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-primary-foreground/75">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
