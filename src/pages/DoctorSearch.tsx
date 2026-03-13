import { useState } from "react";
import { Search, Star, BadgeCheck, MapPin, Filter, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const allDoctors = [
  { name: "Dr. Sarah Chen", specialty: "Cardiologist", location: "New York, NY", rating: 4.9, reviews: 312, experience: "15 years", hospital: "Mount Sinai Hospital", trustScore: 98, available: true, image: "SC" },
  { name: "Dr. James Okafor", specialty: "Dermatologist", location: "Los Angeles, CA", rating: 4.8, reviews: 248, experience: "12 years", hospital: "UCLA Medical Center", trustScore: 96, available: true, image: "JO" },
  { name: "Dr. Priya Sharma", specialty: "Pediatrician", location: "Chicago, IL", rating: 4.9, reviews: 189, experience: "10 years", hospital: "Children's Hospital", trustScore: 97, available: false, image: "PS" },
  { name: "Dr. Michael Brown", specialty: "Orthopedic Surgeon", location: "Houston, TX", rating: 4.7, reviews: 156, experience: "20 years", hospital: "Texas Medical Center", trustScore: 95, available: true, image: "MB" },
  { name: "Dr. Aisha Khan", specialty: "Neurologist", location: "San Francisco, CA", rating: 4.8, reviews: 203, experience: "14 years", hospital: "UCSF Medical", trustScore: 97, available: true, image: "AK" },
  { name: "Dr. Roberto Silva", specialty: "General Physician", location: "Miami, FL", rating: 4.6, reviews: 178, experience: "8 years", hospital: "Jackson Memorial", trustScore: 93, available: true, image: "RS" },
];

const DoctorSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("all");

  const filtered = allDoctors.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = specialty === "all" || d.specialty === specialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Find a Doctor</h1>
        <p className="text-muted-foreground mb-8">Search by symptoms, specialization, or doctor name</p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search symptoms, doctors, specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              <SelectItem value="Cardiologist">Cardiologist</SelectItem>
              <SelectItem value="Dermatologist">Dermatologist</SelectItem>
              <SelectItem value="Pediatrician">Pediatrician</SelectItem>
              <SelectItem value="Neurologist">Neurologist</SelectItem>
              <SelectItem value="Orthopedic Surgeon">Orthopedic Surgeon</SelectItem>
              <SelectItem value="General Physician">General Physician</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doc) => (
            <div key={doc.name} className="rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover">
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
                  <p className="text-xs text-muted-foreground">{doc.experience} experience</p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {doc.location}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{doc.hospital}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium text-foreground">{doc.rating}</span>
                    <span className="text-xs text-muted-foreground">({doc.reviews})</span>
                  </div>
                  <span className="text-xs font-medium text-medical-green">Trust: {doc.trustScore}%</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1">Book Appointment</Button>
                <Button size="sm" variant="outline" className="gap-1">
                  <Video className="h-3.5 w-3.5" />
                  Video
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorSearch;
