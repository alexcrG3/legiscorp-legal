import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "María José Rodríguez",
      role: "Empresaria",
      content: "Legiscorp Garros me ayudó a resolver un caso corporativo complejo. Su profesionalismo y dedicación fueron excepcionales. Recomiendo sus servicios sin dudarlo.",
      rating: 5
    },
    {
      name: "Carlos Mendoza",
      role: "Director General",
      content: "La atención personalizada y la expertise legal de este equipo es sobresaliente. Nos acompañaron en todo el proceso con total transparencia y resultados exitosos.",
      rating: 5
    },
    {
      name: "Ana Lucía Santos",
      role: "Comerciante",
      content: "Profesionales íntegros y comprometidos. Su asesoría fue fundamental para la resolución favorable de mi caso. Estoy muy agradecida por su excelente trabajo.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Nuestros Clientes Opinan
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            La confianza de nuestros clientes es nuestro mayor respaldo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-2xl p-8 border border-border relative hover-lift transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Quote className="h-4 w-4 text-white" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex space-x-1 mb-6 mt-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-border pt-6">
                <div className="font-semibold text-primary">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Statistics */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">98%</div>
              <div className="text-white/80">Satisfacción del cliente</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">500+</div>
              <div className="text-white/80">Casos exitosos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">15+</div>
              <div className="text-white/80">Años de experiencia</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <div className="text-white/80">Atención disponible</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;