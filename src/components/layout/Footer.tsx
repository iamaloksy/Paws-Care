
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-pawscare-50 pt-16">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 font-serif text-2xl font-medium">
              <span className="text-pawscare-500">Paws</span>
              <span>Care</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Helping dogs find their forever homes since 2023. PawsCare is dedicated to rescuing, 
              rehabilitating, and rehoming dogs in need.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="rounded-full bg-white p-2 text-foreground transition-all hover:bg-pawscare-500 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="rounded-full bg-white p-2 text-foreground transition-all hover:bg-pawscare-500 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="rounded-full bg-white p-2 text-foreground transition-all hover:bg-pawscare-500 hover:text-white"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-medium">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/adopt" className="text-sm text-muted-foreground transition-all hover:text-pawscare-500">
                  Adopt a Dog
                </Link>
              </li>
              <li>
                <Link to="/report-stray" className="text-sm text-muted-foreground transition-all hover:text-pawscare-500">
                  Report a Stray
                </Link>
              </li>
              <li>
                <Link to="/lost-found" className="text-sm text-muted-foreground transition-all hover:text-pawscare-500">
                  Lost & Found
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-sm text-muted-foreground transition-all hover:text-pawscare-500">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground transition-all hover:text-pawscare-500">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-medium">Help & Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-all hover:text-pawscare-500">
                  Adoption Process
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-all hover:text-pawscare-500">
                  Donation Information
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-all hover:text-pawscare-500">
                  Volunteer Opportunities
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-all hover:text-pawscare-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-all hover:text-pawscare-500">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-medium">Contact Us</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-pawscare-500" />
                <span className="text-sm text-muted-foreground">
                  123 Rescue Lane, Pet City, PC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-pawscare-500" />
                <span className="text-sm text-muted-foreground">
                  (123) 456-7890
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-pawscare-500" />
                <span className="text-sm text-muted-foreground">
                  hello@pawscare.com
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-pawscare-100 py-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PawsCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
