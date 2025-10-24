import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/hooks/useProfile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Phone, Clock, AlertCircle, CheckCircle, XCircle, Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Consulta {
  id: string;
  nombre: string;
  correo: string;
  telefono: string | null;
  mensaje: string;
  tipo_asunto: string | null;
  nivel_urgencia: string | null;
  clasificacion_ia: string | null;
  estado: string;
  created_at: string;
}

const Consultas = () => {
  const { data: profile } = useProfile();
  const { toast } = useToast();
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState<string>("todos");
  const [selectedConsulta, setSelectedConsulta] = useState<Consulta | null>(null);

  useEffect(() => {
    if (profile?.firma_id) {
      loadConsultas();
      
      // Suscripción a cambios en tiempo real
      const channel = supabase
        .channel('consultas-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'consultas',
            filter: `firma_id=eq.${profile.firma_id}`
          },
          () => {
            loadConsultas();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [profile?.firma_id]);

  const loadConsultas = async () => {
    try {
      const { data, error } = await supabase
        .from("consultas")
        .select("*")
        .eq("firma_id", profile?.firma_id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setConsultas(data || []);
    } catch (error) {
      console.error("Error cargando consultas:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las consultas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateEstado = async (consultaId: string, nuevoEstado: string) => {
    try {
      const { error } = await supabase
        .from("consultas")
        .update({ estado: nuevoEstado })
        .eq("id", consultaId);

      if (error) throw error;

      toast({
        title: "Estado actualizado",
        description: `La consulta ahora está "${nuevoEstado}"`,
      });
      
      loadConsultas();
    } catch (error) {
      console.error("Error actualizando estado:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado",
        variant: "destructive",
      });
    }
  };

  const getUrgenciaColor = (urgencia: string | null) => {
    switch (urgencia?.toLowerCase()) {
      case "alta": return "destructive";
      case "media": return "default";
      case "baja": return "secondary";
      default: return "outline";
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "Pendiente": return <Clock className="h-4 w-4" />;
      case "En Revisión": return <AlertCircle className="h-4 w-4" />;
      case "Contactado": return <CheckCircle className="h-4 w-4" />;
      case "Cerrado": return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredConsultas = consultas.filter(c => {
    const matchesSearch = c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.mensaje.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = filterEstado === "todos" || c.estado === filterEstado;
    return matchesSearch && matchesEstado;
  });

  const estadisticas = {
    total: consultas.length,
    pendientes: consultas.filter(c => c.estado === "Pendiente").length,
    enRevision: consultas.filter(c => c.estado === "En Revisión").length,
    urgentes: consultas.filter(c => c.nivel_urgencia === "alta").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Consultas de Clientes</h1>
          <p className="text-muted-foreground">Gestiona las consultas recibidas desde tu sitio público</p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticas.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{estadisticas.pendientes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">En Revisión</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{estadisticas.enRevision}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Urgentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{estadisticas.urgentes}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, email o mensaje..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterEstado} onValueChange={setFilterEstado}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            <SelectItem value="Pendiente">Pendiente</SelectItem>
            <SelectItem value="En Revisión">En Revisión</SelectItem>
            <SelectItem value="Contactado">Contactado</SelectItem>
            <SelectItem value="Cerrado">Cerrado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Consultas */}
      <div className="grid gap-4">
        {filteredConsultas.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              {searchTerm || filterEstado !== "todos" 
                ? "No se encontraron consultas con los filtros aplicados"
                : "No hay consultas registradas aún"}
            </CardContent>
          </Card>
        ) : (
          filteredConsultas.map((consulta) => (
            <Card key={consulta.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{consulta.nombre}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      {consulta.correo}
                      {consulta.telefono && (
                        <>
                          <span>•</span>
                          <Phone className="h-3 w-3" />
                          {consulta.telefono}
                        </>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Badge variant={getUrgenciaColor(consulta.nivel_urgencia)}>
                      {consulta.nivel_urgencia || "Sin clasificar"}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getEstadoIcon(consulta.estado)}
                      {consulta.estado}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Mensaje:</p>
                  <p className="text-sm line-clamp-2">{consulta.mensaje}</p>
                </div>
                
                {consulta.tipo_asunto && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tipo de asunto:</p>
                    <Badge variant="secondary">{consulta.tipo_asunto}</Badge>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-xs text-muted-foreground">
                    {new Date(consulta.created_at).toLocaleString('es-ES')}
                  </span>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedConsulta(consulta)}
                    >
                      Ver detalles
                    </Button>
                    {consulta.estado === "Pendiente" && (
                      <Button 
                        size="sm"
                        onClick={() => updateEstado(consulta.id, "En Revisión")}
                      >
                        Marcar en revisión
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Dialog de Detalles */}
      <Dialog open={!!selectedConsulta} onOpenChange={() => setSelectedConsulta(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles de la Consulta</DialogTitle>
            <DialogDescription>
              Información completa y clasificación IA
            </DialogDescription>
          </DialogHeader>
          
          {selectedConsulta && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Cliente</h4>
                <p><strong>Nombre:</strong> {selectedConsulta.nombre}</p>
                <p><strong>Email:</strong> {selectedConsulta.correo}</p>
                {selectedConsulta.telefono && (
                  <p><strong>Teléfono:</strong> {selectedConsulta.telefono}</p>
                )}
              </div>

              <div>
                <h4 className="font-semibold mb-2">Mensaje</h4>
                <Textarea value={selectedConsulta.mensaje} readOnly rows={6} />
              </div>

              {selectedConsulta.clasificacion_ia && (
                <div>
                  <h4 className="font-semibold mb-2">Clasificación IA</h4>
                  <Card>
                    <CardContent className="pt-4">
                      <pre className="text-sm whitespace-pre-wrap">
                        {JSON.stringify(JSON.parse(selectedConsulta.clasificacion_ia), null, 2)}
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-2">Cambiar Estado</h4>
                <Select 
                  value={selectedConsulta.estado} 
                  onValueChange={(value) => updateEstado(selectedConsulta.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="En Revisión">En Revisión</SelectItem>
                    <SelectItem value="Contactado">Contactado</SelectItem>
                    <SelectItem value="Cerrado">Cerrado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Consultas;