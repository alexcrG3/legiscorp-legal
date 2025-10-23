import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, TrendingDown, Users, FileText, Calendar, Clock, DollarSign, Target, Award, Loader2 } from "lucide-react";
import { useEstadisticas } from "@/hooks/useEstadisticas";

const Estadisticas = () => {
  const { estadisticas, isLoading } = useEstadisticas();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const totales = estadisticas?.totales || {
    casosTotales: 0,
    clientesActivos: 0,
    audienciasMes: 0,
    asuntosEnProceso: 0,
  };
  const casosPorTipo = estadisticas?.casosPorTipo || {};

  // Convertir casosPorTipo a array para renderizar
  const casosPorTipoArray = Object.entries(casosPorTipo).map(([tipo, cantidad]) => ({
    tipo,
    cantidad: cantidad as number,
    porcentaje: totales.casosTotales > 0 ? Math.round(((cantidad as number) / totales.casosTotales) * 100) : 0
  }));

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
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Casos Totales</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-2xl font-bold text-primary">{totales.casosTotales || 0}</span>
                  </div>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Clientes Activos</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-2xl font-bold text-primary">{totales.clientesActivos || 0}</span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Audiencias/Mes</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-2xl font-bold text-primary">{totales.audienciasMes || 0}</span>
                  </div>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Casos En Proceso</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-2xl font-bold text-primary">{totales.asuntosEnProceso || 0}</span>
                  </div>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Casos por Tipo */}
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Casos por Tipo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {casosPorTipoArray.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    No hay casos registrados
                  </div>
                ) : (
                  casosPorTipoArray.map((item, index) => (
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
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Métricas de Tiempo */}
          <Card>
            <CardHeader>
              <CardTitle>Métricas del Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-medium">Total de Casos</p>
                      <p className="text-sm text-muted-foreground">Todos los asuntos legales</p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-primary">{totales.casosTotales || 0}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Target className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-medium">En Proceso</p>
                      <p className="text-sm text-muted-foreground">Casos activos actualmente</p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-primary">{totales.asuntosEnProceso || 0}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-medium">Audiencias Este Mes</p>
                      <p className="text-sm text-muted-foreground">Próximas presentaciones</p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-primary">{totales.audienciasMes || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;
