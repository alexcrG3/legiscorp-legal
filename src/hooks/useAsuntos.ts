import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useAsuntos(clienteId?: string) {
  return useQuery({
    queryKey: ["asuntos", clienteId],
    queryFn: async () => {
      if (!clienteId) return [];

      const { data, error } = await supabase
        .from("asuntos")
        .select(`
          *,
          clientes:cliente_id(nombre),
          profiles:abogado_id(nombre)
        `)
        .eq("cliente_id", clienteId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!clienteId,
  });
}
