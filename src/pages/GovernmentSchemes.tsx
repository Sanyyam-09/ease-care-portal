import { useState, useEffect } from "react";
import { Shield, ExternalLink, MapPin, IndianRupee, Heart, Droplets, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import { Shield, ExternalLink, MapPin, IndianRupee, Heart, Droplets, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const serviceTypeIcons: Record<string, any> = {
  blood_camp: Droplets,
  free_checkup: Stethoscope,
  medicine_distribution: Heart,
};

const GovernmentSchemes = () => {
  const [schemes, setSchemes] = useState<any[]>([]);
  const [ngoServices, setNgoServices] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const [s, n] = await Promise.all([
        supabase.from("government_schemes").select("*").eq("is_active", true),
        supabase.from("ngo_services").select("*").eq("is_active", true).order("event_date", { ascending: true }),
      ]);
      if (s.data) setSchemes(s.data);
      if (n.data) setNgoServices(n.data);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Government Schemes & NGO Services</h1>
        <p className="text-muted-foreground mb-8">Find healthcare schemes you're eligible for and free medical services near you</p>

        <Tabs defaultValue="schemes">
          <TabsList className="mb-6">
            <TabsTrigger value="schemes">Government Schemes</TabsTrigger>
            <TabsTrigger value="ngo">NGO & Free Services</TabsTrigger>
          </TabsList>

          <TabsContent value="schemes">
            <div className="grid gap-6 md:grid-cols-2">
              {schemes.map((scheme) => (
                <div key={scheme.id} className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">{scheme.name}</h3>
                      {scheme.coverage_amount && (
                        <p className="text-sm text-primary font-medium flex items-center gap-1">
                          <IndianRupee className="h-3 w-3" />Coverage up to ₹{scheme.coverage_amount.toLocaleString("en-IN")}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{scheme.description}</p>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium text-foreground">Eligibility:</span> <span className="text-muted-foreground">{scheme.eligibility_criteria}</span></div>
                    <div><span className="font-medium text-foreground">Benefits:</span> <span className="text-muted-foreground">{scheme.benefits}</span></div>
                  </div>
                  {scheme.applicable_states && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {scheme.applicable_states.map((s: string) => <Badge key={s} variant="outline" className="text-xs">{s}</Badge>)}
                    </div>
                  )}
                  {scheme.website_url && (
                    <Button variant="outline" size="sm" className="mt-4 gap-1" asChild>
                      <a href={scheme.website_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5" />Visit Website
                      </a>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ngo">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ngoServices.map((service) => {
                const Icon = serviceTypeIcons[service.service_type] || Heart;
                return (
                  <div key={service.id} className="rounded-xl border border-border bg-card p-6 shadow-card">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary" className="capitalize">{service.service_type.replace("_", " ")}</Badge>
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-1">{service.ngo_name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1"><MapPin className="h-3 w-3" />{service.location}, {service.city}, {service.state}</div>
                      {service.event_date && <p>📅 {new Date(service.event_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>}
                      {service.event_time && <p>🕐 {service.event_time}</p>}
                      {service.contact_phone && <p>📞 {service.contact_phone}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default GovernmentSchemes;
