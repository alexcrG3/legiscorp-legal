import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Settings,
  Webhook,
  Send
} from "lucide-react";

interface AutomationConfig {
  id: string;
  name: string;
  description: string;
  webhookUrl: string;
  isActive: boolean;
  lastTriggered?: string;
  triggerCount: number;
}

const Automatizaciones = () => {
  const { toast } = useToast();
  const [automations, setAutomations] = useState<AutomationConfig[]>([
    {
      id: "cita-reminder",
      name: "Recordatorios de Citas",
      description: "Envía recordatorios automáticos 24h y 2h antes de cada cita",
      webhookUrl: "",
      isActive: false,
      triggerCount: 0
    },
    {
      id: "audiencia-reminder", 
      name: "Alertas de Audiencias",
      description: "Notificaciones urgentes para audiencias judiciales",
      webhookUrl: "",
      isActive: false,
      triggerCount: 0
    },
    {
      id: "plazo-reminder",
      name: "Vencimiento de Plazos",
      description: "Alertas automáticas de plazos legales próximos a vencer",
      webhookUrl: "",
      isActive: false,
      triggerCount: 0
    }
  ]);

  const handleWebhookUpdate = (id: string, webhookUrl: string) => {
    setAutomations(prev => 
      prev.map(auto => 
        auto.id === id ? { ...auto, webhookUrl } : auto
      )
    );
  };

  const toggleAutomation = (id: string) => {
    setAutomations(prev => 
      prev.map(auto => {
        if (auto.id === id) {
          const newActive = !auto.isActive;
          if (newActive && !auto.webhookUrl) {
            toast({
              title: "Error",
              description: "Debes configurar el webhook de n8n primero",
              variant: "destructive",
            });
            return auto;
          }
          return { ...auto, isActive: newActive };
        }
        return auto;
      })
    );
  };

  const testWebhook = async (automation: AutomationConfig) => {
    if (!automation.webhookUrl) {
      toast({
        title: "Error",
        description: "Configura el webhook URL primero",
        variant: "destructive",
      });
      return;
    }

    try {
      await fetch(automation.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          test: true,
          automation: automation.name,
          timestamp: new Date().toISOString(),
          data: {
            cliente: "Juan Pérez",
            asunto: "Divorcio Express",
            fecha: "2024-01-15 10:00",
            tipo: "Cita inicial"
          }
        }),
      });

      setAutomations(prev =>
        prev.map(auto =>
          auto.id === automation.id
            ? { 
                ...auto, 
                triggerCount: auto.triggerCount + 1,
                lastTriggered: new Date().toISOString()
              }
            : auto
        )
      );

      toast({
        title: "Test Enviado",
        description: "El webhook fue ejecutado correctamente. Revisa tu flujo en n8n.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al ejecutar el webhook",
        variant: "destructive",
      });
    }
  };

  const getIcon = (id: string) => {
    switch (id) {
      case "cita-reminder": return <Calendar className="h-5 w-5" />;
      case "audiencia-reminder": return <AlertCircle className="h-5 w-5" />;
      case "plazo-reminder": return <Clock className="h-5 w-5" />;
      default: return <Settings className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Automatizaciones n8n</h1>
        <p className="text-muted-foreground">
          Configura recordatorios automáticos y notificaciones inteligentes
        </p>
      </div>

      {/* Instrucciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webhook className="h-5 w-5" />
            Configuración Inicial
          </CardTitle>
          <CardDescription>
            Pasos para conectar con n8n
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Badge variant="outline">1</Badge>
              <span>Crea un workflow en n8n</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">2</Badge>
              <span>Añade un trigger "Webhook"</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">3</Badge>
              <span>Copia la URL del webhook aquí</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Automatizaciones */}
      <div className="grid gap-6">
        {automations.map((automation) => (
          <Card key={automation.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getIcon(automation.id)}
                  <div>
                    <CardTitle className="text-lg">{automation.name}</CardTitle>
                    <CardDescription>{automation.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={automation.isActive ? "default" : "secondary"}
                    className="flex items-center gap-1"
                  >
                    {automation.isActive ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <AlertCircle className="h-3 w-3" />
                    )}
                    {automation.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                  <Switch
                    checked={automation.isActive}
                    onCheckedChange={() => toggleAutomation(automation.id)}
                  />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`webhook-${automation.id}`}>
                  URL del Webhook n8n
                </Label>
                <div className="flex gap-2">
                  <Input
                    id={`webhook-${automation.id}`}
                    placeholder="https://tu-instancia-n8n.com/webhook/..."
                    value={automation.webhookUrl}
                    onChange={(e) => handleWebhookUpdate(automation.id, e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => testWebhook(automation)}
                    disabled={!automation.webhookUrl}
                  >
                    <Send className="h-4 w-4" />
                    Test
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Ejecutado {automation.triggerCount} veces</span>
                {automation.lastTriggered && (
                  <span>
                    Último: {new Date(automation.lastTriggered).toLocaleString()}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ejemplos de datos que se envían */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Estructura de Datos
          </CardTitle>
          <CardDescription>
            Ejemplo del JSON que se enviará a n8n
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "automation": "Recordatorios de Citas",
  "timestamp": "2024-01-14T08:00:00Z",
  "data": {
    "cliente": "Juan Pérez",
    "email": "juan@email.com",
    "telefono": "+34 600 123 456",
    "asunto": "Divorcio Express",
    "fecha": "2024-01-15 10:00",
    "tipo": "Cita inicial",
    "abogado": "María García",
    "recordatorio": "24_horas"
  }
}`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default Automatizaciones;