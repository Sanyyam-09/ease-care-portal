import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Siren } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/hooks/useTranslation";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const t = useTranslation();

  const navLinks = [
    { label: t("nav.findDoctors"), href: "/doctors" },
    { label: t("nav.hospitalPricing"), href: "/hospital-pricing" },
    { label: t("nav.symptomChecker"), href: "/symptom-checker" },
    { label: t("nav.pharmacy"), href: "/pharmacy" },
    { label: t("nav.govSchemes"), href: "/government-schemes" },
    { label: t("nav.healthAwareness"), href: "/health-awareness" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">C</span>
          </div>
          <span className="text-xl font-heading font-bold text-foreground">Cureva</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSelector />
          <ThemeToggle />
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild><Link to="/dashboard">{t("nav.dashboard")}</Link></Button>
              <Button variant="outline" size="sm" onClick={() => signOut()}>{t("nav.logout")}</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild><Link to="/login">{t("nav.login")}</Link></Button>
              <Button size="sm" asChild><Link to="/register">{t("auth.signUp")}</Link></Button>
            </>
          )}
          <Button size="sm" variant="destructive" className="gap-1.5 animate-pulse-emergency" asChild>
            <Link to="/emergency"><Siren className="h-4 w-4" />SOS</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <LanguageSelector />
          <ThemeToggle />
          <Button size="sm" variant="destructive" className="gap-1 animate-pulse-emergency" asChild>
            <Link to="/emergency"><Siren className="h-4 w-4" />SOS</Link>
          </Button>
          <button className="p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 pb-4 lg:hidden">
          <div className="flex flex-col gap-3 pt-3">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className="text-sm font-medium text-muted-foreground py-2" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              {user ? (
                <>
                  <Button variant="ghost" size="sm" className="flex-1" asChild>
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)}>{t("nav.dashboard")}</Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => { signOut(); setMobileOpen(false); }}>{t("nav.logout")}</Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" className="flex-1" asChild>
                    <Link to="/login" onClick={() => setMobileOpen(false)}>{t("nav.login")}</Link>
                  </Button>
                  <Button size="sm" className="flex-1" asChild>
                    <Link to="/register" onClick={() => setMobileOpen(false)}>{t("auth.signUp")}</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
