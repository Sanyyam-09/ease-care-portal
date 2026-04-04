import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, Heart, Phone, Shield, X, Plus, Save, Loader2, Camera } from "lucide-react";
import { Navigate } from "react-router-dom";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];
const RELATIONS = ["Spouse", "Parent", "Sibling", "Child", "Friend", "Other"];

interface ProfileData {
  full_name: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  pin_code: string;
  blood_type: string;
  allergies: string[];
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relation: string;
  avatar_url: string;
}

const PatientProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [newAllergy, setNewAllergy] = useState("");
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<ProfileData>({
    full_name: "", phone: "", date_of_birth: "", gender: "",
    address: "", city: "", state: "", pin_code: "",
    blood_type: "", allergies: [], avatar_url: "",
    emergency_contact_name: "", emergency_contact_phone: "", emergency_contact_relation: "",
  });

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user!.id)
      .maybeSingle();
    if (data) {
      setProfile({
        full_name: data.full_name || "",
        phone: data.phone || "",
        date_of_birth: data.date_of_birth || "",
        gender: data.gender || "",
        address: data.address || "",
        city: data.city || "",
        state: data.state || "",
        pin_code: data.pin_code || "",
        blood_type: (data as any).blood_type || "",
        allergies: (data as any).allergies || [],
        avatar_url: data.avatar_url || "",
        emergency_contact_name: (data as any).emergency_contact_name || "",
        emergency_contact_phone: (data as any).emergency_contact_phone || "",
        emergency_contact_relation: (data as any).emergency_contact_relation || "",
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
        date_of_birth: profile.date_of_birth || null,
        gender: profile.gender || null,
        address: profile.address || null,
        city: profile.city || null,
        state: profile.state || null,
        pin_code: profile.pin_code || null,
        blood_type: profile.blood_type || null,
        allergies: profile.allergies.length ? profile.allergies : null,
        emergency_contact_name: profile.emergency_contact_name || null,
        emergency_contact_phone: profile.emergency_contact_phone || null,
        emergency_contact_relation: profile.emergency_contact_relation || null,
      } as any)
      .eq("user_id", user!.id);

    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated", description: "Your changes have been saved." });
    }
  };

  const addAllergy = () => {
    const trimmed = newAllergy.trim();
    if (trimmed && !profile.allergies.includes(trimmed)) {
      setProfile(p => ({ ...p, allergies: [...p.allergies, trimmed] }));
      setNewAllergy("");
    }
  };

  const removeAllergy = (a: string) => {
    setProfile(p => ({ ...p, allergies: p.allergies.filter(x => x !== a) }));
  };

  const update = (field: keyof ProfileData, value: string) => {
    setProfile(p => ({ ...p, [field]: value }));
  };

  if (authLoading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground text-sm">Manage your personal and health information</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Save Changes
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : (
          <div className="grid gap-6">
            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><User className="h-5 w-5 text-primary" /> Personal Information</CardTitle>
                <CardDescription>Basic details about you</CardDescription>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Full Name</Label>
                  <Input value={profile.full_name} onChange={e => update("full_name", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone</Label>
                  <Input value={profile.phone} onChange={e => update("phone", e.target.value)} placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="space-y-1.5">
                  <Label>Date of Birth</Label>
                  <Input type="date" value={profile.date_of_birth} onChange={e => update("date_of_birth", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Gender</Label>
                  <Select value={profile.gender} onValueChange={v => update("gender", v)}>
                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent>{GENDERS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <Label>Address</Label>
                  <Input value={profile.address} onChange={e => update("address", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>City</Label>
                  <Input value={profile.city} onChange={e => update("city", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>State</Label>
                  <Input value={profile.state} onChange={e => update("state", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>PIN Code</Label>
                  <Input value={profile.pin_code} onChange={e => update("pin_code", e.target.value)} />
                </div>
              </CardContent>
            </Card>

            {/* Health Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><Heart className="h-5 w-5 text-destructive" /> Health Information</CardTitle>
                <CardDescription>Blood type and known allergies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Blood Type</Label>
                    <Select value={profile.blood_type} onValueChange={v => update("blood_type", v)}>
                      <SelectTrigger><SelectValue placeholder="Select blood type" /></SelectTrigger>
                      <SelectContent>{BLOOD_TYPES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Allergies</Label>
                  <div className="flex gap-2">
                    <Input value={newAllergy} onChange={e => setNewAllergy(e.target.value)} placeholder="e.g. Penicillin" onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addAllergy())} />
                    <Button type="button" variant="outline" size="icon" onClick={addAllergy}><Plus className="h-4 w-4" /></Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.allergies.map(a => (
                      <Badge key={a} variant="secondary" className="gap-1 pr-1">
                        {a}
                        <button onClick={() => removeAllergy(a)} className="ml-1 hover:text-destructive"><X className="h-3 w-3" /></button>
                      </Badge>
                    ))}
                    {!profile.allergies.length && <span className="text-sm text-muted-foreground">No allergies added</span>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><Phone className="h-5 w-5 text-primary" /> Emergency Contact</CardTitle>
                <CardDescription>Person to contact in case of emergency</CardDescription>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label>Name</Label>
                  <Input value={profile.emergency_contact_name} onChange={e => update("emergency_contact_name", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone</Label>
                  <Input value={profile.emergency_contact_phone} onChange={e => update("emergency_contact_phone", e.target.value)} placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="space-y-1.5">
                  <Label>Relation</Label>
                  <Select value={profile.emergency_contact_relation} onValueChange={v => update("emergency_contact_relation", v)}>
                    <SelectTrigger><SelectValue placeholder="Select relation" /></SelectTrigger>
                    <SelectContent>{RELATIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default PatientProfile;
