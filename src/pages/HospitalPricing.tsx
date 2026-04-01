import { useState, useEffect } from "react";
import { Star, BadgeCheck, Building2, Bed, Gift, ChevronDown, ChevronUp, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";
import { Star, BadgeCheck, Building2, Bed, Gift, ChevronDown, ChevronUp, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const roomTypeLabels: Record<string, string> = {
  general: "General Ward", semi_private: "Semi-Private Room", private: "Private Room", emergency: "Emergency", icu: "ICU",
};

const roomTypeImages: Record<string, string> = {
  general: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop",
  semi_private: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=250&fit=crop",
  private: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=250&fit=crop",
  emergency: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=400&h=250&fit=crop",
};

const HospitalPricing = () => {
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [pricing, setPricing] = useState<any[]>([]);
  const [expandedHospital, setExpandedHospital] = useState<string | null>(null);
  const [procedure] = useState("Leg Bone Fracture Fixation (ORIF)");

  useEffect(() => {
    const fetch = async () => {
      const [h, r, p] = await Promise.all([
        supabase.from("hospitals").select("*").order("rating", { ascending: false }),
        supabase.from("hospital_rooms").select("*"),
        supabase.from("procedure_pricing").select("*").eq("procedure_name", procedure),
      ]);
      if (h.data) setHospitals(h.data);
      if (r.data) setRooms(r.data);
      if (p.data) setPricing(p.data);
    };
    fetch();
  }, []);

  const getRooms = (hospitalId: string) => rooms.filter((r) => r.hospital_id === hospitalId);
  const getPrice = (hospitalId: string) => pricing.find((p) => p.hospital_id === hospitalId);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Hospital Pricing Comparison</h1>
        <p className="text-muted-foreground mb-2">Compare prices for: <strong className="text-foreground">{procedure}</strong></p>
        <p className="text-sm text-muted-foreground mb-8">View room photos, price breakdowns, certificates, and special offers</p>

        <div className="space-y-6">
          {hospitals.map((hospital) => {
            const price = getPrice(hospital.id);
            const hospitalRooms = getRooms(hospital.id);
            const isExpanded = expandedHospital === hospital.id;

            return (
              <div key={hospital.id} className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
                {/* Header */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Building2 className="h-7 w-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-bold text-card-foreground">{hospital.name}</h2>
                          {hospital.certificate_verified && <BadgeCheck className="h-5 w-5 text-medical-green" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{hospital.city}, {hospital.state}</p>
                        {hospital.accreditation && <Badge variant="secondary" className="mt-1">{hospital.accreditation}</Badge>}
                        <div className="flex items-center gap-2 mt-2">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-medium">{hospital.rating}</span>
                          <span className="text-xs text-muted-foreground">({hospital.total_reviews} reviews)</span>
                          <span className="text-xs font-medium text-medical-green ml-2">Trust: {hospital.trust_score}%</span>
                        </div>
                      </div>
                    </div>

                    {price && (
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Estimated Total</p>
                        <p className="text-3xl font-bold text-primary flex items-center justify-end">
                          <IndianRupee className="h-6 w-6" />{(price.total_estimate).toLocaleString("en-IN")}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Offers */}
                  {hospital.offers && hospital.offers.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {hospital.offers.map((offer: string, i: number) => (
                        <div key={i} className="flex items-center gap-1.5 rounded-full bg-medical-green/10 px-3 py-1 text-xs font-medium text-medical-green">
                          <Gift className="h-3 w-3" />{offer}
                        </div>
                      ))}
                    </div>
                  )}

                  <Button variant="ghost" className="mt-4 w-full gap-2" onClick={() => setExpandedHospital(isExpanded ? null : hospital.id)}>
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    {isExpanded ? "Hide Details" : "View Price Breakup & Rooms"}
                  </Button>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-border">
                    {/* Price Breakup */}
                    {price && (
                      <div className="p-6 bg-muted/30">
                        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                          <IndianRupee className="h-4 w-4" />Price Breakup
                        </h3>
                        <div className="grid gap-2 max-w-md">
                          {[
                            { label: "Base Surgery Cost", value: price.base_price },
                            { label: "Surgeon Fee", value: price.surgeon_fee },
                            { label: "Anesthesia", value: price.anesthesia_fee },
                            { label: "Room Charges (3 days)", value: price.room_charges },
                            { label: "Medicines", value: price.medicine_cost },
                            { label: "Nursing Charges", value: price.nursing_charges },
                            { label: "Misc. (tests, consumables)", value: price.misc_charges },
                          ].map((item) => (
                            <div key={item.label} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{item.label}</span>
                              <span className="font-medium text-foreground">₹{(item.value || 0).toLocaleString("en-IN")}</span>
                            </div>
                          ))}
                          <div className="flex justify-between text-sm font-bold border-t border-border pt-2 mt-2">
                            <span className="text-foreground">Total Estimate</span>
                            <span className="text-primary">₹{price.total_estimate.toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                        {price.notes && <p className="text-xs text-muted-foreground mt-3 italic">{price.notes}</p>}
                      </div>
                    )}

                    {/* Rooms */}
                    <div className="p-6">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Bed className="h-4 w-4" />Room Options
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {hospitalRooms.map((room) => (
                          <div key={room.id} className="rounded-lg border border-border overflow-hidden">
                            <img
                              src={room.image_url || roomTypeImages[room.room_type] || roomTypeImages.general}
                              alt={roomTypeLabels[room.room_type]}
                              className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-card-foreground">{roomTypeLabels[room.room_type] || room.room_type}</h4>
                                <span className="text-sm font-bold text-primary">
                                  {room.price_per_day === 0 ? "Free" : `₹${room.price_per_day?.toLocaleString("en-IN")}/day`}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">{room.description}</p>
                              {room.amenities && (
                                <div className="flex flex-wrap gap-1">
                                  {room.amenities.map((a: string, i: number) => (
                                    <Badge key={i} variant="outline" className="text-[10px] px-1.5 py-0">{a}</Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HospitalPricing;
