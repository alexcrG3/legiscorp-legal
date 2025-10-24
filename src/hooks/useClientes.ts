import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useClientes() {
  const queryClient = useQueryClient();

  const { data: clientes, isLoading } = useQuery({
    queryKey: ["clientes"],
    queryFn: async () => {
      const { data: profile } = await supabase.auth.getUser();
      if (!profile.user) throw new Error("No user");

      const { data: userProfile } = await supabase
        .from("profiles")
        .select("firma_id")
        .eq("id", profile.user.id)
        .single();

      if (!userProfile?.firma_id) throw new Error("No firma");

      const { data, error } = await supabase
        .from("clientes")
        .select(`
          *,
          asuntos:asuntos(count)
        `)
        .eq("firma_id", userProfile.firma_id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (clienteId: string) => {
      const { error } = await supabase
        .from("clientes")
        .delete()
        .eq("id", clienteId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      toast.success("Cliente eliminado correctamente");
    },
    onError: (error) => {
      toast.error("Error al eliminar cliente: " + error.message);
    },
  });

  return {
    clientes,
    isLoading,
    deleteCliente: deleteMutation.mutate,
  };
}
