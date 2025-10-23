import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useEstadisticas() {
  const { data: estadisticas, isLoading } = useQuery({
    queryKey: ["estadisticas"],
    queryFn: async () => {
      const { data: profile } = await supabase.auth.getUser();
      if (!profile.user) throw new Error("No user");

      const { data: userProfile } = await supabase
        .from("profiles")
        .select("firma_id")
        .eq("id", profile.user.id)
        .single();

      if (!userProfile?.firma_id) throw new Error("No firma");

      // Obtener todos los datos necesarios
      const [asuntosData, clientesData, citasData] = await Promise.all([
        supabase
          .from("asuntos")
          .select("*")
          .eq("firma_id", userProfile.firma_id),
        supabase
          .from("clientes")
          .select("*")
          .eq("firma_id", userProfile.firma_id),
        supabase
          .from("citas")
          .select("*")
          .eq("firma_id", userProfile.firma_id),
      ]);

      if (asuntosData.error) throw asuntosData.error;
      if (clientesData.error) throw clientesData.error;
      if (citasData.error) throw citasData.error;

      const asuntos = asuntosData.data || [];
      const clientes = clientesData.data || [];
      const citas = citasData.data || [];

      // Calcular estadísticas
      const clientesActivos = clientes.filter(c => c.estado === "Activo").length;
      const asuntosEnProceso = asuntos.filter(a => a.estado === "En proceso").length;
      const audienciasMes = citas.filter(c => {
        const citaDate = new Date(c.fecha);
        const now = new Date();
        return citaDate.getMonth() === now.getMonth() && 
               citaDate.getFullYear() === now.getFullYear();
      }).length;
      
      // Calcular casos por tipo
      const casosPorTipo = asuntos.reduce((acc: any, asunto) => {
        const tipo = asunto.tipo || "Otros";
        acc[tipo] = (acc[tipo] || 0) + 1;
        return acc;
      }, {});

      return {
        totales: {
          casosTotales: asuntos.length,
          clientesActivos,
          audienciasMes,
          asuntosEnProceso,
        },
        casosPorTipo,
        asuntos,
        clientes,
        citas,
      };
    },
  });

  return {
    estadisticas,
    isLoading,
  };
}
