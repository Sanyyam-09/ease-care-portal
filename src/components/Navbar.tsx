import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Siren, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/hooks/useTranslation";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const t = useTranslation();
  const [profile, setProfile] = useState<{ avatar_url: string | null; full_name: string | null } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!user) { setProfile(null); return; }
    supabase.from("profiles").select("avatar_url, full_name").eq("user_id", user.id).maybeSingle()
      .then(({ data }) => { if (data) setProfile(data); });
  }, [user]);

  const initials = profile?.full_name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "U";

  const primaryLinks = [
    { label: t("nav.findDoctors"), href: "/doctors" },
    { label: t("nav.symptomChecker"), href: "/symptom-checker" },
    { label: t("nav.pharmacy"), href: "/pharmacy" },
  ];

  const moreLinks = [
    { label: t("nav.hospitalPricing"), href: "/hospital-pricing" },
    { label: t("nav.govSchemes"), href: "/government-schemes" },
    { label: t("nav.healthAwareness"), href: "/health-awareness" },
  ];

  const allLinks = [...primaryLinks, ...moreLinks];

  return (
    <nav className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? "border-border/50 bg-card/95 backdrop-blur-xl shadow-lg shadow-primary/5" : "border-border bg-card/90 backdrop-blur-lg"}`}>
      <div className={`container mx-auto flex items-center justify-between px-4 transition-all duration-300 ${scrolled ? "h-12" : "h-14"}`}>
        <Link to="/" className="flex items-center gap-2 group">
          <div className={`flex items-center justify-center rounded-lg bg-primary transition-all duration-300 ${scrolled ? "h-7 w-7" : "h-8 w-8"}`}>
            <span className={`font-bold text-primary-foreground transition-all duration-300 ${scrolled ? "text-xs" : "text-sm"}`}>C</span>
          </div>
          <span className={`font-heading font-bold text-foreground transition-all duration-300 ${scrolled ? "text-base" : "text-lg"}`}>Cureva</span>
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          {primaryLinks.map((link) => (
            <Link key={link.href} to={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary outline-none">
              More <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="min-w-[180px]">
              {moreLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link to={link.href} className="w-full">{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="hidden items-center gap-1.5 lg:flex">
          <LanguageSelector />
          <ThemeToggle />
          {user ? (
            <>
              <Link to="/dashboard/profile">
                <Avatar className="h-8 w-8">
                  {profile?.avatar_url && <AvatarImage src={profile.avatar_url} alt="Profile" />}
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">{initials}</AvatarFallback>
                </Avatar>
              </Link>
              <Button variant="ghost" size="sm" asChild><Link to="/dashboard">{t("nav.dashboard")}</Link></Button>
              <Button variant="outline" size="sm" onClick={() => signOut()}>{t("nav.logout")}</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild><Link to="/login">{t("nav.login")}</Link></Button>
              <Button size="sm" asChild><Link to="/register">{t("auth.signUp")}</Link></Button>
            </>
          )}
          <Button size="sm" variant="destructive" className="gap-1 animate-pulse-emergency" asChild>
            <Link to="/emergency"><Siren className="h-4 w-4" />SOS</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <Button size="icon" variant="destructive" className="h-8 w-8 animate-pulse-emergency" asChild>
            <Link to="/emergency"><Siren className="h-4 w-4" /></Link>
          </Button>
          <button className="p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 pb-4 lg:hidden">
          <div className="flex flex-col gap-2 pt-3">
            {allLinks.map((link) => (
              <Link key={link.href} to={link.href} className="text-sm font-medium text-muted-foreground py-2" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <LanguageSelector />
            </div>
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
