import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Priya Sharma",
    initials: "PS",
    location: "Mumbai",
    rating: 5,
    text: "Cureva made it so easy to find a specialist near me. I booked an appointment in minutes and the video consultation was seamless. Truly a game-changer for healthcare!",
    tag: "Video Consultation",
  },
  {
    name: "Rahul Verma",
    initials: "RV",
    location: "Delhi",
    rating: 5,
    text: "The hospital pricing transparency is incredible. I compared costs across 5 hospitals and saved ₹40,000 on my surgery. No more surprise bills!",
    tag: "Hospital Pricing",
  },
  {
    name: "Ananya Patel",
    initials: "AP",
    location: "Bangalore",
    rating: 5,
    text: "As a working mother, ordering medicines online with doorstep delivery has been a lifesaver. The AI symptom checker also helped me understand my child's condition before the doctor visit.",
    tag: "Pharmacy & AI",
  },
  {
    name: "Suresh Kumar",
    initials: "SK",
    location: "Chennai",
    rating: 4,
    text: "I discovered government health schemes through Cureva that I didn't even know existed. The platform helped my family get coverage worth ₹5 lakhs. Highly recommended!",
    tag: "Govt. Schemes",
  },
  {
    name: "Meera Joshi",
    initials: "MJ",
    location: "Pune",
    rating: 5,
    text: "The emergency SOS feature gave me peace of mind during my father's cardiac episode. Help arrived within minutes. This app literally saved a life.",
    tag: "Emergency SOS",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -60 }),
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Patient Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Trusted by <span className="text-gradient">Thousands</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real experiences from patients across India
          </p>
        </motion.div>

        <div className="relative">
          {/* Quote icon */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Quote className="h-5 w-5 text-primary" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 md:p-12 shadow-card min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-center w-full"
              >
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${
                        s <= t.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-foreground text-base md:text-lg leading-relaxed mb-6 max-w-2xl mx-auto italic">
                  "{t.text}"
                </p>

                <div className="flex items-center justify-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.location}</p>
                  </div>
                  <span className="ml-3 px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                    {t.tag}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-primary" : "w-2 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
