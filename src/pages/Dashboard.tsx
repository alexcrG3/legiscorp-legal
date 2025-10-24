import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  FileText, 
  Database, 
  Calendar, 
  Scale, 
  BarChart3, 
  Clock,
  ArrowLeft,
  FolderOpen,
  UserPlus,
  Plus,
  CalendarPlus,
  Zap,
  Bot
} from "lucide-react";

const Dashboard = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const sidebarItems = [
    { icon: Users, label: "Clientes", path: "/dashboard/clientes" },
    { icon: FileText, label: "Asuntos", path: "/dashboard/asuntos" },
    { icon: Database, label: "Documentos", path: "/dashboard/documentos" },
    { icon: FolderOpen, label: "Plantillas", path: "/dashboard/plantillas" },
    { icon: Calendar, label: "Calendario", path: "/dashboard/calendario" },
    { icon: Clock, label: "Citas", path: "/dashboard/citas" },
    { icon: Scale, label: "Jurisprudencia", path: "/dashboard/jurisprudencia" },
    { icon: BarChart3, label: "Historial", path: "/dashboard/historial" },
    { icon: Users, label: "Estadísticas", path: "/dashboard/estadisticas" },
    { icon: Zap, label: "Automatizaciones", path: "/dashboard/automatizaciones" },
    { icon: Bot, label: "Consultor IA", path: "/dashboard/consultor-ia" }
  ];

  const moduleCards = [
    {
      icon: Users,
      title: "Clientes",
      description: "Gestiona tu cartera de clientes y sus datos de contacto",
      path: "/dashboard/clientes",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: FileText,
      title: "Asuntos",
      description: "Administra casos activos, estados y seguimientos",
      path: "/dashboard/asuntos",
      iconColor: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Database,
      title: "Documentos",
      description: "Organiza y almacena documentos legales importantes",
      path: "/dashboard/documentos",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: FolderOpen,
      title: "Plantillas",
      description: "Accede a plantillas de documentos legales estándar",
      path: "/dashboard/plantillas",
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      icon: Calendar,
      title: "Calendario",
      description: "Programa audiencias, citas y fechas importantes",
      path: "/dashboard/calendario",
      iconColor: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      icon: Scale,
      title: "Jurisprudencia",
      description: "Consulta precedentes y referencias jurisprudenciales",
      path: "/dashboard/jurisprudencia",
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-100"
    },
    {
      icon: Clock,
      title: "Historial",
      description: "Revisa el historial de actividades y cambios",
      path: "/dashboard/historial",
      iconColor: "text-gray-600",
      bgColor: "bg-gray-100"
    },
    {
      icon: BarChart3,
      title: "Estadísticas",
      description: "Analiza métricas de rendimiento y productividad",
      path: "/dashboard/estadisticas",
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  const quickActions = [
    {
      title: "Nuevo Cliente",
      description: "Registrar nuevo cliente",
      icon: UserPlus,
      path: "/dashboard/clientes/nuevo"
    },
    {
      title: "Crear Caso",
      description: "Iniciar nuevo asunto legal",
      icon: Plus,
      path: "/dashboard/asuntos/nuevo"
    },
    {
      title: "Programar Cita",
      description: "Agendar reunión o audiencia",
      icon: CalendarPlus,
      path: "/dashboard/calendario/nueva"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border flex-shrink-0">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center space-x-2 mb-4">
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al sitio
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Scale className="h-6 w-6 text-accent" />
            <div>
              <h1 className="font-bold text-primary">Legiscorp</h1>
              <p className="text-xs text-accent">Firma de Abogados</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-primary mt-2">Dashboard Legal</h2>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                  currentPath === item.path
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground hover:bg-muted hover:text-accent"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-muted/30">
        {currentPath === "/dashboard" ? (
          <>
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-primary to-primary-light text-white p-8 m-6 rounded-lg">
              <h1 className="text-2xl font-bold mb-2">Bienvenido al Sistema Legal Integrado</h1>
              <p className="text-white/90 mb-6">Gestiona todos los aspectos de tu práctica legal desde un solo lugar</p>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">24</div>
                  <div className="text-sm text-white/80">Casos activos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">156</div>
                  <div className="text-sm text-white/80">Clientes registrados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">8</div>
                  <div className="text-sm text-white/80">Audiencias esta semana</div>
                </div>
              </div>
            </div>

            {/* Module Cards Grid */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-8">
                {moduleCards.map((module) => (
                  <Card key={module.title} className="hover-lift transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg ${module.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <module.icon className={`h-6 w-6 ${module.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-primary mb-2">{module.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                          <Link to={module.path}>
                            <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80 p-0 h-auto font-medium">
                              Acceder →
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-primary mb-4">Acciones Rápidas</h2>
                <div className="grid grid-cols-3 gap-4">
                  {quickActions.map((action) => (
                    <Link key={action.title} to={action.path}>
                      <Card className="hover-lift transition-all duration-300 hover:shadow-md">
                        <CardContent className="p-4 text-center">
                          <action.icon className="h-8 w-8 text-accent mx-auto mb-2" />
                          <h3 className="font-semibold text-primary text-sm mb-1">{action.title}</h3>
                          <p className="text-xs text-muted-foreground">{action.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Dashboard;