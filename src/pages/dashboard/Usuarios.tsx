import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Shield } from "lucide-react";

interface User {
  id: string;
  email: string;
  nombre: string;
  rol: string;
  firma_id: string | null;
  created_at: string;
}

interface Firma {
  id: string;
  nombre: string;
}

export default function Usuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [firmas, setFirmas] = useState<Firma[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Verificar rol del usuario actual
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user");

      const { data: profile } = await supabase
        .from("profiles")
        .select("rol, firma_id")
        .eq("id", user.id)
        .single();

      if (!profile || !["SuperAdmin", "Admin"].includes(profile.rol)) {
        toast.error("No tienes permisos para acceder a esta página");
        return;
      }

      setCurrentUserRole(profile.rol);

      // Obtener todos los usuarios sin firma (para SuperAdmin)
      // o usuarios sin firma que podrían unirse a la firma del admin
      const { data: usersData, error: usersError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (usersError) throw usersError;
      setUsers(usersData || []);

      // Obtener todas las firmas (para SuperAdmin) o solo la firma del admin
      let firmasQuery = supabase.from("firmas").select("id, nombre");
      
      if (profile.rol === "Admin") {
        firmasQuery = firmasQuery.eq("id", profile.firma_id);
      }

      const { data: firmasData, error: firmasError } = await firmasQuery;

      if (firmasError) throw firmasError;
      setFirmas(firmasData || []);
    } catch (error: any) {
      console.error("Error al cargar datos:", error);
      toast.error(error.message || "Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  const asignarFirma = async (userId: string, firmaId: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ firma_id: firmaId })
        .eq("id", userId);

      if (error) throw error;

      toast.success("Firma asignada correctamente");
      fetchData();
    } catch (error: any) {
      console.error("Error al asignar firma:", error);
      toast.error(error.message || "Error al asignar firma");
    }
  };

  const cambiarRol = async (userId: string, nuevoRol: string) => {
    if (currentUserRole !== "SuperAdmin") {
      toast.error("Solo SuperAdmin puede cambiar roles");
      return;
    }

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ rol: nuevoRol })
        .eq("id", userId);

      if (error) throw error;

      toast.success("Rol actualizado correctamente");
      fetchData();
    } catch (error: any) {
      console.error("Error al cambiar rol:", error);
      toast.error(error.message || "Error al cambiar rol");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <div>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>
                Asigna usuarios a firmas y gestiona sus roles
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Firma</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                const userFirma = firmas.find((f) => f.id === user.firma_id);
                return (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.nombre}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {currentUserRole === "SuperAdmin" ? (
                        <Select
                          value={user.rol}
                          onValueChange={(value) => cambiarRol(user.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SuperAdmin">SuperAdmin</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Asistente">Asistente</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge variant="outline">{user.rol}</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {userFirma ? (
                        <Badge>{userFirma.nombre}</Badge>
                      ) : (
                        <Badge variant="secondary">Sin asignar</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {!user.firma_id && firmas.length > 0 && (
                        <Select onValueChange={(value) => asignarFirma(user.id, value)}>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Asignar firma" />
                          </SelectTrigger>
                          <SelectContent>
                            {firmas.map((firma) => (
                              <SelectItem key={firma.id} value={firma.id}>
                                {firma.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No hay usuarios registrados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
