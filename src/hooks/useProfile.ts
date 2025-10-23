import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user");

      console.log("🔍 Usuario autenticado:", user.id, user.email);

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*, firmas(*)")
        .eq("id", user.id)
        .single();

      console.log("📊 Perfil obtenido:", profile);
      console.log("🎭 Rol del usuario:", profile?.rol);

      if (error) {
        console.error("❌ Error al obtener perfil:", error);
        throw error;
      }
      return profile;
    },
    staleTime: 0,
    refetchOnMount: true,
  });
}