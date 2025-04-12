
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Adopt", href: "/adopt" },
  { name: "Report Stray", href: "/report-stray" },
  { name: "Lost & Found", href: "/lost-found" },
  { name: "Success Stories", href: "/success-stories" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 py-3 shadow-sm backdrop-blur-lg"
          : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-serif text-2xl font-medium"
        >
          <span className="text-pawscare-500">Paws</span>
          <span>Care</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "text-sm font-medium transition-all hover:text-pawscare-500",
                    location.pathname === item.href
                      ? "text-pawscare-500"
                      : "text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <Link
            to="/adopt"
            className="rounded-full bg-pawscare-500 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-pawscare-600"
          >
            Adopt Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-full w-full animate-slide-down bg-white pb-5 pt-3 shadow-lg md:hidden">
          <nav className="container">
            <ul className="flex flex-col gap-4">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "block py-2 text-base font-medium transition-all hover:text-pawscare-500",
                      location.pathname === item.href
                        ? "text-pawscare-500"
                        : "text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="mt-3">
                <Link
                  to="/adopt"
                  className="block rounded-full bg-pawscare-500 py-3 text-center text-base font-medium text-white transition-all hover:bg-pawscare-600"
                >
                  Adopt Now
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
