import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Phone, MapPin, Scale, Users, FileText } from "lucide-react";

interface Firma {
  id: string;
  nombre: string;
  logo_url: string | null;
  color_primario: string;
  subdominio: string;
}

const PublicFirma = () => {
  const { subdominio } = useParams<{ subdominio: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [firma, setFirma] = useState<Firma | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });

  useEffect(() => {
    const loadFirma = async () => {
      if (!subdominio) {
        navigate("/");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("firmas")
          .select("*")
          .eq("subdominio", subdominio)
          .single();

        if (error || !data) {
          toast({
            title: "Firma no encontrada",
            description: "El sitio que buscas no existe.",
            variant: "destructive",
          });
          navigate("/");
          return;
        }

        setFirma(data);
      } catch (error) {
        console.error("Error cargando firma:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadFirma();
  }, [subdominio, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firma) return;
    
    setSubmitting(true);

    try {
      // Insertar consulta
      const { data: consulta, error: insertError } = await supabase
        .from("consultas")
        .insert({
          firma_id: firma.id,
          nombre: formData.nombre,
          correo: formData.correo,
          telefono: formData.telefono,
          mensaje: formData.mensaje,
          estado: "Pendiente",
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Clasificar con IA
      try {
        await supabase.functions.invoke('clasificar-consulta', {
          body: {
            consultaId: consulta.id,
            mensaje: formData.mensaje,
          }
        });
      } catch (aiError) {
        console.error('Error en clasificación IA:', aiError);
      }

      // Enviar notificación
      try {
        await supabase.functions.invoke('enviar-notificacion-consulta', {
          body: {
            consultaId: consulta.id,
          }
        });
      } catch (notifError) {
        console.error('Error enviando notificación:', notifError);
      }

      toast({
        title: "¡Mensaje enviado!",
        description: "Gracias por tu consulta. Nuestro equipo te contactará pronto.",
      });

      setFormData({
        nombre: "",
        correo: "",
        telefono: "",
        mensaje: "",
      });

    } catch (error) {
      console.error("Error enviando consulta:", error);
      toast({
        title: "Error",
        description: "No se pudo enviar tu mensaje. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!firma) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header 
        className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur"
        style={{ borderColor: firma.color_primario + "20" }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {firma.logo_url && (
              <img 
                src={firma.logo_url} 
                alt={firma.nombre}
                className="h-10 w-auto object-contain"
              />
            )}
            <h1 className="text-2xl font-bold" style={{ color: firma.color_primario }}>
              {firma.nombre}
            </h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#servicios" className="hover:text-primary transition-colors">Servicios</a>
            <a href="#nosotros" className="hover:text-primary transition-colors">Nosotros</a>
            <a href="#contacto" className="hover:text-primary transition-colors">Contacto</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="py-20 text-white"
        style={{ 
          background: `linear-gradient(135deg, ${firma.color_primario} 0%, ${firma.color_primario}dd 100%)`
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Asesoría Legal Profesional</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Protegemos tus derechos y defendemos tus intereses con experiencia y dedicación
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Consulta Gratuita
          </Button>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Servicios</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Scale className="h-12 w-12 mb-4" style={{ color: firma.color_primario }} />
                <CardTitle>Derecho Civil</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Contratos, arrendamientos, responsabilidad civil y más
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 mb-4" style={{ color: firma.color_primario }} />
                <CardTitle>Derecho Laboral</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Defensa de derechos laborales, despidos, indemnizaciones
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 mb-4" style={{ color: firma.color_primario }} />
                <CardTitle>Derecho Corporativo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Constitución de empresas, fusiones, contratos comerciales
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Sobre Nosotros</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Somos un equipo de abogados especializados comprometidos con brindar 
              servicios jurídicos de la más alta calidad. Nuestra experiencia y 
              dedicación nos permiten ofrecer soluciones efectivas a cada caso.
            </p>
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section id="contacto" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Contacta con Nosotros</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Info de Contacto */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 mt-1" style={{ color: firma.color_primario }} />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">contacto@{subdominio}.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 mt-1" style={{ color: firma.color_primario }} />
                  <div>
                    <h3 className="font-semibold mb-1">Teléfono</h3>
                    <p className="text-muted-foreground">+57 (1) 234-5678</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 mt-1" style={{ color: firma.color_primario }} />
                  <div>
                    <h3 className="font-semibold mb-1">Ubicación</h3>
                    <p className="text-muted-foreground">Bogotá, Colombia</p>
                  </div>
                </div>
              </div>

              {/* Formulario */}
              <Card>
                <CardHeader>
                  <CardTitle>Envíanos tu Consulta</CardTitle>
                  <CardDescription>
                    Te responderemos a la brevedad posible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Nombre completo"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <Input
                        type="email"
                        placeholder="Correo electrónico"
                        value={formData.correo}
                        onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <Input
                        type="tel"
                        placeholder="Teléfono (opcional)"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Textarea
                        placeholder="Describe tu consulta..."
                        value={formData.mensaje}
                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                        required
                        rows={5}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      style={{ backgroundColor: firma.color_primario }}
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        "Enviar Consulta"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {firma.nombre}. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicFirma;