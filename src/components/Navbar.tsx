import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Siren } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Find Doctors", href: "/doctors" },
  { label: "AI Symptom Checker", href: "/symptom-checker" },
  { label: "Pharmacy", href: "/pharmacy" },
  { label: "Lab Tests", href: "/lab-tests" },
  { label: "Health Awareness", href: "/health-awareness" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">C</span>
          </div>
          <span className="text-xl font-heading font-bold text-foreground">Cureva</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/dashboard">Sign Up</Link>
          </Button>
          <Button size="sm" variant="destructive" className="gap-1.5 animate-pulse-emergency" asChild>
            <Link to="/emergency">
              <Siren className="h-4 w-4" />
              SOS
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button size="sm" variant="destructive" className="gap-1 animate-pulse-emergency" asChild>
            <Link to="/emergency">
              <Siren className="h-4 w-4" />
              SOS
            </Link>
          </Button>
          <button
            className="p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-surface px-4 pb-4 lg:hidden">
          <div className="flex flex-col gap-3 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-muted-foreground py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              <Button variant="ghost" size="sm" className="flex-1" asChild>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}>Login</Link>
              </Button>
              <Button size="sm" className="flex-1" asChild>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}>Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
