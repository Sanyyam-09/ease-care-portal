import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">C</span>
              </div>
              <span className="text-lg font-heading font-bold text-foreground">Cureva</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              AI-powered healthcare platform connecting you with trusted medical professionals.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Services</h4>
            <ul className="mt-3 space-y-2">
              <li><Link to="/doctors" className="text-sm text-muted-foreground transition-colors hover:text-primary">Find Doctors</Link></li>
              <li><Link to="/video-consultation" className="text-sm text-muted-foreground transition-colors hover:text-primary">Telemedicine</Link></li>
              <li><Link to="/pharmacy" className="text-sm text-muted-foreground transition-colors hover:text-primary">Pharmacy</Link></li>
              <li><Link to="/lab-tests" className="text-sm text-muted-foreground transition-colors hover:text-primary">Lab Tests</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Features</h4>
            <ul className="mt-3 space-y-2">
              <li><Link to="/symptom-checker" className="text-sm text-muted-foreground transition-colors hover:text-primary">Symptom Checker</Link></li>
              <li><Link to="/hospital-pricing" className="text-sm text-muted-foreground transition-colors hover:text-primary">Hospital Pricing</Link></li>
              <li><Link to="/government-schemes" className="text-sm text-muted-foreground transition-colors hover:text-primary">Government Schemes</Link></li>
              <li><Link to="/health-awareness" className="text-sm text-muted-foreground transition-colors hover:text-primary">Health Awareness</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Account</h4>
            <ul className="mt-3 space-y-2">
              <li><Link to="/login" className="text-sm text-muted-foreground transition-colors hover:text-primary">Login</Link></li>
              <li><Link to="/register" className="text-sm text-muted-foreground transition-colors hover:text-primary">Register</Link></li>
              <li><Link to="/doctor-register" className="text-sm text-muted-foreground transition-colors hover:text-primary">Doctor Registration</Link></li>
              <li><Link to="/emergency" className="text-sm text-muted-foreground transition-colors hover:text-primary">Emergency SOS</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Cureva. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
