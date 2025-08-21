import { 
  Scale, 
  Shield, 
  Building, 
  Gavel, 
  FileText, 
  Users 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Scale,
      title: "Derecho Civil",
      description: "Asesoría en contratos, responsabilidad civil, derecho de familia y sucesiones."
    },
    {
      icon: Shield,
      title: "Derecho Penal",
      description: "Defensa penal en todas las instancias, representación en procesos judiciales."
    },
    {
      icon: Building,
      title: "Derecho Corporativo",
      description: "Constitución de empresas, fusiones, adquisiciones y asesoría empresarial."
    },
    {
      icon: Gavel,
      title: "Litigios Judiciales",
      description: "Representación procesal en todas las jurisdicciones y especialidades."
    },
    {
      icon: FileText,
      title: "Contratos y Notariado",
      description: "Elaboración, revisión de contratos y servicios notariales especializados."
    },
    {
      icon: Users,
      title: "Mediación y Arbitraje",
      description: "Resolución alternativa de conflictos, mediación y arbitraje comercial."
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Nuestras Áreas de Práctica
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ofrecemos servicios jurídicos especializados con la más alta calidad y profesionalismo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card rounded-xl p-8 border border-border hover-lift transition-all duration-300 hover:border-accent/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
              
              <div className="pt-4 border-t border-border/50">
                <button className="text-accent font-medium hover:text-accent/80 transition-colors flex items-center">
                  Más información
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Necesitas asesoría legal especializada?
            </h3>
            <p className="text-xl mb-8 text-white/90">
              Nuestro equipo está listo para ayudarte con tu caso
            </p>
            <button 
              onClick={() => {
                const element = document.querySelector("#contacto");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Consulta gratuita
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;