import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, UserPlus, Search, Filter, FileText, Calendar, Database, Edit, Trash2 } from "lucide-react";

const Clientes = () => {
  const clientes = [
    {
      id: 1,
      nombre: "María José Rodríguez",
      email: "maria.rodriguez@email.com",
      telefono: "+506 8888-1234",
      casosActivos: 2,
      ultimaActividad: "Hace 2 días"
    },
    {
      id: 2,
      nombre: "Carlos Mendoza",
      email: "carlos.mendoza@email.com",
      telefono: "+506 8888-5678",
      casosActivos: 1,
      ultimaActividad: "Hace 1 semana"
    },
    {
      id: 3,
      nombre: "Ana Lucía Santos",
      email: "ana.santos@email.com",
      telefono: "+506 8888-9012",
      casosActivos: 3,
      ultimaActividad: "Ayer"
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-accent" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Gestión de Clientes</h1>
              <p className="text-muted-foreground">Administra tu cartera de clientes</p>
            </div>
          </div>
          <Button variant="accent">
            <UserPlus className="h-4 w-4 mr-2" />
            Nuevo Cliente
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
              placeholder="Buscar clientes..."
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
              <div className="text-2xl font-bold text-primary">156</div>
              <p className="text-muted-foreground">Total Clientes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-accent">142</div>
              <p className="text-muted-foreground">Clientes Activos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">89</div>
              <p className="text-muted-foreground">Casos en Progreso</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <p className="text-muted-foreground">Nuevos este Mes</p>
            </CardContent>
          </Card>
        </div>

        {/* Clients Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {clientes.map((cliente) => (
                <Card key={cliente.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                        <Users className="h-8 w-8 text-slate-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-xl font-semibold text-primary">{cliente.nombre}</h3>
                          <span className="text-sm text-muted-foreground">#{cliente.id}</span>
                          <span className="text-sm text-muted-foreground">• DNI: 118500456</span>
                        </div>
                        <div className="grid grid-cols-3 gap-8 mt-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground">Email</span>
                            <span className="text-sm">{cliente.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground">Teléfono</span>
                            <span className="text-sm">{cliente.telefono}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground">Dirección</span>
                            <span className="text-sm">San José, Escazú</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Activo
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                      <FileText className="h-4 w-4 mr-1" />
                      Asuntos ({cliente.casosActivos})
                    </Button>
                    <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                      + Nuevo Asunto
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                      <Calendar className="h-4 w-4 mr-1" />
                      Calendario
                    </Button>
                    <Button variant="outline" size="sm" className="text-gray-600 border-gray-200 hover:bg-gray-50">
                      <Database className="h-4 w-4 mr-1" />
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

export default Clientes;