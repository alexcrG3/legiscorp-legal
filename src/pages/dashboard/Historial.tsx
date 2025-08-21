import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Search, Filter, FileText, Users, Calendar, Database, Edit, Trash2, Plus, Eye } from "lucide-react";

const Historial = () => {
  const actividades = [
    {
      id: 1,
      tipo: "cliente",
      accion: "Nuevo cliente registrado",
      detalle: "María González Rodríguez ha sido registrada en el sistema",
      usuario: "Ana García (Asistente)",
      fecha: "2024-02-01 14:30",
      icono: Users,
      color: "text-blue-600"
    },
    {
      id: 2,
      tipo: "asunto",
      accion: "Asunto actualizado",
      detalle: "Estado del caso CASO-2024-001 cambiado a 'En proceso'",
      usuario: "Dr. Carlos Mendoza (Abogado)",
      fecha: "2024-02-01 13:15",
      icono: FileText,
      color: "text-green-600"
    },
    {
      id: 3,
      tipo: "documento",
      accion: "Documento subido",
      detalle: "Contrato_Servicios_2024.pdf agregado al caso CASO-2024-001",
      usuario: "María López (Secretaria)",
      fecha: "2024-02-01 11:45",
      icono: Database,
      color: "text-purple-600"
    },
    {
      id: 4,
      tipo: "cita",
      accion: "Cita programada",
      detalle: "Audiencia programada para el 10/02/2024 - Sala 3, Tribunal Civil",
      usuario: "Dr. Roberto Silva (Abogado)",
      fecha: "2024-02-01 10:20",
      icono: Calendar,
      color: "text-orange-600"
    },
    {
      id: 5,
      tipo: "cliente",
      accion: "Cliente editado",
      detalle: "Información de contacto actualizada para Carlos Mendoza",
      usuario: "Ana García (Asistente)",
      fecha: "2024-01-31 16:45",
      icono: Edit,
      color: "text-blue-600"
    },
    {
      id: 6,
      tipo: "asunto",
      accion: "Nuevo asunto creado",
      detalle: "CASO-2024-003 - Constitución de sociedad para Ana Lucía Santos",
      usuario: "Dr. Patricia Rojas (Abogada)",
      fecha: "2024-01-31 15:30",
      icono: Plus,
      color: "text-green-600"
    },
    {
      id: 7,
      tipo: "documento",
      accion: "Documento revisado",
      detalle: "Demanda_Civil_Rev2.pdf marcado como revisado",
      usuario: "Dr. Carlos Mendoza (Abogado)",
      fecha: "2024-01-31 14:10",
      icono: Eye,
      color: "text-purple-600"
    },
    {
      id: 8,
      tipo: "sistema",
      accion: "Respaldo de datos",
      detalle: "Respaldo automático del sistema completado exitosamente",
      usuario: "Sistema Automático",
      fecha: "2024-01-31 02:00",
      icono: Database,
      color: "text-gray-600"
    }
  ];

  const getTypeLabel = (tipo: string) => {
    const types = {
      cliente: "Cliente",
      asunto: "Asunto",
      documento: "Documento",
      cita: "Calendario",
      sistema: "Sistema"
    };
    return types[tipo as keyof typeof types] || tipo;
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-8 w-8 text-accent" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Historial de Actividades</h1>
              <p className="text-muted-foreground">Registro completo de todas las actividades del sistema</p>
            </div>
          </div>
          <Button variant="accent">
            <Search className="h-4 w-4 mr-2" />
            Buscar Actividad
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar en historial..."
              className="pl-10 pr-4 py-2 w-full rounded-md border border-border bg-background"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary">1,247</div>
              <p className="text-muted-foreground">Total Actividades</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-accent">45</div>
              <p className="text-muted-foreground">Hoy</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">289</div>
              <p className="text-muted-foreground">Esta Semana</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <p className="text-muted-foreground">Usuarios Activos</p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Actividades Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {actividades.map((actividad) => (
                <div key={actividad.id} className="flex items-start space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${actividad.color}`}>
                    <actividad.icono className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-primary">{actividad.accion}</h4>
                        <span className="bg-muted px-2 py-1 rounded-md text-xs font-medium">
                          {getTypeLabel(actividad.tipo)}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">{actividad.fecha}</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{actividad.detalle}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Por: {actividad.usuario}</span>
                      <Button variant="ghost" size="sm" className="text-accent">
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline">
                Cargar más actividades
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Historial;