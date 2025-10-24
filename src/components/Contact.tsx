import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    area: "",
    message: ""
  });

  const legalAreas = [
    "Derecho Civil",
    "Derecho Penal",
    "Derecho Corporativo",
    "Litigios Judiciales",
    "Contratos y Notariado",
    "Mediación y Arbitraje",
    "Otro"
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: "Ubicación",
      content: "San José, Costa Rica, Oficina 801\nEscazú"
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: "+506 88888888"
    },
    {
      icon: Mail,
      title: "Email",
      content: "contacto@legiscorpgarros.com"
    },
    {
      icon: Clock,
      title: "Horario",
      content: "Lunes a Viernes\n8:00 AM - 6:00 PM"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Consulta enviada exitosamente",
        description: "Nos contactaremos contigo en las próximas 24 horas.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        area: "",
        message: ""
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contacto" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Contactanos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Estamos aquí para ayudarte. Solicita tu consulta gratuita y te responderemos a la brevedad
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">{info.title}</h4>
                      <p className="text-muted-foreground whitespace-pre-line">{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-card rounded-2xl p-8 border border-border">
              <h4 className="text-xl font-semibold text-primary mb-4">
                ¿Por qué elegirnos?
              </h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Consulta inicial gratuita</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Respuesta en 24 horas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Atención personalizada</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Confidencialidad absoluta</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
            <h3 className="text-2xl font-bold text-primary mb-6">
              Solicita tu Consulta Gratuita
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nombre completo *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Tu nombre completo"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Correo electrónico *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Teléfono
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+506 8888-8888"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="area" className="block text-sm font-medium text-foreground mb-2">
                    Área de consulta *
                  </label>
                  <Select value={formData.area} onValueChange={(value) => handleInputChange("area", value)} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un área" />
                    </SelectTrigger>
                    <SelectContent>
                      {legalAreas.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Mensaje *
                </label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Describe brevemente tu consulta legal..."
                  rows={5}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                variant="accent"
                size="lg"
                disabled={isSubmitting}
                className="w-full text-lg py-6"
              >
                {isSubmitting ? "Enviando..." : "Enviar Consulta"}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Al enviar este formulario, aceptas que nos contactemos contigo para brindar asesoría legal.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;