import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user");

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*, firmas(*)")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return profile;
    },
  });
}