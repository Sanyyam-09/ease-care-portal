import { Heart, Brain, Apple, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  { id: "preventive", label: "Preventive Care", icon: Heart },
  { id: "mental", label: "Mental Health", icon: Brain },
  { id: "nutrition", label: "Nutrition", icon: Apple },
  { id: "myths", label: "Myth vs Reality", icon: AlertTriangle },
];

const videos = [
  { title: "10 Daily Habits for a Healthy Heart", category: "preventive", doctor: "Dr. Sarah Chen", videoId: "dQw4w9WgXcQ", duration: "12:30" },
  { title: "Understanding Anxiety and How to Cope", category: "mental", doctor: "Dr. Lisa Park", videoId: "dQw4w9WgXcQ", duration: "18:45" },
  { title: "Balanced Diet on a Budget", category: "nutrition", doctor: "Dr. Raj Patel", videoId: "dQw4w9WgXcQ", duration: "15:20" },
  { title: "Common Health Myths Debunked", category: "myths", doctor: "Dr. James Okafor", videoId: "dQw4w9WgXcQ", duration: "10:15" },
  { title: "Importance of Regular Screenings", category: "preventive", doctor: "Dr. Emily Wong", videoId: "dQw4w9WgXcQ", duration: "14:00" },
  { title: "Meditation for Beginners", category: "mental", doctor: "Dr. Aisha Khan", videoId: "dQw4w9WgXcQ", duration: "20:30" },
];

const HealthAwareness = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Health Awareness</h1>
        <p className="text-muted-foreground mb-8">Learn from trusted doctors through curated health content</p>

        {/* Category pills */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-card hover:shadow-card-hover transition-shadow cursor-pointer"
            >
              <cat.icon className="h-4 w-4 text-primary" />
              {cat.label}
            </div>
          ))}
        </div>

        {/* Video grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <div key={i} className="rounded-xl border border-border bg-card shadow-card overflow-hidden hover:shadow-card-hover transition-shadow">
              <div className="aspect-video bg-foreground/5 flex items-center justify-center">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-card-foreground text-sm line-clamp-2">{video.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{video.doctor} · {video.duration}</p>
                <span className="mt-2 inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full capitalize">
                  {categories.find((c) => c.id === video.category)?.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HealthAwareness;
