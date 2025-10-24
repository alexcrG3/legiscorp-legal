import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Obtener la firma demo existente
    const { data: firma } = await supabaseAdmin
      .from("firmas")
      .select("id")
      .eq("nombre", "Firma Legal Demo")
      .single();

    const firmaId = firma?.id;

    const usuariosPrueba = [
      {
        email: "admin@legaltech.com",
        password: "Admin123!",
        nombre: "Carlos Martínez",
        rol: "Admin",
        telefono: "+52 55 1234 5678"
      },
      {
        email: "abogado@legaltech.com",
        password: "Abogado123!",
        nombre: "María García",
        rol: "Asistente",
        telefono: "+52 55 2345 6789"
      },
      {
        email: "asistente@legaltech.com",
        password: "Asistente123!",
        nombre: "Juan López",
        rol: "Asistente",
        telefono: "+52 55 3456 7890"
      }
    ];

    const usuariosCreados = [];

    for (const usuario of usuariosPrueba) {
      // Crear usuario en auth
      const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: usuario.email,
        password: usuario.password,
        email_confirm: true,
        user_metadata: {
          nombre: usuario.nombre
        }
      });

      if (authError) {
        console.error(`Error creando usuario ${usuario.email}:`, authError);
        continue;
      }

      // Esperar un momento para que el trigger cree el perfil
      await new Promise(resolve => setTimeout(resolve, 500));

      // Actualizar perfil con datos adicionales
      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .update({
          nombre: usuario.nombre,
          telefono: usuario.telefono,
          rol: usuario.rol,
          firma_id: firmaId
        })
        .eq("id", authUser.user.id);

      if (profileError) {
        console.error(`Error actualizando perfil de ${usuario.email}:`, profileError);
      }

      usuariosCreados.push({
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol,
        id: authUser.user.id
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        mensaje: `${usuariosCreados.length} usuarios creados exitosamente`,
        usuarios: usuariosCreados
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
