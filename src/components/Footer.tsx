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

          {[
            { title: "Services", links: ["Find Doctors", "Telemedicine", "Pharmacy", "Lab Tests"] },
            { title: "Company", links: ["About Us", "Careers", "Press", "Contact"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "HIPAA Compliance"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Cureva. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
