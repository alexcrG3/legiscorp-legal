import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, UserPlus, Search, Filter } from "lucide-react";

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
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-accent" />
              <div>
                <h1 className="text-2xl font-bold text-primary">Gestión de Clientes</h1>
                <p className="text-muted-foreground">Administra tu cartera de clientes</p>
              </div>
            </div>
          </div>
          <Link to="/dashboard/clientes/nuevo">
            <Button variant="accent">
              <UserPlus className="h-4 w-4 mr-2" />
              Nuevo Cliente
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
            <div className="space-y-4">
              {clientes.map((cliente) => (
                <div key={cliente.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">{cliente.nombre}</h3>
                      <p className="text-sm text-muted-foreground">{cliente.email}</p>
                      <p className="text-sm text-muted-foreground">{cliente.telefono}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-primary font-medium">{cliente.casosActivos} casos activos</div>
                    <div className="text-sm text-muted-foreground">{cliente.ultimaActividad}</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Clientes;