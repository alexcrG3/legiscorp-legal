import { Button } from "@/components/ui/button";
import { Check, Award, Users, Target } from "lucide-react";
import teamImage from "@/assets/legal-team-professional.jpg";

const About = () => {
  const whyChooseUs = [
    {
      icon: Award,
      title: "Experiencia",
      description: "Más de 15 años de trayectoria exitosa en el sector legal, manejando casos de alta complejidad."
    },
    {
      icon: Target,
      title: "Resultados Comprobados",
      description: "Historial demostrable de casos ganados y soluciones efectivas para nuestros clientes."
    },
    {
      icon: Users,
      title: "Atención Personalizada",
      description: "Cada cliente recibe un trato único y personalizado, adaptado a sus necesidades específicas"
    }
  ];

  const values = [
    "Integridad profesional",
    "Confidencialidad absoluta",
    "Compromiso con resultados",
    "Excelencia en el servicio"
  ];

  return (
    <section id="nosotros" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Main About Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Sobre Legiscorp Garros
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Legiscorp Garros es una firma de abogados con más de 15 años de experiencia 
                en el mercado legal colombiano. Nos especializamos en brindar asesoría jurídica 
                integral y representación legal de la más alta calidad.
              </p>
              <p>
                Nuestro equipo está conformado por profesionales altamente calificados, 
                comprometidos con la excelencia y la obtención de resultados óptimos para 
                nuestros clientes. Entendemos que cada caso es único y merece atención personalizada.
              </p>
              <p>
                En Legiscorp Garros, nos guiamos por valores fundamentales: integridad, 
                profesionalismo, confidencialidad y compromiso. Estos principios nos han 
                permitido construir relaciones sólidas y duraderas con nuestros clientes.
              </p>
            </div>

            {/* Values */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-primary mb-4">Nuestros Valores</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {values.map((value, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-foreground font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="animate-scale-in">
            <div className="relative">
              <img
                src={teamImage}
                alt="Equipo legal de Legiscorp Garros"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">Años de experiencia</div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              ¿Por qué elegirnos?
            </h3>
            <p className="text-xl text-muted-foreground">
              Lo que nos diferencia en el mercado legal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={item.title}
                className="text-center group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <item.icon className="h-10 w-10 text-accent" />
                </div>
                <h4 className="text-xl font-semibold text-primary mb-4">
                  {item.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="accent" 
              size="lg"
              onClick={() => {
                const element = document.querySelector("#contacto");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-8 py-4 text-lg"
            >
              Conoce más sobre nosotros
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;