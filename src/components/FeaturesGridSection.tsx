import { Brain, Video, Globe, Shield, Pill, FlaskConical, Siren, Landmark, MapPin, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Brain, title: "AI Doctor Matching", description: "Smart AI matches you with the best specialist based on your symptoms." },
  { icon: Video, title: "Video Consultation", description: "Secure HD video calls with licensed doctors anytime, anywhere." },
  { icon: Globe, title: "Multilingual AI Chatbot", description: "Healthcare assistance in your preferred language powered by AI." },
  { icon: Shield, title: "Secure Medical Records", description: "Tamper-proof, patient-owned health records with blockchain verification." },
  { icon: Pill, title: "Pharmacy Delivery", description: "Order medicines online with verified pharmacy doorstep delivery." },
  { icon: FlaskConical, title: "Lab Testing", description: "Book lab tests, home sample collection, and digital reports." },
  { icon: Siren, title: "Emergency SOS", description: "One-tap emergency alert sharing location and medical data." },
  { icon: Landmark, title: "Government Scheme Updates", description: "Stay informed about healthcare subsidies and government programs." },
  { icon: MapPin, title: "NGO Health Camps", description: "Find free health camps and vaccination drives near you." },
  { icon: HeartPulse, title: "Mental Health Support", description: "Access mental health resources, counseling, and wellness tools." },
];

const FeaturesGridSection = () => {
  return (
    <section className="py-20 bg-surface-elevated">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Connected Healthcare Ecosystem</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            A complete healthcare platform built for everyone
          </p>
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              className="rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-card-foreground text-sm">{f.title}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesGridSection;
