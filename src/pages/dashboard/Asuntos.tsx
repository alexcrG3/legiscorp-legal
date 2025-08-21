import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Plus, Search, Filter, User, Calendar, FileCheck, Edit, Trash2 } from "lucide-react";

const Asuntos = () => {
  const asuntos = [
    {
      id: "CASO-2024-001",
      titulo: "Demanda por incumplimiento contractual",
      tipo: "Civil",
      cliente: "María González Rodríguez",
      inicio: "2024-01-15",
      proximaAudiencia: "2024-02-10",
      descripcion: "Demanda por incumplimiento de contrato de servicios profesionales",
      estado: "En proceso",
      prioridad: "Alta"
    },
    {
      id: "CASO-2024-002",
      titulo: "Divorcio consensual",
      tipo: "Familiar",
      cliente: "Carlos Mendoza",
      inicio: "2024-01-20",
      proximaAudiencia: "2024-02-15",
      descripcion: "Proceso de divorcio de mutuo acuerdo con liquidación de sociedad conyugal",
      estado: "En proceso",
      prioridad: "Media"
    },
    {
      id: "CASO-2024-003",
      titulo: "Constitución de sociedad",
      tipo: "Corporativo",
      cliente: "Ana Lucía Santos",
      inicio: "2024-01-25",
      proximaAudiencia: "2024-02-05",
      descripcion: "Constitución de sociedad anónima para nueva empresa tecnológica",
      estado: "Pendiente",
      prioridad: "Baja"
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-accent" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Gestión de Asuntos</h1>
              <p className="text-muted-foreground">Administra todos los casos legales</p>
            </div>
          </div>
          <Button variant="accent">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Asunto
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
            <div className="space-y-6">
              {asuntos.map((asunto) => (
                <Card key={asunto.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-8 w-8 text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-semibold text-primary">{asunto.titulo}</h3>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-sm text-muted-foreground">ID: {asunto.id}</span>
                          <span className="text-sm text-muted-foreground">• Tipo: {asunto.tipo}</span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-8">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <span className="text-muted-foreground text-sm">Cliente</span>
                              <p className="text-sm font-medium">{asunto.cliente}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <span className="text-muted-foreground text-sm">Inicio</span>
                              <p className="text-sm font-medium">{asunto.inicio}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-orange-500" />
                            <div>
                              <span className="text-muted-foreground text-sm">Próxima audiencia</span>
                              <p className="text-sm font-medium text-orange-500">{asunto.proximaAudiencia}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <span className="text-muted-foreground text-sm">Descripción</span>
                          <p className="text-sm">{asunto.descripcion}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        asunto.estado === "En proceso" ? "bg-blue-100 text-blue-700" :
                        asunto.estado === "Pendiente" ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {asunto.estado}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        asunto.prioridad === "Alta" ? "bg-red-100 text-red-700" :
                        asunto.prioridad === "Media" ? "bg-yellow-100 text-yellow-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {asunto.prioridad}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                      <FileText className="h-4 w-4 mr-1" />
                      Asuntos (1)
                    </Button>
                    <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                      + Nuevo Asunto
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                      <Calendar className="h-4 w-4 mr-1" />
                      Calendario
                    </Button>
                    <Button variant="outline" size="sm" className="text-gray-600 border-gray-200 hover:bg-gray-50">
                      <FileCheck className="h-4 w-4 mr-1" />
                      Documentos (0)
                    </Button>
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-blue-600 text-white">
                      <Edit className="h-4 w-4 mr-1" />
                      Editar Cliente
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 bg-red-600 text-white">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Eliminar Cliente
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Asuntos;