import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Plus, Edit, Trash2, Clock, MapPin, User, Phone, Mail, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

interface Cita {
  id: string;
  titulo: string;
  cliente: string;
  telefono: string;
  email: string;
  fecha: string;
  hora: string;
  duracion: number;
  tipo: 'consulta' | 'audiencia' | 'reunion' | 'firma';
  estado: 'programada' | 'confirmada' | 'completada' | 'cancelada';
  ubicacion: string;
  notas: string;
  abogado: string;
}

const mockCitas: Cita[] = [
  {
    id: '1',
    titulo: 'Consulta inicial - Divorcio',
    cliente: 'María González',
    telefono: '+52 55 1234 5678',
    email: 'maria.gonzalez@email.com',
    fecha: '2024-01-15',
    hora: '10:00',
    duracion: 60,
    tipo: 'consulta',
    estado: 'confirmada',
    ubicacion: 'Oficina Principal - Sala 1',
    notas: 'Primera consulta para proceso de divorcio contencioso',
    abogado: 'Lic. Juan Pérez'
  },
  {
    id: '2',
    titulo: 'Audiencia Laboral',
    cliente: 'Carlos Ramírez',
    telefono: '+52 55 9876 5432',
    email: 'carlos.ramirez@email.com',
    fecha: '2024-01-16',
    hora: '14:30',
    duracion: 120,
    tipo: 'audiencia',
    estado: 'programada',
    ubicacion: 'Juzgado Laboral #3',
    notas: 'Audiencia inicial de conciliación',
    abogado: 'Lic. Ana López'
  },
  {
    id: '3',
    titulo: 'Firma de Contrato',
    cliente: 'Empresa ABC S.A.',
    telefono: '+52 55 5555 1234',
    email: 'legal@empresaabc.com',
    fecha: '2024-01-17',
    hora: '16:00',
    duracion: 45,
    tipo: 'firma',
    estado: 'programada',
    ubicacion: 'Oficina Principal - Sala de Juntas',
    notas: 'Firma de contrato de prestación de servicios',
    abogado: 'Lic. Juan Pérez'
  }
];

const tipoColors = {
  consulta: 'bg-blue-100 text-blue-800',
  audiencia: 'bg-red-100 text-red-800',
  reunion: 'bg-green-100 text-green-800',
  firma: 'bg-purple-100 text-purple-800'
};

const estadoColors = {
  programada: 'bg-yellow-100 text-yellow-800',
  confirmada: 'bg-green-100 text-green-800',
  completada: 'bg-gray-100 text-gray-800',
  cancelada: 'bg-red-100 text-red-800'
};

export default function Citas() {
  const navigate = useNavigate();
  const [citas, setCitas] = useState<Cita[]>(mockCitas);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCita, setEditingCita] = useState<Cita | null>(null);
  const [formData, setFormData] = useState<Partial<Cita>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCita) {
      // Editar cita existente
      setCitas(prev => prev.map(cita => 
        cita.id === editingCita.id 
          ? { ...cita, ...formData } as Cita
          : cita
      ));
    } else {
      // Crear nueva cita
      const newCita: Cita = {
        id: Date.now().toString(),
        titulo: formData.titulo || '',
        cliente: formData.cliente || '',
        telefono: formData.telefono || '',
        email: formData.email || '',
        fecha: formData.fecha || '',
        hora: formData.hora || '',
        duracion: formData.duracion || 60,
        tipo: formData.tipo as Cita['tipo'] || 'consulta',
        estado: formData.estado as Cita['estado'] || 'programada',
        ubicacion: formData.ubicacion || '',
        notas: formData.notas || '',
        abogado: formData.abogado || ''
      };
      setCitas(prev => [...prev, newCita]);
    }
    
    setIsDialogOpen(false);
    setEditingCita(null);
    setFormData({});
  };

  const handleEdit = (cita: Cita) => {
    setEditingCita(cita);
    setFormData(cita);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setCitas(prev => prev.filter(cita => cita.id !== id));
  };

  const openNewDialog = () => {
    setEditingCita(null);
    setFormData({
      fecha: format(new Date(), 'yyyy-MM-dd'),
      hora: '10:00',
      duracion: 60,
      tipo: 'consulta',
      estado: 'programada'
    });
    setIsDialogOpen(true);
  };

  const citasHoy = citas.filter(cita => cita.fecha === format(new Date(), 'yyyy-MM-dd'));
  const citasProgramadas = citas.filter(cita => cita.estado === 'programada' || cita.estado === 'confirmada');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-primary" />
              <span>Gestión de Citas</span>
            </h1>
            <p className="text-muted-foreground">Administra todas las citas del bufete</p>
          </div>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Nueva Cita</span>
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCita ? 'Editar Cita' : 'Nueva Cita'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="titulo">Título de la Cita</Label>
                  <Input
                    id="titulo"
                    value={formData.titulo || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
                    placeholder="Ej: Consulta inicial - Divorcio"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="cliente">Cliente</Label>
                  <Input
                    id="cliente"
                    value={formData.cliente || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, cliente: e.target.value }))}
                    placeholder="Nombre del cliente"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                    placeholder="+52 55 1234 5678"
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="cliente@email.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="fecha">Fecha</Label>
                  <Input
                    id="fecha"
                    type="date"
                    value={formData.fecha || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, fecha: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="hora">Hora</Label>
                  <Input
                    id="hora"
                    type="time"
                    value={formData.hora || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, hora: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="duracion">Duración (min)</Label>
                  <Input
                    id="duracion"
                    type="number"
                    value={formData.duracion || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, duracion: parseInt(e.target.value) }))}
                    placeholder="60"
                    min="15"
                    step="15"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tipo">Tipo de Cita</Label>
                  <Select 
                    value={formData.tipo || ''} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, tipo: value as Cita['tipo'] }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consulta">Consulta</SelectItem>
                      <SelectItem value="audiencia">Audiencia</SelectItem>
                      <SelectItem value="reunion">Reunión</SelectItem>
                      <SelectItem value="firma">Firma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="estado">Estado</Label>
                  <Select 
                    value={formData.estado || ''} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, estado: value as Cita['estado'] }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="programada">Programada</SelectItem>
                      <SelectItem value="confirmada">Confirmada</SelectItem>
                      <SelectItem value="completada">Completada</SelectItem>
                      <SelectItem value="cancelada">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="abogado">Abogado Asignado</Label>
                  <Input
                    id="abogado"
                    value={formData.abogado || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, abogado: e.target.value }))}
                    placeholder="Lic. Juan Pérez"
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="ubicacion">Ubicación</Label>
                  <Input
                    id="ubicacion"
                    value={formData.ubicacion || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, ubicacion: e.target.value }))}
                    placeholder="Oficina Principal - Sala 1"
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="notas">Notas</Label>
                  <Textarea
                    id="notas"
                    value={formData.notas || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, notas: e.target.value }))}
                    placeholder="Notas adicionales sobre la cita..."
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingCita ? 'Actualizar' : 'Crear'} Cita
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Citas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{citas.length}</div>
            <p className="text-xs text-muted-foreground">Todas las citas registradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{citasHoy.length}</div>
            <p className="text-xs text-muted-foreground">Programadas para hoy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{citasProgramadas.length}</div>
            <p className="text-xs text-muted-foreground">Por confirmar o programadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {citas.filter(cita => {
                const citaDate = new Date(cita.fecha);
                const now = new Date();
                const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
                const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
                return citaDate >= startOfWeek && citaDate <= endOfWeek;
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">Citas de esta semana</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Citas */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Citas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Abogado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {citas.map((cita) => (
                <TableRow key={cita.id}>
                  <TableCell className="font-medium">{cita.titulo}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{cita.cliente}</div>
                      <div className="text-sm text-muted-foreground flex items-center space-x-2">
                        <Phone className="h-3 w-3" />
                        <span>{cita.telefono}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(cita.fecha), 'dd/MM/yyyy', { locale: es })}
                  </TableCell>
                  <TableCell>{cita.hora}</TableCell>
                  <TableCell>
                    <Badge className={tipoColors[cita.tipo]}>
                      {cita.tipo.charAt(0).toUpperCase() + cita.tipo.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={estadoColors[cita.estado]}>
                      {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{cita.abogado}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(cita)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(cita.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}