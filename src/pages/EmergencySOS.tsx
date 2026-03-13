import { Siren, MapPin, FileText, Building2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const EmergencySOS = () => {
  const [activated, setActivated] = useState(false);

  const handleSOS = () => {
    setActivated(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center space-y-8">
          {!activated ? (
            <>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Emergency SOS</h1>
                <p className="text-muted-foreground">Press the SOS button to alert nearby hospitals and share your medical data</p>
              </div>

              <button
                onClick={handleSOS}
                className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-lg hover:bg-destructive/90 transition-all hover:scale-105 active:scale-95"
              >
                <div className="text-center">
                  <Siren className="h-12 w-12 mx-auto mb-2" />
                  <span className="text-2xl font-bold">SOS</span>
                </div>
              </button>

              <p className="text-xs text-muted-foreground">This will share your location and medical data with the nearest hospital</p>
            </>
          ) : (
            <div className="space-y-6">
              <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-6">
                <Siren className="h-10 w-10 text-destructive mx-auto mb-3 animate-pulse" />
                <h2 className="text-xl font-bold text-destructive mb-2">SOS Activated</h2>
                <p className="text-sm text-muted-foreground">Emergency services have been notified</p>
              </div>

              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                  <MapPin className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Location Shared</p>
                    <p className="text-xs text-muted-foreground">GPS coordinates sent to nearest hospital</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                  <Building2 className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Hospital Notified</p>
                    <p className="text-xs text-muted-foreground">City General Hospital – 2.3 km away</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                  <FileText className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Medical Data Sent</p>
                    <p className="text-xs text-muted-foreground">Blood type, allergies, conditions shared</p>
                  </div>
                </div>
              </div>

              <Button variant="outline" onClick={() => setActivated(false)} className="w-full">
                Cancel SOS
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencySOS;
