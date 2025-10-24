import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useJurisprudencia() {
  const queryClient = useQueryClient();

  const { data: jurisprudencia, isLoading } = useQuery({
    queryKey: ["jurisprudencia"],
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
        .from("jurisprudencia")
        .select("*")
        .eq("firma_id", userProfile.firma_id)
        .order("fecha", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return {
    jurisprudencia,
    isLoading,
  };
}
