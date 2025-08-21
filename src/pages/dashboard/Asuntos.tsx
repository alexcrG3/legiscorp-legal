import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Plus, Search, Filter } from "lucide-react";

const Asuntos = () => {
  const asuntos = [
    {
      id: "2023-001",
      titulo: "Demanda Civil - Incumplimiento de Contrato",
      cliente: "María José Rodríguez",
      estado: "En Progreso",
      prioridad: "Alta",
      fechaCreacion: "15/01/2023",
      proximaAudiencia: "25/12/2023"
    },
    {
      id: "2023-002",
      titulo: "Defensa Penal - Caso de Difamación",
      cliente: "Carlos Mendoza",
      estado: "Investigación",
      prioridad: "Media",
      fechaCreacion: "20/01/2023",
      proximaAudiencia: "30/12/2023"
    },
    {
      id: "2023-003",
      titulo: "Asesoría Corporativa - Fusión Empresarial",
      cliente: "Ana Lucía Santos",
      estado: "Documentación",
      prioridad: "Alta",
      fechaCreacion: "10/02/2023",
      proximaAudiencia: "15/01/2024"
    }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "En Progreso": return "bg-green-100 text-green-800";
      case "Investigación": return "bg-yellow-100 text-yellow-800";
      case "Documentación": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case "Alta": return "bg-red-100 text-red-800";
      case "Media": return "bg-orange-100 text-orange-800";
      case "Baja": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-accent" />
              <div>
                <h1 className="text-2xl font-bold text-primary">Gestión de Asuntos</h1>
                <p className="text-muted-foreground">Administra casos activos, estados y seguimientos</p>
              </div>
            </div>
          </div>
          <Link to="/dashboard/asuntos/nuevo">
            <Button variant="accent">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Asunto
            </Button>
          </Link>
        </div>
      </div>

      <div className="p-6">
        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar asuntos..."
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
              <div className="text-2xl font-bold text-primary">67</div>
              <p className="text-muted-foreground">Total Asuntos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">24</div>
              <p className="text-muted-foreground">En Progreso</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-600">18</div>
              <p className="text-muted-foreground">En Investigación</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-accent">8</div>
              <p className="text-muted-foreground">Próximas Audiencias</p>
            </CardContent>
          </Card>
        </div>

        {/* Cases Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Asuntos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {asuntos.map((asunto) => (
                <div key={asunto.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-mono text-muted-foreground">#{asunto.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(asunto.estado)}`}>
                          {asunto.estado}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadColor(asunto.prioridad)}`}>
                          {asunto.prioridad}
                        </span>
                      </div>
                      <h3 className="font-semibold text-primary mb-1">{asunto.titulo}</h3>
                      <p className="text-sm text-muted-foreground mb-2">Cliente: {asunto.cliente}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Creado: {asunto.fechaCreacion}</span>
                        <span>Próxima audiencia: {asunto.proximaAudiencia}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Asuntos;