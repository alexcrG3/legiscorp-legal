import { Link } from "react-router-dom";
import { Scale, MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Áreas de Práctica", href: "#servicios" },
    { name: "Blog", href: "#blog" },
    { name: "Contacto", href: "#contacto" }
  ];

  const legalAreas = [
    "Derecho Civil",
    "Derecho Penal",
    "Derecho Corporativo",
    "Litigios Judiciales",
    "Contratos y Notariado",
    "Mediación y Arbitraje"
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Scale className="h-8 w-8 text-accent" />
              <div>
                <div className="text-xl font-bold">Legiscorp</div>
                <div className="text-sm text-white/70">Firma de Abogados</div>
              </div>
            </div>
            
            <p className="text-white/80 mb-6 leading-relaxed">
              Firma de abogados especializada en brindar asesoría jurídica integral 
              con más de 15 años de experiencia.
            </p>
            
            <div className="text-accent font-medium text-lg">
              Tu confianza, nuestra prioridad.
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div className="text-white/80">
                  <div>San José, Costa Rica</div>
                  <div>Oficina 801, Escazú</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <div className="text-white/80">+506 88888888</div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <div className="text-white/80">contacto@legiscorp.com</div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-accent mt-1" />
                <div className="text-white/80">
                  <div>Lunes a Viernes</div>
                  <div>8:00 AM - 6:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Enlaces Rápidos</h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-white/80 hover:text-accent transition-colors duration-200"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Legal Areas */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Áreas Legales</h3>
            <div className="space-y-3">
              {legalAreas.map((area) => (
                <div key={area} className="text-white/80 text-sm">
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © {currentYear} Legiscorp. Todos los derechos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/dashboard" className="text-white/80 hover:text-accent transition-colors">
                Dashboard Interno
              </Link>
              <button className="text-white/80 hover:text-accent transition-colors">
                Política de Privacidad
              </button>
              <button className="text-white/80 hover:text-accent transition-colors">
                Términos de Servicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;