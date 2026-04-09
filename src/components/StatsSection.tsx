import { Shield, Clock, Users, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { useRef, useEffect, useState } from "react";

const AnimatedStat = ({ icon: Icon, rawValue, label }: { icon: React.ElementType; rawValue: string; label: string }) => {
  // Parse numeric part and suffix (e.g. "2.5M+" → 2.5, "M+")
  const match = rawValue.match(/^([<>]?\s*)(\d+\.?\d*)(.*)/);
  const prefix = match?.[1] || "";
  const num = parseFloat(match?.[2] || "0");
  const suffix = match?.[3] || "";
  const isDecimal = rawValue.includes(".");

  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const { count } = useCountUp(isDecimal ? num * 10 : num, 2000, false);

  useEffect(() => {
    if (inView) {
      // trigger via the hook's started state — we use startOnView=false and manually trigger
    }
  }, [inView]);

  // Re-implement inline for simplicity
  const [displayNum, setDisplayNum] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const target = isDecimal ? num * 10 : num;
    const start = performance.now();
    const duration = 2000;
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayNum(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, num, isDecimal]);

  const formatted = isDecimal ? (displayNum / 10).toFixed(1) : displayNum.toLocaleString();

  return (
    <div ref={containerRef} className="flex items-center gap-4 text-primary-foreground">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/15 backdrop-blur-sm">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-2xl font-bold tabular-nums">
          {prefix}{formatted}{suffix}
        </p>
        <p className="text-sm text-primary-foreground/75">{label}</p>
      </div>
    </div>
  );
};

const stats = [
  { icon: Users, value: "2.5M+", label: "Patients served" },
  { icon: Award, value: "2500+", label: "Verified doctors" },
  { icon: Clock, value: "< 15", label: "Min avg. wait time" },
  { icon: Shield, value: "100%", label: "Data encrypted" },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-primary-foreground/5 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-primary-foreground/5 blur-3xl" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} icon={stat.icon} rawValue={stat.value} label={stat.label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
