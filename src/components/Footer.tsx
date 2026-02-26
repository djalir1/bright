import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Destinations", to: "/destinations" },
  { label: "Tour Packages", to: "/tours" },
  { label: "Our Academy", to: "/academy" },
  { label: "Gallery", to: "/gallery" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => (
  <footer className="section-dark pt-16 pb-8">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div>
          <img src={logo} alt="Bright Horizon" className="h-16 w-auto mb-4 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />
          <p className="font-body text-sm text-section-dark-foreground/70 leading-relaxed mb-3">
            Helping people make memories. Rwanda's premier tour operator offering unforgettable safari and cultural experiences.
          </p>
          <p className="font-display text-sm text-primary italic">
            "Expanding Your World, One Journey at a Time."
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-lg font-semibold text-section-dark-foreground mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {quickLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="font-body text-sm text-section-dark-foreground/70 hover:text-primary transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-lg font-semibold text-section-dark-foreground mb-4">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-section-dark-foreground/70">
              <MapPin size={16} className="text-primary flex-shrink-0" />
              <span className="font-body text-sm">Kigali, Rwanda</span>
            </li>
            <li className="flex items-center gap-2 text-section-dark-foreground/70">
              <Phone size={16} className="text-primary flex-shrink-0" />
              <span className="font-body text-sm">+250 788 000 000</span>
            </li>
            <li className="flex items-center gap-2 text-section-dark-foreground/70">
              <Mail size={16} className="text-primary flex-shrink-0" />
              <span className="font-body text-sm">info@brighthorizon.rw</span>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-display text-lg font-semibold text-section-dark-foreground mb-4">Follow Us</h4>
          <ul className="space-y-2">
            <li><a href="https://wa.me/250788000000" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-section-dark-foreground/70 hover:text-primary transition-colors">WhatsApp</a></li>
            <li><a href="#" className="font-body text-sm text-section-dark-foreground/70 hover:text-primary transition-colors">Instagram</a></li>
            <li><a href="#" className="font-body text-sm text-section-dark-foreground/70 hover:text-primary transition-colors">Facebook</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-section-dark-foreground/10 pt-6 text-center">
        <p className="font-body text-xs text-section-dark-foreground/50">
          © {new Date().getFullYear()} Bright Horizon Travel & Tours. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
