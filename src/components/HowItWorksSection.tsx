import { Upload, Brain, Video } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Symptoms",
    description: "Describe your symptoms or upload medical reports through our simple interface.",
    color: "bg-medical-blue-light text-primary",
  },
  {
    icon: Brain,
    step: "02",
    title: "AI Matches Specialist",
    description: "Our AI analyzes your inputs and matches you with the best specialist for your condition.",
    color: "bg-medical-indigo-light text-medical-indigo",
  },
  {
    icon: Video,
    step: "03",
    title: "Consult Online",
    description: "Connect with your matched doctor via video consultation from anywhere, anytime.",
    color: "bg-medical-green-light text-medical-green",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">How Cureva Works</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Get quality healthcare in three simple steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative rounded-xl border border-border bg-card p-8 text-center shadow-card"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                Step {s.step}
              </div>
              <div className={`mx-auto mb-4 mt-2 inline-flex h-14 w-14 items-center justify-center rounded-xl ${s.color}`}>
                <s.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
