import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Search, Filter, ExternalLink, BookOpen, Calendar, Loader2 } from "lucide-react";
import { useJurisprudencia } from "@/hooks/useJurisprudencia";

const Jurisprudencia = () => {
  const { jurisprudencia, isLoading } = useJurisprudencia();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJurisprudencia = jurisprudencia?.filter(item =>
    item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.materia.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.corte.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-accent" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Jurisprudencia</h1>
              <p className="text-muted-foreground">Consulta precedentes y referencias jurisprudenciales</p>
            </div>
          </div>
          <Button variant="accent">
            <BookOpen className="h-4 w-4 mr-2" />
            Nueva Consulta
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
              placeholder="Buscar jurisprudencia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              <div className="text-2xl font-bold text-primary">{jurisprudencia?.length || 0}</div>
              <p className="text-muted-foreground">Total Precedentes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-accent">
                {jurisprudencia?.filter(j => j.relevancia === "Alta").length || 0}
              </div>
              <p className="text-muted-foreground">Relevancia Alta</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">
                {jurisprudencia?.filter(j => {
                  const date = new Date(j.fecha);
                  const now = new Date();
                  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                }).length || 0}
              </div>
              <p className="text-muted-foreground">Nuevos este Mes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">{filteredJurisprudencia.length}</div>
              <p className="text-muted-foreground">Resultados</p>
            </CardContent>
          </Card>
        </div>

        {/* Jurisprudencia List */}
        <Card>
          <CardHeader>
            <CardTitle>Base de Jurisprudencia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredJurisprudencia.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No se encontraron precedentes jurisprudenciales
                </div>
              ) : (
                filteredJurisprudencia.map((item) => (
                  <Card key={item.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-primary">{item.titulo}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            item.relevancia === "Alta" ? "bg-red-100 text-red-700" :
                            item.relevancia === "Media" ? "bg-yellow-100 text-yellow-700" :
                            "bg-green-100 text-green-700"
                          }`}>
                            {item.relevancia}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Expediente:</span> {item.expediente}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(item.fecha).toLocaleDateString('es-CR')}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Corte:</span> {item.corte}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Materia:</span> {item.materia}
                          </div>
                        </div>

                        <p className="text-sm mb-3">{item.resumen}</p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {item.tags.map((tag, index) => (
                            <span key={index} className="bg-muted px-2 py-1 rounded-md text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Ver Completo
                      </Button>
                      <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                        Descargar PDF
                      </Button>
                      <Button variant="outline" size="sm" className="text-purple-600 border-purple-200 hover:bg-purple-50">
                        Agregar a Caso
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Jurisprudencia;
