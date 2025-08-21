import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Clock } from "lucide-react";

const Calendario = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const eventos = [
    {
      id: 1,
      titulo: "Audiencia Civil - Caso #2023-001",
      cliente: "María José Rodríguez",
      fecha: "2023-12-25",
      hora: "10:00 AM",
      tipo: "Audiencia",
      estado: "Confirmada"
    },
    {
      id: 2,
      titulo: "Reunión con Cliente",
      cliente: "Carlos Mendoza",
      fecha: "2023-12-26",
      hora: "2:00 PM",
      tipo: "Reunión",
      estado: "Pendiente"
    },
    {
      id: 3,
      titulo: "Entrega de Documentos",
      cliente: "Ana Lucía Santos",
      fecha: "2023-12-27",
      hora: "9:00 AM",
      tipo: "Entrega",
      estado: "Confirmada"
    },
    {
      id: 4,
      titulo: "Audiencia Penal",
      cliente: "Luis Pérez",
      fecha: "2023-12-28",
      hora: "11:30 AM",
      tipo: "Audiencia",
      estado: "Confirmada"
    }
  ];

  const proximosEventos = eventos.slice(0, 3);

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "Audiencia": return "bg-red-100 text-red-800";
      case "Reunión": return "bg-blue-100 text-blue-800";
      case "Entrega": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
              <CalendarIcon className="h-8 w-8 text-accent" />
              <div>
                <h1 className="text-2xl font-bold text-primary">Calendario Legal</h1>
                <p className="text-muted-foreground">Programa audiencias, citas y fechas importantes</p>
              </div>
            </div>
          </div>
          <Button variant="accent">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Evento
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            {/* Calendar Header */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <p className="text-muted-foreground">Esta Semana</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-accent">8</div>
                  <p className="text-muted-foreground">Audiencias</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-green-600">15</div>
                  <p className="text-muted-foreground">Reuniones</p>
                </CardContent>
              </Card>
            </div>

            {/* Calendar Grid */}
            <Card>
              <CardHeader>
                <CardTitle>Vista de Calendario</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 6; // Start from a Sunday
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                    const hasEvent = eventos.some(evento => 
                      new Date(evento.fecha).toDateString() === date.toDateString()
                    );
                    
                    return (
                      <div
                        key={i}
                        className={`p-2 text-center text-sm border rounded cursor-pointer hover:bg-muted transition-colors ${
                          isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'
                        } ${hasEvent ? 'bg-accent/10 border-accent' : 'border-border'}`}
                      >
                        {date.getDate()}
                        {hasEvent && (
                          <div className="w-2 h-2 bg-accent rounded-full mx-auto mt-1"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Próximos Eventos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proximosEventos.map((evento) => (
                    <div key={evento.id} className="border-l-2 border-accent pl-4 pb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTipoColor(evento.tipo)}`}>
                          {evento.tipo}
                        </span>
                        <span className="text-xs text-muted-foreground">{evento.hora}</span>
                      </div>
                      <h4 className="font-semibold text-sm text-primary">{evento.titulo}</h4>
                      <p className="text-xs text-muted-foreground">{evento.cliente}</p>
                      <p className="text-xs text-accent font-medium">{formatearFecha(evento.fecha)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Audiencia
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Reunión
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Recordatorios
                </Button>
              </CardContent>
            </Card>

            {/* Event Types Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Tipos de Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs">Audiencias</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs">Reuniones</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs">Entregas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendario;