import { Video, Pill, FlaskConical, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Stethoscope,
    title: "Find Doctors",
    description: "Browse verified specialists by location, availability, and ratings. Book in-person or online.",
    color: "bg-medical-blue-light text-primary",
  },
  {
    icon: Video,
    title: "Telemedicine",
    description: "Instant video consultations with licensed doctors from the comfort of your home, 24/7.",
    color: "bg-medical-indigo-light text-medical-indigo",
  },
  {
    icon: Pill,
    title: "Pharmacy",
    description: "Order prescriptions and OTC medicines with doorstep delivery. Verified pharmacies only.",
    color: "bg-medical-green-light text-medical-green",
  },
  {
    icon: FlaskConical,
    title: "Lab Tests",
    description: "Book pathology tests, home sample collection, and get digital reports within hours.",
    color: "bg-medical-blue-light text-primary",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Everything you need, in one place
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            A complete healthcare ecosystem designed around your wellbeing.
          </p>
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              className="group rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover cursor-pointer"
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${service.color}`}>
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">{service.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
