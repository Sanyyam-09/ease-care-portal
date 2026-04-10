import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Stethoscope, User, HeartPulse, Building2, Pill, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type ResultType = "doctor" | "service" | "symptom";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: ResultType;
  href: string;
}

const SERVICES: SearchResult[] = [
  { id: "s1", title: "Find Doctors", subtitle: "Search specialists near you", type: "service", href: "/doctors" },
  { id: "s2", title: "Symptom Checker", subtitle: "AI-powered health assessment", type: "service", href: "/symptom-checker" },
  { id: "s3", title: "Pharmacy", subtitle: "Order medicines online", type: "service", href: "/pharmacy" },
  { id: "s4", title: "Hospital Pricing", subtitle: "Compare procedure costs", type: "service", href: "/hospital-pricing" },
  { id: "s5", title: "Government Schemes", subtitle: "Health insurance & subsidies", type: "service", href: "/government-schemes" },
  { id: "s6", title: "Health Awareness", subtitle: "Articles & wellness tips", type: "service", href: "/health-awareness" },
  { id: "s7", title: "Video Consultation", subtitle: "Consult doctors online", type: "service", href: "/video-consultation" },
  { id: "s8", title: "Lab Tests", subtitle: "Book diagnostic tests", type: "service", href: "/lab-tests" },
  { id: "s9", title: "Medical Records", subtitle: "Upload & manage records", type: "service", href: "/medical-records" },
  { id: "s10", title: "Emergency SOS", subtitle: "Immediate medical help", type: "service", href: "/emergency" },
];

const SYMPTOMS: SearchResult[] = [
  { id: "sym1", title: "Headache", subtitle: "Check possible causes", type: "symptom", href: "/symptom-checker" },
  { id: "sym2", title: "Fever", subtitle: "Check possible causes", type: "symptom", href: "/symptom-checker" },
  { id: "sym3", title: "Chest Pain", subtitle: "Seek immediate attention", type: "symptom", href: "/symptom-checker" },
  { id: "sym4", title: "Cough & Cold", subtitle: "Check possible causes", type: "symptom", href: "/symptom-checker" },
  { id: "sym5", title: "Back Pain", subtitle: "Check possible causes", type: "symptom", href: "/symptom-checker" },
  { id: "sym6", title: "Stomach Pain", subtitle: "Check possible causes", type: "symptom", href: "/symptom-checker" },
  { id: "sym7", title: "Skin Rash", subtitle: "Check possible causes", type: "symptom", href: "/symptom-checker" },
  { id: "sym8", title: "Breathing Difficulty", subtitle: "Seek immediate attention", type: "symptom", href: "/symptom-checker" },
];

const typeIcon = (type: ResultType) => {
  switch (type) {
    case "doctor": return <User className="h-4 w-4" />;
    case "service": return <Building2 className="h-4 w-4" />;
    case "symptom": return <HeartPulse className="h-4 w-4" />;
  }
};

const typeColor = (type: ResultType) => {
  switch (type) {
    case "doctor": return "bg-primary/10 text-primary";
    case "service": return "bg-secondary/10 text-secondary";
    case "symptom": return "bg-destructive/10 text-destructive";
  }
};

const SmartSearchBar = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); return; }
    setLoading(true);
    const lower = q.toLowerCase();

    // Search local services & symptoms
    const serviceResults = SERVICES.filter(s =>
      s.title.toLowerCase().includes(lower) || s.subtitle.toLowerCase().includes(lower)
    );
    const symptomResults = SYMPTOMS.filter(s =>
      s.title.toLowerCase().includes(lower)
    );

    // Search doctors from DB
    let doctorResults: SearchResult[] = [];
    try {
      const { data } = await supabase
        .from("doctors")
        .select("id, name, specialty, city")
        .or(`name.ilike.%${q}%,specialty.ilike.%${q}%,city.ilike.%${q}%`)
        .limit(5);
      if (data) {
        doctorResults = data.map(d => ({
          id: d.id,
          title: d.name,
          subtitle: `${d.specialty}${d.city ? ` • ${d.city}` : ""}`,
          type: "doctor" as ResultType,
          href: `/doctors`,
        }));
      }
    } catch { /* ignore */ }

    setResults([...doctorResults, ...serviceResults.slice(0, 4), ...symptomResults.slice(0, 3)]);
    setLoading(false);
  }, []);

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => search(query), 200);
    return () => clearTimeout(timeout);
  }, [query, search]);

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    setQuery("");
    navigate(result.href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0 && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className={cn(
        "flex items-center gap-2 rounded-full border bg-muted/50 px-3 transition-all duration-200",
        open ? "border-primary/40 bg-card shadow-md w-64" : "border-transparent hover:border-border w-48"
      )}>
        <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); setSelectedIndex(-1); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search... ⌘K"
          className="h-8 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
        />
        {query && (
          <button onClick={() => { setQuery(""); setResults([]); }} className="text-muted-foreground hover:text-foreground">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {open && (query.trim() || results.length > 0) && (
        <div className="absolute top-full mt-2 left-0 right-0 w-80 -left-8 rounded-xl border border-border bg-card shadow-xl overflow-hidden z-50 animate-fade-in">
          {loading && results.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">Searching...</div>
          )}
          {!loading && results.length === 0 && query.trim() && (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              No results for "{query}"
            </div>
          )}
          {results.length > 0 && (
            <div className="max-h-72 overflow-y-auto py-1">
              {results.map((result, i) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  onMouseEnter={() => setSelectedIndex(i)}
                  className={cn(
                    "flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors",
                    selectedIndex === i ? "bg-muted/60" : "hover:bg-muted/40"
                  )}
                >
                  <div className={cn("flex items-center justify-center h-8 w-8 rounded-lg shrink-0", typeColor(result.type))}>
                    {typeIcon(result.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{result.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{result.subtitle}</p>
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider shrink-0">
                    {result.type}
                  </span>
                </button>
              ))}
            </div>
          )}
          <div className="border-t border-border px-4 py-2 flex items-center justify-between text-[10px] text-muted-foreground/50">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSearchBar;
