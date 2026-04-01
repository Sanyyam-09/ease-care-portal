import { useState } from "react";
import { Search, Pill, ShoppingCart, Truck, Plus, Minus, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const medicines = [
  { name: "Amoxicillin 500mg", category: "Antibiotic", price: 85, available: true, prescription: true },
  { name: "Paracetamol 650mg", category: "Pain Relief", price: 30, available: true, prescription: false },
  { name: "Metformin 500mg", category: "Diabetes", price: 65, available: true, prescription: true },
  { name: "Cetirizine 10mg", category: "Allergy", price: 45, available: true, prescription: false },
  { name: "Omeprazole 20mg", category: "Gastric", price: 120, available: false, prescription: true },
  { name: "Vitamin D3 1000IU", category: "Supplement", price: 250, available: true, prescription: false },
  { name: "Azithromycin 500mg", category: "Antibiotic", price: 95, available: true, prescription: true },
  { name: "Dolo 650", category: "Pain Relief", price: 28, available: true, prescription: false },
];

const Pharmacy = () => {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [showCheckout, setShowCheckout] = useState(false);
  const { toast } = useToast();

  const filtered = medicines.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (name: string) => {
    setCart((c) => ({ ...c, [name]: (c[name] || 0) + 1 }));
    toast({ title: "Added to cart", description: name });
  };
  const removeFromCart = (name: string) => setCart((c) => {
    const n = { ...c };
    if (n[name] > 1) n[name]--;
    else delete n[name];
    return n;
  });

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((total, [name, qty]) => {
    const med = medicines.find((m) => m.name === name);
    return total + (med ? med.price * qty : 0);
  }, 0);

  const handleCheckout = () => {
    setShowCheckout(true);
    setTimeout(() => {
      setCart({});
      setShowCheckout(false);
      toast({ title: "Order placed!", description: "Your medicines will be delivered soon." });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pharmacy</h1>
            <p className="text-muted-foreground mt-1">Order medicines with doorstep delivery</p>
          </div>
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Button className="gap-2" onClick={handleCheckout} disabled={showCheckout}>
                  {showCheckout ? (
                    <><CheckCircle2 className="h-4 w-4 animate-spin" /> Processing...</>
                  ) : (
                    <><ShoppingCart className="h-4 w-4" /> Cart ({cartCount}) · ₹{cartTotal}</>
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search medicines..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((med, i) => (
            <motion.div
              key={med.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-medical-green/10 text-medical-green">
                  <Pill className="h-5 w-5" />
                </div>
                {med.prescription && (
                  <span className="text-xs font-medium text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">Rx Required</span>
                )}
              </div>
              <h3 className="font-semibold text-card-foreground">{med.name}</h3>
              <p className="text-xs text-muted-foreground">{med.category}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-foreground">₹{med.price}</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Truck className="h-3.5 w-3.5" />
                  {med.available ? <span className="text-medical-green">In stock</span> : "Out of stock"}
                </div>
              </div>
              <div className="mt-3">
                {cart[med.name] ? (
                  <div className="flex items-center gap-3">
                    <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => removeFromCart(med.name)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium text-foreground w-6 text-center">{cart[med.name]}</span>
                    <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => addToCart(med.name)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <Button size="sm" className="w-full" disabled={!med.available} onClick={() => addToCart(med.name)}>
                    Add to Cart
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Pharmacy;
