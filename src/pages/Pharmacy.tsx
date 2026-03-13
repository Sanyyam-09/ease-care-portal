import { useState } from "react";
import { Search, Pill, ShoppingCart, Truck, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const medicines = [
  { name: "Amoxicillin 500mg", category: "Antibiotic", price: 12.99, available: true, prescription: true },
  { name: "Paracetamol 650mg", category: "Pain Relief", price: 4.50, available: true, prescription: false },
  { name: "Metformin 500mg", category: "Diabetes", price: 8.99, available: true, prescription: true },
  { name: "Cetirizine 10mg", category: "Allergy", price: 6.50, available: true, prescription: false },
  { name: "Omeprazole 20mg", category: "Gastric", price: 9.99, available: false, prescription: true },
  { name: "Vitamin D3 1000IU", category: "Supplement", price: 11.99, available: true, prescription: false },
];

const Pharmacy = () => {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});

  const filtered = medicines.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (name: string) => setCart((c) => ({ ...c, [name]: (c[name] || 0) + 1 }));
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pharmacy</h1>
            <p className="text-muted-foreground mt-1">Order medicines with doorstep delivery</p>
          </div>
          {cartCount > 0 && (
            <Button className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Cart ({cartCount}) · ${cartTotal.toFixed(2)}
            </Button>
          )}
        </div>

        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search medicines..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((med) => (
            <div key={med.name} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-medical-green-light text-medical-green">
                  <Pill className="h-5 w-5" />
                </div>
                {med.prescription && (
                  <span className="text-xs font-medium text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">Rx Required</span>
                )}
              </div>
              <h3 className="font-semibold text-card-foreground">{med.name}</h3>
              <p className="text-xs text-muted-foreground">{med.category}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-foreground">${med.price.toFixed(2)}</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Truck className="h-3.5 w-3.5" />
                  {med.available ? "In stock" : "Out of stock"}
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
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pharmacy;
