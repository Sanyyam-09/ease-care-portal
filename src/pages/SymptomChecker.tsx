import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Stethoscope, Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const SymptomChecker = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [listening, setListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    const allMsgs = [...messages, userMsg];
    setMessages(allMsgs);
    setInput("");
    setLoading(true);

    try {
      const systemMsgs = [
        {
          role: "system",
          content: `You are Cureva's AI Symptom Checker. When a user describes symptoms:
1. Analyze the symptoms carefully
2. Suggest which medical specialist they should consult (e.g., Cardiologist, Dermatologist, etc.)
3. Provide a brief explanation of why that specialist is recommended
4. If symptoms seem severe, recommend emergency care
5. Always include a disclaimer that you are not a doctor
6. Be empathetic and concise. Use emoji for readability.
7. Support Hindi and other Indian languages if the user writes in them.`,
        },
      ];

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...systemMsgs, ...allMsgs] }),
      });

      if (!resp.ok) throw new Error("AI service unavailable");

      const reader = resp.body?.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";
      let buffer = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let newlineIdx: number;
          while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
            let line = buffer.slice(0, newlineIdx);
            buffer = buffer.slice(newlineIdx + 1);
            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (!line.startsWith("data: ")) continue;
            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") break;
            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantText += content;
                setMessages((prev) => {
                  const last = prev[prev.length - 1];
                  if (last?.role === "assistant") {
                    return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantText } : m));
                  }
                  return [...prev, { role: "assistant", content: assistantText }];
                });
              }
            } catch {}
          }
        }
      }
      setShowResult(true);
    } catch (e: any) {
      setMessages((prev) => [...prev, { role: "assistant", content: `Sorry, I encountered an error. Please try again.` }]);
    }
    setLoading(false);
  };

  const toggleVoice = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) return;
    if (listening) { recognitionRef.current?.stop(); setListening(false); return; }
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";
    recognition.onresult = (e: any) => { const t = e.results[0][0].transcript; setInput(t); sendMessage(t); };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-IN";
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 container mx-auto px-4 py-8 max-w-3xl flex flex-col"
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">AI Symptom Checker</h1>
          <p className="text-muted-foreground text-sm mt-1">Describe your symptoms to get specialist recommendations</p>
        </div>

        <div ref={scrollRef} className="flex-1 rounded-xl border border-border bg-card p-4 mb-4 overflow-y-auto space-y-4 min-h-[400px] max-h-[60vh]">
          {messages.length === 0 && (
            <div className="text-center text-sm text-muted-foreground py-8">
              <Bot className="h-10 w-10 mx-auto mb-3 text-primary/50" />
              <p className="font-medium">👋 Hi! I'm Cureva's AI Symptom Checker.</p>
              <p className="mt-1">Describe your symptoms and I'll suggest the right specialist for you.</p>
              <p className="mt-1 text-xs">⚠️ This is not a medical diagnosis.</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}>
                {msg.content}
                {msg.role === "assistant" && (
                  <button onClick={() => speak(msg.content)} className="ml-2 inline-flex opacity-50 hover:opacity-100 transition-opacity">
                    <Volume2 className="h-3 w-3" />
                  </button>
                )}
              </div>
              {msg.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <User className="h-4 w-4" />
                </div>
              )}
            </motion.div>
          ))}
          {loading && (
            <div className="flex justify-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-muted rounded-xl px-4 py-3 text-sm text-muted-foreground flex gap-1">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>●</span>
                <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>●</span>
              </div>
            </div>
          )}
          {showResult && !loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center pt-2">
              <Button asChild className="gap-2">
                <Link to="/doctors">
                  <Stethoscope className="h-4 w-4" />
                  Find Doctor
                </Link>
              </Button>
            </motion.div>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="shrink-0" onClick={toggleVoice}>
            {listening ? <MicOff className="h-4 w-4 text-destructive" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your symptoms here..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            className="flex-1"
          />
          <Button onClick={() => sendMessage(input)} size="icon" disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default SymptomChecker;
