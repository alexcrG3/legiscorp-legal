import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, TrendingDown, Users, FileText, Calendar, Clock, DollarSign, Target, Award } from "lucide-react";

const Estadisticas = () => {
  const estadisticasGenerales = [
    {
      titulo: "Casos Totales",
      valor: "156",
      cambio: "+12%",
      tendencia: "up",
      icono: FileText,
      color: "text-blue-600"
    },
    {
      titulo: "Clientes Activos",
      valor: "89",
      cambio: "+8%",
      tendencia: "up",
      icono: Users,
      color: "text-green-600"
    },
    {
      titulo: "Audiencias/Mes",
      valor: "24",
      cambio: "-3%",
      tendencia: "down",
      icono: Calendar,
      color: "text-orange-600"
    },
    {
      titulo: "Casos Ganados",
      valor: "134",
      cambio: "+15%",
      tendencia: "up",
      icono: Award,
      color: "text-purple-600"
    }
  ];

  const casosPorTipo = [
    { tipo: "Civil", cantidad: 45, porcentaje: 29 },
    { tipo: "Penal", cantidad: 32, porcentaje: 21 },
    { tipo: "Laboral", cantidad: 28, porcentaje: 18 },
    { tipo: "Familiar", cantidad: 25, porcentaje: 16 },
    { tipo: "Corporativo", cantidad: 15, porcentaje: 10 },
    { tipo: "Otros", cantidad: 11, porcentaje: 7 }
  ];

  const rendimientoMensual = [
    { mes: "Enero", casosNuevos: 12, casosResueltos: 8, ingresos: 45000 },
    { mes: "Febrero", casosNuevos: 15, casosResueltos: 11, ingresos: 52000 },
    { mes: "Marzo", casosNuevos: 18, casosResueltos: 14, ingresos: 61000 },
    { mes: "Abril", casosNuevos: 14, casosResueltos: 16, ingresos: 58000 },
    { mes: "Mayo", casosNuevos: 16, casosResueltos: 13, ingresos: 55000 },
    { mes: "Junio", casosNuevos: 20, casosResueltos: 18, ingresos: 67000 }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-accent" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Estadísticas y Análisis</h1>
              <p className="text-muted-foreground">Métricas de rendimiento y productividad del bufete</p>
            </div>
          </div>
          <Button variant="accent">
            <TrendingUp className="h-4 w-4 mr-2" />
            Generar Reporte
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {estadisticasGenerales.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">{stat.titulo}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-2xl font-bold text-primary">{stat.valor}</span>
                      <span className={`text-sm flex items-center ${
                        stat.tendencia === "up" ? "text-green-600" : "text-red-600"
                      }`}>
                        {stat.tendencia === "up" ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                        {stat.cambio}
                      </span>
                    </div>
                  </div>
                  <stat.icono className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Casos por Tipo */}
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Casos por Tipo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {casosPorTipo.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{item.tipo}</span>
                        <span className="text-sm text-muted-foreground">{item.cantidad} casos</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full" 
                          style={{ width: `${item.porcentaje}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.porcentaje}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Métricas de Tiempo */}
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Tiempo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-medium">Tiempo Promedio por Caso</p>
                      <p className="text-sm text-muted-foreground">Desde inicio hasta resolución</p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-primary">4.2 meses</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Target className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-medium">Tasa de Éxito</p>
                      <p className="text-sm text-muted-foreground">Casos ganados vs total</p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-primary">86%</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-medium">Facturación Promedio</p>
                      <p className="text-sm text-muted-foreground">Por caso completado</p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-primary">₡2.1M</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rendimiento Mensual */}
        <Card>
          <CardHeader>
            <CardTitle>Rendimiento Mensual 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium">Mes</th>
                    <th className="text-center p-4 font-medium">Casos Nuevos</th>
                    <th className="text-center p-4 font-medium">Casos Resueltos</th>
                    <th className="text-center p-4 font-medium">Ingresos (₡)</th>
                    <th className="text-center p-4 font-medium">Eficiencia</th>
                  </tr>
                </thead>
                <tbody>
                  {rendimientoMensual.map((item, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/50">
                      <td className="p-4 font-medium">{item.mes}</td>
                      <td className="text-center p-4">{item.casosNuevos}</td>
                      <td className="text-center p-4">{item.casosResueltos}</td>
                      <td className="text-center p-4">₡{item.ingresos.toLocaleString()}</td>
                      <td className="text-center p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          (item.casosResueltos / item.casosNuevos) >= 1 
                            ? "bg-green-100 text-green-700" 
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {Math.round((item.casosResueltos / item.casosNuevos) * 100)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Estadisticas;