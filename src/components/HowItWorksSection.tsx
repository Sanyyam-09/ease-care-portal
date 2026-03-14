import { Upload, Brain, Video, Pill, FlaskConical, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Describe Symptoms",
    description: "Describe your symptoms or upload medical reports through our simple interface.",
    color: "bg-medical-blue-light text-primary",
  },
  {
    icon: Brain,
    step: "02",
    title: "AI Recommends Specialist",
    description: "Our AI analyzes your inputs and matches you with the best specialist for your condition.",
    color: "bg-medical-teal-light text-secondary",
  },
  {
    icon: Video,
    step: "03",
    title: "Consult & Recover",
    description: "Connect with your doctor, get treatment, order medicines, and complete lab tests — all in one flow.",
    color: "bg-medical-green-light text-medical-green",
  },
];

const flowSteps = [
  { label: "Patient", icon: HeartPulse },
  { label: "AI", icon: Brain },
  { label: "Doctor", icon: Video },
  { label: "Pharmacy", icon: Pill },
  { label: "Lab", icon: FlaskConical },
  { label: "Recovery", icon: HeartPulse },
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

        <div className="grid gap-8 md:grid-cols-3 mb-16">
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

        {/* Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-border bg-card p-6 shadow-card"
        >
          <p className="text-center text-sm font-medium text-muted-foreground mb-6">Patient Journey Flow</p>
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            {flowSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 sm:gap-4">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-foreground">{step.label}</span>
                </div>
                {i < flowSteps.length - 1 && (
                  <span className="text-muted-foreground text-lg font-light">→</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
