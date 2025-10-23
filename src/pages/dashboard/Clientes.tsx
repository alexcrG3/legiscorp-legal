import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Search, Filter, FileText, Calendar, Database, Edit, Trash2, Loader2 } from "lucide-react";
import { useClientes } from "@/hooks/useClientes";
import { AsuntosDialog } from "@/components/clientes/AsuntosDialog";
import { EditarClienteDialog } from "@/components/clientes/EditarClienteDialog";
import { NuevoClienteDialog } from "@/components/clientes/NuevoClienteDialog";
import { NuevoAsuntoDialog } from "@/components/asuntos/NuevoAsuntoDialog";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Clientes = () => {
  const navigate = useNavigate();
  const { clientes, isLoading, deleteCliente } = useClientes();
  const [nuevoClienteDialog, setNuevoClienteDialog] = useState(false);
  const [nuevoAsuntoDialog, setNuevoAsuntoDialog] = useState<{ open: boolean; clienteId?: string }>({ open: false });
  const [asuntosDialog, setAsuntosDialog] = useState<{ open: boolean; clienteId: string; clienteNombre: string }>({
    open: false,
    clienteId: "",
    clienteNombre: "",
  });
  const [editDialog, setEditDialog] = useState<{ open: boolean; cliente: any }>({
    open: false,
    cliente: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; clienteId: string; clienteNombre: string }>({
    open: false,
    clienteId: "",
    clienteNombre: "",
  });

  const handleVerAsuntos = (cliente: any) => {
    setAsuntosDialog({
      open: true,
      clienteId: cliente.id,
      clienteNombre: cliente.nombre,
    });
  };

  const handleNuevoAsunto = (clienteId: string) => {
    setNuevoAsuntoDialog({ open: true, clienteId });
  };

  const handleCalendario = (clienteId: string) => {
    navigate(`/dashboard/calendario?clienteId=${clienteId}`);
  };

  const handleDocumentos = (clienteId: string) => {
    navigate(`/dashboard/documentos?clienteId=${clienteId}`);
  };

  const handleEditar = (cliente: any) => {
    setEditDialog({ open: true, cliente });
  };

  const handleEliminar = (cliente: any) => {
    setDeleteDialog({
      open: true,
      clienteId: cliente.id,
      clienteNombre: cliente.nombre,
    });
  };

  const confirmDelete = () => {
    deleteCliente(deleteDialog.clienteId);
    setDeleteDialog({ open: false, clienteId: "", clienteNombre: "" });
  };

  const activeClientes = clientes?.filter((c: any) => c.estado === "Activo") || [];
  const totalCasos = clientes?.reduce((sum: number, c: any) => sum + (c.asuntos?.[0]?.count || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-accent" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Gestión de Clientes</h1>
              <p className="text-muted-foreground">Administra tu cartera de clientes</p>
            </div>
          </div>
          <Button variant="accent" onClick={() => setNuevoClienteDialog(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Nuevo Cliente
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
              <div className="text-2xl font-bold text-primary">{clientes?.length || 0}</div>
              <p className="text-muted-foreground">Total Clientes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-accent">{activeClientes.length}</div>
              <p className="text-muted-foreground">Clientes Activos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">{totalCasos}</div>
              <p className="text-muted-foreground">Casos en Progreso</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">
                {clientes?.filter((c: any) => {
                  const created = new Date(c.created_at);
                  const now = new Date();
                  const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
                  return created > monthAgo;
                }).length || 0}
              </div>
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
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : clientes && clientes.length > 0 ? (
              <div className="space-y-6">
                {clientes.map((cliente: any) => {
                  const asuntosCount = cliente.asuntos?.[0]?.count || 0;
                  return (
                    <Card key={cliente.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                            <Users className="h-8 w-8 text-slate-600" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-xl font-semibold text-primary">{cliente.nombre}</h3>
                              <span className="text-sm text-muted-foreground">#{cliente.id.slice(0, 8)}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-8 mt-2">
                              {cliente.email && (
                                <div className="flex items-center space-x-2">
                                  <span className="text-muted-foreground">Email</span>
                                  <span className="text-sm">{cliente.email}</span>
                                </div>
                              )}
                              {cliente.telefono && (
                                <div className="flex items-center space-x-2">
                                  <span className="text-muted-foreground">Teléfono</span>
                                  <span className="text-sm">{cliente.telefono}</span>
                                </div>
                              )}
                              {cliente.direccion && (
                                <div className="flex items-center space-x-2">
                                  <span className="text-muted-foreground">Dirección</span>
                                  <span className="text-sm">{cliente.direccion}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                          {cliente.estado}
                        </span>
                      </div>

                      <div className="flex items-center flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                          onClick={() => handleVerAsuntos(cliente)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Asuntos ({asuntosCount})
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 border-green-200 hover:bg-green-50"
                          onClick={() => handleNuevoAsunto(cliente.id)}
                        >
                          + Nuevo Asunto
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleCalendario(cliente.id)}
                        >
                          <Calendar className="h-4 w-4 mr-1" />
                          Calendario
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-gray-600 border-gray-200 hover:bg-gray-50"
                          onClick={() => handleDocumentos(cliente.id)}
                        >
                          <Database className="h-4 w-4 mr-1" />
                          Documentos (0)
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-blue-600 text-white"
                          onClick={() => handleEditar(cliente)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Editar Cliente
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50 bg-red-600 text-white"
                          onClick={() => handleEliminar(cliente)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Eliminar Cliente
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No hay clientes registrados
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <NuevoClienteDialog
        open={nuevoClienteDialog}
        onOpenChange={setNuevoClienteDialog}
      />

      <NuevoAsuntoDialog
        open={nuevoAsuntoDialog.open}
        onOpenChange={(open) => setNuevoAsuntoDialog({ open })}
        clienteId={nuevoAsuntoDialog.clienteId}
      />

      <AsuntosDialog
        open={asuntosDialog.open}
        onOpenChange={(open) => setAsuntosDialog({ ...asuntosDialog, open })}
        clienteId={asuntosDialog.clienteId}
        clienteNombre={asuntosDialog.clienteNombre}
      />

      <EditarClienteDialog
        open={editDialog.open}
        onOpenChange={(open) => setEditDialog({ ...editDialog, open })}
        cliente={editDialog.cliente}
      />

      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar cliente?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de eliminar a {deleteDialog.clienteNombre}? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Clientes;
