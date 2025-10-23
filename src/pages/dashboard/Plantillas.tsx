import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, FolderOpen, Plus, Search, Download, Eye } from "lucide-react";
import { useState } from "react";

import { TemplateDialog } from "@/components/TemplateDialog";
import { plantillasLegales } from "@/data/plantillasLegales";

const Plantillas = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<{title: string, content: string} | null>(null);

  const plantillas = [
    {
      id: 1,
      nombre: "Contrato de Servicios Legales",
      categoria: "Contratos",
      descripcion: "Plantilla estándar para contratos de servicios legales con clientes conforme a la legislación costarricense",
      fechaCreacion: "15/01/2023",
      usos: 45,
      formato: "TXT",
      contentKey: "contratoServiciosLegales"
    },
    {
      id: 2,
      nombre: "Demanda Civil General",
      categoria: "Demandas",
      descripcion: "Formato base para demandas civiles ante juzgados de Costa Rica con campos personalizables",
      fechaCreacion: "20/01/2023",
      usos: 23,
      formato: "TXT",
      contentKey: "demandaCivil"
    },
    {
      id: 3,
      nombre: "Poder Notarial Simple",
      categoria: "Poderes",
      descripcion: "Plantilla para otorgamiento de poderes notariales simples según formato notarial de Costa Rica",
      fechaCreacion: "10/02/2023",
      usos: 67,
      formato: "TXT",
      contentKey: "poderNotarial"
    },
    {
      id: 4,
      nombre: "Carta de Intimación",
      categoria: "Correspondencia",
      descripcion: "Formato profesional para cartas de intimación legal previo a acciones judiciales",
      fechaCreacion: "05/03/2023",
      usos: 34,
      formato: "TXT",
      contentKey: "cartaIntimacion"
    },
    {
      id: 5,
      nombre: "Acuerdo de Confidencialidad",
      categoria: "Contratos",
      descripcion: "NDA estándar para protección de información confidencial conforme a derecho costarricense",
      fechaCreacion: "12/03/2023",
      usos: 56,
      formato: "TXT",
      contentKey: "acuerdoConfidencialidad"
    },
    {
      id: 6,
      nombre: "Solicitud de Medida Cautelar",
      categoria: "Procedimientos",
      descripcion: "Plantilla para solicitud de medidas cautelares ante juzgados de Costa Rica",
      fechaCreacion: "18/03/2023",
      usos: 12,
      formato: "TXT",
      contentKey: "solicitudMedidaCautelar"
    }
  ];

  const handleViewTemplate = (plantilla: any) => {
    if (plantilla.contentKey && plantillasLegales[plantilla.contentKey as keyof typeof plantillasLegales]) {
      setSelectedTemplate({
        title: plantilla.nombre,
        content: plantillasLegales[plantilla.contentKey as keyof typeof plantillasLegales]
      });
    }
  };

  const categorias = [
    { nombre: "Contratos", cantidad: 25, color: "bg-blue-100 text-blue-800" },
    { nombre: "Demandas", cantidad: 18, color: "bg-red-100 text-red-800" },
    { nombre: "Poderes", cantidad: 12, color: "bg-green-100 text-green-800" },
    { nombre: "Correspondencia", cantidad: 15, color: "bg-purple-100 text-purple-800" },
    { nombre: "Procedimientos", cantidad: 19, color: "bg-orange-100 text-orange-800" }
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
              <FolderOpen className="h-8 w-8 text-accent" />
              <div>
                <h1 className="text-2xl font-bold text-primary">Plantillas de Documentos</h1>
                <p className="text-muted-foreground">Accede a plantillas de documentos legales estándar</p>
              </div>
            </div>
          </div>
          <Button variant="accent">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Plantilla
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar plantillas..."
              className="pl-10 pr-4 py-2 w-full rounded-md border border-border bg-background"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-primary mb-4">Categorías</h2>
          <div className="flex flex-wrap gap-3">
            {categorias.map((categoria) => (
              <button
                key={categoria.nombre}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${categoria.color} hover:opacity-80 transition-opacity`}
              >
                {categoria.nombre} ({categoria.cantidad})
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary">89</div>
              <p className="text-muted-foreground">Total Plantillas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-accent">237</div>
              <p className="text-muted-foreground">Usos este Mes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">12</div>
              <p className="text-muted-foreground">Nuevas este Mes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <p className="text-muted-foreground">Más Populares</p>
            </CardContent>
          </Card>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plantillas.map((plantilla) => (
            <Card key={plantilla.id} className="hover-lift transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{plantilla.nombre}</CardTitle>
                    <span className="inline-block px-2 py-1 bg-accent/10 text-accent text-xs rounded-full mb-2">
                      {plantilla.categoria}
                    </span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {plantilla.formato}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {plantilla.descripcion}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span>Creada: {plantilla.fechaCreacion}</span>
                  <span>{plantilla.usos} usos</span>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewTemplate(plantilla)}
                    disabled={!plantilla.contentKey}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Vista Previa
                  </Button>
                  <Button 
                    variant="accent" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewTemplate(plantilla)}
                    disabled={!plantilla.contentKey}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Usar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <TemplateDialog 
        open={!!selectedTemplate}
        onOpenChange={(open) => !open && setSelectedTemplate(null)}
        title={selectedTemplate?.title || ""}
        content={selectedTemplate?.content || ""}
      />
    </div>
  );
};

export default Plantillas;