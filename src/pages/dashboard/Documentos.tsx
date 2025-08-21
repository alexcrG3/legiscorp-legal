import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Database, Upload, Search, Filter, FileText, Folder } from "lucide-react";

const Documentos = () => {
  const documentos = [
    {
      id: 1,
      nombre: "Contrato_ServiciosLegales_Rodriguez.pdf",
      tipo: "Contrato",
      cliente: "María José Rodríguez",
      tamaño: "2.4 MB",
      fechaSubida: "20/12/2023",
      estado: "Aprobado"
    },
    {
      id: 2,
      nombre: "Demanda_Civil_Caso2023-001.docx",
      tipo: "Demanda",
      cliente: "María José Rodríguez",
      tamaño: "1.8 MB",
      fechaSubida: "18/12/2023",
      estado: "En Revisión"
    },
    {
      id: 3,
      nombre: "Evidencias_Fotograficas_Mendoza.zip",
      tipo: "Evidencia",
      cliente: "Carlos Mendoza",
      tamaño: "15.7 MB",
      fechaSubida: "15/12/2023",
      estado: "Aprobado"
    }
  ];

  const categorias = [
    { nombre: "Contratos", cantidad: 45 },
    { nombre: "Demandas", cantidad: 23 },
    { nombre: "Evidencias", cantidad: 67 },
    { nombre: "Sentencias", cantidad: 12 },
    { nombre: "Apelaciones", cantidad: 8 }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Aprobado": return "bg-green-100 text-green-800";
      case "En Revisión": return "bg-yellow-100 text-yellow-800";
      case "Rechazado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
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
              <Database className="h-8 w-8 text-accent" />
              <div>
                <h1 className="text-2xl font-bold text-primary">Gestión de Documentos</h1>
                <p className="text-muted-foreground">Organiza y almacena documentos legales importantes</p>
              </div>
            </div>
          </div>
          <Button variant="accent">
            <Upload className="h-4 w-4 mr-2" />
            Subir Documento
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Folder className="h-5 w-5" />
                  <span>Categorías</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categorias.map((categoria) => (
                    <div key={categoria.nombre} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer">
                      <span className="text-sm font-medium">{categoria.nombre}</span>
                      <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                        {categoria.cantidad}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Storage Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-sm">Almacenamiento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Usado</span>
                    <span>2.4 GB / 10 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar documentos..."
                  className="pl-10 pr-4 py-2 w-full rounded-md border border-border bg-background"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary">1,234</div>
                  <p className="text-muted-foreground">Total Documentos</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-accent">89</div>
                  <p className="text-muted-foreground">Subidos este Mes</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-yellow-600">12</div>
                  <p className="text-muted-foreground">En Revisión</p>
                </CardContent>
              </Card>
            </div>

            {/* Documents List */}
            <Card>
              <CardHeader>
                <CardTitle>Documentos Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documentos.map((documento) => (
                    <div key={documento.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary">{documento.nombre}</h3>
                          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                            <span>Cliente: {documento.cliente}</span>
                            <span>•</span>
                            <span>{documento.tamaño}</span>
                            <span>•</span>
                            <span>{documento.fechaSubida}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(documento.estado)}`}>
                          {documento.estado}
                        </span>
                        <Button variant="outline" size="sm">
                          Descargar
                        </Button>
                      </div>
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

export default Documentos;