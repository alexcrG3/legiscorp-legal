import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-lawyer-consultation.jpg";

const Hero = () => {
  const scrollToServices = () => {
    const element = document.querySelector("#servicios");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contacto");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Consulta legal profesional"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/75"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            Tu confianza,{" "}
            <span className="text-accent">nuestra prioridad</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto animate-fade-in-up">
            Asesoría jurídica integral con más de 15 años de experiencia en el mercado legal colombiano
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
            <Button 
              variant="hero" 
              size="lg"
              onClick={scrollToContact}
              className="text-lg px-8 py-4"
            >
              Solicita tu consulta gratuita
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={scrollToServices}
              className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
            >
              Conoce nuestros servicios
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-scale-in">
              <div className="text-3xl font-bold text-accent mb-2">15+</div>
              <div className="text-white/80">Años de experiencia</div>
            </div>
            <div className="animate-scale-in">
              <div className="text-3xl font-bold text-accent mb-2">500+</div>
              <div className="text-white/80">Casos exitosos</div>
            </div>
            <div className="animate-scale-in">
              <div className="text-3xl font-bold text-accent mb-2">100%</div>
              <div className="text-white/80">Confidencialidad</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;