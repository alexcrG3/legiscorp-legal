import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  FileText, 
  Calendar, 
  Database, 
  Scale, 
  BarChart3, 
  Search, 
  Clock,
  ArrowLeft,
  Settings
} from "lucide-react";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const dashboardModules = [
    {
      icon: Users,
      title: "Clientes",
      description: "Gestión integral de la base de clientes y sus expedientes",
      count: "142 activos",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: FileText,
      title: "Asuntos",
      description: "Seguimiento de casos y procesos legales en curso",
      count: "67 en progreso",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Database,
      title: "Documentos",
      description: "Repositorio centralizado de documentos legales",
      count: "1,234 archivos",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: FileText,
      title: "Plantillas",
      description: "Plantillas legales y formularios predefinidos",
      count: "89 disponibles",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: Calendar,
      title: "Calendario",
      description: "Gestión de citas, audiencias y fechas importantes",
      count: "12 esta semana",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: Scale,
      title: "Jurisprudencia",
      description: "Base de datos de precedentes y jurisprudencia",
      count: "567 referencias",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: Clock,
      title: "Historial",
      description: "Registro de actividades y cambios en el sistema",
      count: "Última actividad",
      color: "text-gray-600",
      bgColor: "bg-gray-50"
    },
    {
      icon: BarChart3,
      title: "Estadísticas",
      description: "Métricas de rendimiento y análisis de casos",
      count: "Reportes disponibles",
      color: "text-accent",
      bgColor: "bg-accent/10"
    }
  ];

  const recentActivities = [
    { action: "Nuevo cliente registrado", client: "María González", time: "Hace 2 horas" },
    { action: "Documento subido", client: "Caso #2023-045", time: "Hace 4 horas" },
    { action: "Audiencia programada", client: "Carlos Mendoza", time: "Hace 1 día" },
    { action: "Caso cerrado exitosamente", client: "Ana Rodríguez", time: "Hace 2 días" }
  ];

  const upcomingEvents = [
    { event: "Audiencia Civil", client: "Caso #2023-098", date: "Mañana 10:00 AM" },
    { event: "Reunión con cliente", client: "Luis Pérez", date: "Viernes 2:00 PM" },
    { event: "Fecha límite documentos", client: "Caso #2023-034", date: "Lunes 5:00 PM" }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al sitio
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Scale className="h-8 w-8 text-accent" />
                <div>
                  <h1 className="text-xl font-bold text-primary">Dashboard Legal</h1>
                  <p className="text-sm text-muted-foreground">Legiscorp Garros</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar clientes, casos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">
            Bienvenido al Dashboard Legal
          </h2>
          <p className="text-muted-foreground">
            Gestiona todos los aspectos de tu práctica legal desde una sola plataforma
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Clientes Activos</p>
                  <p className="text-2xl font-bold text-primary">142</p>
                </div>
                <Users className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Casos Activos</p>
                  <p className="text-2xl font-bold text-primary">67</p>
                </div>
                <FileText className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Esta Semana</p>
                  <p className="text-2xl font-bold text-primary">12</p>
                </div>
                <Calendar className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Éxito Rate</p>
                  <p className="text-2xl font-bold text-primary">94%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Modules */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-primary mb-6">Módulos del Sistema</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dashboardModules.map((module, index) => (
                <Card 
                  key={module.title} 
                  className="hover-lift cursor-pointer transition-all duration-300 hover:border-accent/30"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-xl ${module.bgColor} flex items-center justify-center`}>
                        <module.icon className={`h-6 w-6 ${module.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <p className="text-sm text-accent font-medium">{module.count}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {module.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actividades Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.client}</p>
                        <p className="text-xs text-accent">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Próximos Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="border-l-2 border-accent pl-4">
                      <p className="text-sm font-medium">{event.event}</p>
                      <p className="text-xs text-muted-foreground">{event.client}</p>
                      <p className="text-xs text-accent font-medium">{event.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;