import { BadgeCheck, Shield, Heart, Lock } from "lucide-react";
import { motion } from "framer-motion";

const trustItems = [
  {
    icon: BadgeCheck,
    title: "Verified Doctors",
    description: "Every doctor is credential-verified with license and background checks.",
    color: "bg-medical-green-light text-medical-green",
    hoverColor: "group-hover:bg-medical-green group-hover:text-primary-foreground",
  },
  {
    icon: Lock,
    title: "Blockchain Security",
    description: "Your medical data is encrypted and stored on tamper-proof blockchain.",
    color: "bg-medical-blue-light text-primary",
    hoverColor: "group-hover:bg-primary group-hover:text-primary-foreground",
  },
  {
    icon: Heart,
    title: "Patient Trust Score",
    description: "Transparent ratings and reviews from real patients build community trust.",
    color: "bg-medical-teal-light text-secondary",
    hoverColor: "group-hover:bg-secondary group-hover:text-secondary-foreground",
  },
  {
    icon: Shield,
    title: "Secure Medical Records",
    description: "Patient-owned records with end-to-end encryption and blockchain verification.",
    color: "bg-medical-indigo-light text-medical-indigo",
    hoverColor: "group-hover:bg-medical-indigo group-hover:text-primary-foreground",
  },
];

const TrustSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Built on Trust</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Your safety and privacy are at the heart of everything we do
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card-premium rounded-xl border border-border bg-card p-8 text-center shadow-card group"
            >
              <div className={`mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-colors duration-300 ${item.color} ${item.hoverColor}`}>
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
