import { Star, BadgeCheck, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const doctors = [
  {
    name: "Dr. Sarah Chen",
    specialty: "Cardiologist",
    location: "New York, NY",
    rating: 4.9,
    reviews: 312,
    available: true,
    image: "SC",
  },
  {
    name: "Dr. James Okafor",
    specialty: "Dermatologist",
    location: "Los Angeles, CA",
    rating: 4.8,
    reviews: 248,
    available: true,
    image: "JO",
  },
  {
    name: "Dr. Priya Sharma",
    specialty: "Pediatrician",
    location: "Chicago, IL",
    rating: 4.9,
    reviews: 189,
    available: false,
    image: "PS",
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

const DoctorsSection = () => {
  return (
    <section id="doctors" className="py-20 bg-surface-elevated">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">Top-rated doctors</h2>
            <p className="mt-2 text-muted-foreground">Verified professionals ready to help you</p>
          </div>
          <Button variant="outline" size="sm">View all doctors</Button>
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {doctors.map((doc) => (
            <motion.div
              key={doc.name}
              variants={item}
              className="rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                  {doc.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-card-foreground truncate">{doc.name}</h3>
                    <BadgeCheck className="h-4 w-4 text-medical-green shrink-0" />
                  </div>
                  <p className="text-sm text-muted-foreground">{doc.specialty}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {doc.location}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium text-foreground">{doc.rating}</span>
                  <span className="text-xs text-muted-foreground">({doc.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                  {doc.available && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-medical-green-light px-2.5 py-0.5 text-xs font-medium text-medical-green">
                      <span className="h-1.5 w-1.5 rounded-full bg-medical-green" />
                      Available
                    </span>
                  )}
                  <Button size="sm">Book</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DoctorsSection;
