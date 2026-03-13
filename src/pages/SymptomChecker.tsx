import { useState } from "react";
import { Send, Bot, User, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

interface Message {
  role: "bot" | "user";
  text: string;
}

const initialMessages: Message[] = [
  { role: "bot", text: "Hello! I'm Cureva's AI Health Assistant. 👋\n\nDescribe your symptoms and I'll help suggest the right specialist for you. Please note: this is not a medical diagnosis." },
];

const SymptomChecker = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulated AI response
    setTimeout(() => {
      const botResponse: Message = {
        role: "bot",
        text: `Based on your symptoms "${input}", here's my analysis:\n\n🔍 **Possible specialist:** Cardiologist\n\n📋 This appears related to cardiovascular health. I recommend consulting a cardiologist for a proper evaluation.\n\n⚠️ If you're experiencing severe chest pain or difficulty breathing, please call emergency services immediately.`,
      };
      setMessages((prev) => [...prev, botResponse]);
      setShowResult(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 max-w-3xl flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">AI Symptom Checker</h1>
          <p className="text-muted-foreground text-sm mt-1">Describe your symptoms to get specialist recommendations</p>
        </div>

        {/* Chat area */}
        <div className="flex-1 rounded-xl border border-border bg-card p-4 mb-4 overflow-y-auto space-y-4 min-h-[400px] max-h-[60vh]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "bot" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {msg.text}
              </div>
              {msg.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {showResult && (
            <div className="flex justify-center pt-2">
              <Button asChild className="gap-2">
                <Link to="/doctors">
                  <Stethoscope className="h-4 w-4" />
                  Find Doctor
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your symptoms here..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
