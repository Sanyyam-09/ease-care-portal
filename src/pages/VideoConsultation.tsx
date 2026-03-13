import { Video, VideoOff, Mic, MicOff, Phone, FileText, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";

const VideoConsultation = () => {
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [activeTab, setActiveTab] = useState<"chat" | "docs" | "notes">("chat");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-3 h-[calc(100vh-8rem)]">
          {/* Video panels */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Doctor video */}
            <div className="flex-1 rounded-xl bg-foreground/5 border border-border flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold">SC</div>
                <p className="text-foreground font-semibold">Dr. Sarah Chen</p>
                <p className="text-sm text-muted-foreground">Cardiologist</p>
              </div>
              <div className="absolute top-3 right-3 rounded-full bg-medical-green-light px-3 py-1 text-xs font-medium text-medical-green">
                Connected
              </div>
            </div>

            {/* Patient video (small) */}
            <div className="h-32 w-48 rounded-xl bg-foreground/10 border border-border flex items-center justify-center self-end">
              <p className="text-xs text-muted-foreground">You</p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 py-3">
              <Button
                variant={micOn ? "outline" : "destructive"}
                size="icon"
                className="rounded-full h-12 w-12"
                onClick={() => setMicOn(!micOn)}
              >
                {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>
              <Button
                variant={videoOn ? "outline" : "destructive"}
                size="icon"
                className="rounded-full h-12 w-12"
                onClick={() => setVideoOn(!videoOn)}
              >
                {videoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>
              <Button variant="destructive" size="icon" className="rounded-full h-12 w-12">
                <Phone className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Side panel */}
          <div className="rounded-xl border border-border bg-card flex flex-col">
            <div className="flex border-b border-border">
              {[
                { id: "chat" as const, label: "Chat", icon: MessageSquare },
                { id: "docs" as const, label: "Documents", icon: FileText },
                { id: "notes" as const, label: "Rx Notes", icon: FileText },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-3 py-3 text-xs font-medium transition-colors ${
                    activeTab === tab.id ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {activeTab === "chat" && (
                <div className="space-y-3">
                  <div className="bg-muted rounded-lg p-3 text-sm text-foreground">
                    <p className="text-xs font-medium text-primary mb-1">Dr. Sarah Chen</p>
                    Hello! Let me review your reports before we begin.
                  </div>
                </div>
              )}
              {activeTab === "docs" && (
                <div className="space-y-3">
                  <div className="rounded-lg border border-border p-3 text-sm">
                    <p className="font-medium text-foreground">Blood_Test_Report.pdf</p>
                    <p className="text-xs text-muted-foreground">Uploaded 2 days ago</p>
                  </div>
                  <div className="rounded-lg border border-border p-3 text-sm">
                    <p className="font-medium text-foreground">ECG_Report.pdf</p>
                    <p className="text-xs text-muted-foreground">Uploaded 1 week ago</p>
                  </div>
                </div>
              )}
              {activeTab === "notes" && (
                <div className="text-sm text-muted-foreground">
                  <p>Prescription notes will appear here during the consultation.</p>
                </div>
              )}
            </div>

            {activeTab === "chat" && (
              <div className="border-t border-border p-3 flex gap-2">
                <Input placeholder="Type a message..." className="flex-1 text-sm" />
                <Button size="sm">Send</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoConsultation;
