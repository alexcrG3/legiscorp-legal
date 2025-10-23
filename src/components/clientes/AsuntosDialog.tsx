import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAsuntos } from "@/hooks/useAsuntos";
import { Loader2, FileText, Calendar, User } from "lucide-react";

interface AsuntosDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clienteId: string;
  clienteNombre: string;
}

export function AsuntosDialog({ open, onOpenChange, clienteId, clienteNombre }: AsuntosDialogProps) {
  const { data: asuntos, isLoading } = useAsuntos(clienteId);

  const getEstadoColor = (estado: string) => {
    const colors: Record<string, string> = {
      "En Investigación": "bg-blue-100 text-blue-800",
      "En Proceso": "bg-yellow-100 text-yellow-800",
      "Finalizado": "bg-green-100 text-green-800",
      "Archivado": "bg-gray-100 text-gray-800",
    };
    return colors[estado] || "bg-gray-100 text-gray-800";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Asuntos de {clienteNombre}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : asuntos && asuntos.length > 0 ? (
            <div className="space-y-4">
              {asuntos.map((asunto: any) => (
                <Card key={asunto.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{asunto.titulo}</h3>
                        <Badge className={getEstadoColor(asunto.estado)}>
                          {asunto.estado}
                        </Badge>
                      </div>
                    </div>
                    
                    {asunto.descripcion && (
                      <p className="text-sm text-muted-foreground mb-3">{asunto.descripcion}</p>
                    )}

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {asunto.tipo && (
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Tipo:</span>
                          <span>{asunto.tipo}</span>
                        </div>
                      )}
                      {asunto.prioridad && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Prioridad:</span>
                          <span>{asunto.prioridad}</span>
                        </div>
                      )}
                      {asunto.fecha_inicio && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Inicio:</span>
                          <span>{new Date(asunto.fecha_inicio).toLocaleDateString()}</span>
                        </div>
                      )}
                      {asunto.profiles?.nombre && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Abogado:</span>
                          <span>{asunto.profiles.nombre}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Este cliente no tiene asuntos registrados
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
