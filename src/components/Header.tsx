import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Scale } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Áreas de Práctica", href: "#servicios" },
    { name: "Blog", href: "#blog" },
    { name: "Contacto", href: "#contacto" },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Scale className="h-8 w-8 text-accent" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary">Legiscorp</span>
              <span className="text-xs text-muted-foreground">Firma de Abogados</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground hover:text-accent transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Dashboard Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="accent" size="sm">
                Ir al Dashboard
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in-up">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left py-2 text-foreground hover:text-accent transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-border">
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="accent" size="sm" className="w-full">
                    Ir al Dashboard
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;