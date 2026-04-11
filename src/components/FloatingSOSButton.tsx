import { forwardRef } from "react";
import { Siren } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FloatingSOSButton = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
    >
      <Link
        to="/emergency"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-lg transition-transform hover:scale-110 active:scale-95 animate-pulse-emergency"
        aria-label="Emergency SOS"
      >
        <Siren className="h-6 w-6" />
      </Link>
    </motion.div>
  );
});

FloatingSOSButton.displayName = "FloatingSOSButton";

export default FloatingSOSButton;
