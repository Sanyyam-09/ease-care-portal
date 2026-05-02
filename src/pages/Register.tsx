import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [existingAccount, setExistingAccount] = useState(false);
  const [actionLoading, setActionLoading] = useState<"resend" | "reset" | null>(null);
  const [actionStatus, setActionStatus] = useState<
    | { kind: "resend" | "reset"; status: "success" | "error"; message: string }
    | null
  >(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const { toast } = useToast();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    if (form.password.length < 8) {
      toast({ title: "Password must be at least 8 characters", variant: "destructive" });
      return;
    }
    setLoading(true);
    setExistingAccount(false);
    const { error } = await signUp(form.email, form.password, form.name, form.phone);
    setLoading(false);
    if (error) {
      const code = (error as any)?.code || "";
      const msg = (error?.message || "").toLowerCase();
      if (code === "user_repeated_signup" || msg.includes("already registered") || msg.includes("user already")) {
        setExistingAccount(true);
        toast({
          title: "Email already registered",
          description: "Choose an option below to continue.",
          variant: "destructive",
        });
      } else {
        toast({ title: "Registration failed", description: error.message, variant: "destructive" });
      }
    } else {
      toast({ title: "Account created!", description: "Please check your email to verify your account." });
      navigate("/login");
    }
  };

  const startCooldown = (seconds: number) => {
    setResendCooldown(seconds);
    const interval = setInterval(() => {
      setResendCooldown((s) => {
        if (s <= 1) {
          clearInterval(interval);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const handleResendConfirmation = async () => {
    if (!form.email) {
      setActionStatus({ kind: "resend", status: "error", message: "Enter your email above first." });
      return;
    }
    setActionLoading("resend");
    setActionStatus(null);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: form.email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    setActionLoading(null);
    if (error) {
      const msg = error.message || "Something went wrong. Please try again.";
      setActionStatus({ kind: "resend", status: "error", message: msg });
      toast({ title: "Could not resend", description: msg, variant: "destructive" });
    } else {
      setActionStatus({
        kind: "resend",
        status: "success",
        message: `Confirmation email sent to ${form.email}. Check your inbox (and spam folder).`,
      });
      startCooldown(30);
      toast({ title: "Confirmation email sent" });
    }
  };

  const handleSendReset = async () => {
    if (!form.email) {
      setActionStatus({ kind: "reset", status: "error", message: "Enter your email above first." });
      return;
    }
    setActionLoading("reset");
    setActionStatus(null);
    const { error } = await supabase.auth.resetPasswordForEmail(form.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setActionLoading(null);
    if (error) {
      const msg = error.message || "Something went wrong. Please try again.";
      setActionStatus({ kind: "reset", status: "error", message: msg });
      toast({ title: "Could not send reset email", description: msg, variant: "destructive" });
    } else {
      setActionStatus({
        kind: "reset",
        status: "success",
        message: `Password reset link sent to ${form.email}. Open it to set a new password.`,
      });
      toast({ title: "Password reset email sent" });
    }
  };

  const handleSocialLogin = async (provider: "google" | "apple") => {
    const { error } = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin });
    if (error) toast({ title: `${provider} sign up failed`, description: String(error), variant: "destructive" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="absolute top-6 left-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/" className="gap-2"><ArrowLeft className="h-4 w-4" />Back</Link>
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md">
              <span className="text-xl font-bold text-primary-foreground">C</span>
            </div>
            <span className="text-2xl font-heading font-bold text-foreground">Cureva</span>
          </Link>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-heading">Create your account</CardTitle>
            <CardDescription>Join Cureva for smarter healthcare</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 mb-6">
              <Button variant="outline" className="w-full gap-2" onClick={() => handleSocialLogin("google")}>
                <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
              </Button>
              <Button variant="outline" className="w-full gap-2" onClick={() => handleSocialLogin("apple")}>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                Continue with Apple
              </Button>
            </div>
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or register with email</span></div>
            </div>

            {existingAccount && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>This email is already registered</AlertTitle>
                <AlertDescription className="space-y-3">
                  <p className="text-sm">
                    An account with <span className="font-medium">{form.email}</span> already exists. If you haven't confirmed your email yet, resend the link. If you forgot your password, reset it.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={handleResendConfirmation}
                      disabled={actionLoading !== null || resendCooldown > 0}
                      aria-busy={actionLoading === "resend"}
                    >
                      {actionLoading === "resend" ? (
                        <><Loader2 className="h-3.5 w-3.5 animate-spin" />Sending…</>
                      ) : resendCooldown > 0 ? (
                        `Resend in ${resendCooldown}s`
                      ) : (
                        "Resend confirmation"
                      )}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={handleSendReset}
                      disabled={actionLoading !== null}
                      aria-busy={actionLoading === "reset"}
                    >
                      {actionLoading === "reset" ? (
                        <><Loader2 className="h-3.5 w-3.5 animate-spin" />Sending…</>
                      ) : (
                        "Reset password"
                      )}
                    </Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => navigate("/login")} disabled={actionLoading !== null}>
                      Go to login
                    </Button>
                  </div>

                  {actionStatus && (
                    <div
                      role="status"
                      aria-live="polite"
                      className={`flex items-start gap-2 rounded-md border p-2.5 text-sm ${
                        actionStatus.status === "success"
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                          : "border-destructive/40 bg-destructive/10 text-destructive"
                      }`}
                    >
                      {actionStatus.status === "success" ? (
                        <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                      ) : (
                        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                      )}
                      <span>{actionStatus.message}</span>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="name" placeholder="John Doe" className="pl-10" value={form.name} onChange={(e) => update("name", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@example.com" className="pl-10" value={form.email} onChange={(e) => update("email", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="phone" type="tel" placeholder="+91 98765 43210" className="pl-10" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Min 8 characters" className="pl-10 pr-10" value={form.password} onChange={(e) => update("password", e.target.value)} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="confirmPassword" type="password" placeholder="Re-enter password" className="pl-10" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
              </p>
              <p className="text-sm text-muted-foreground">
                Are you a doctor?{" "}
                <Link to="/doctor-register" className="text-primary font-medium hover:underline">Register as Doctor</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
