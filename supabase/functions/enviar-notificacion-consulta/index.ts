import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { consultaId } = await req.json();

    if (!consultaId) {
      return new Response(
        JSON.stringify({ error: 'Falta consultaId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabase = createClient(supabaseUrl!, supabaseKey!);

    // Obtener la consulta con datos de la firma
    const { data: consulta, error: consultaError } = await supabase
      .from('consultas')
      .select('*, firmas(*)')
      .eq('id', consultaId)
      .single();

    if (consultaError || !consulta) {
      console.error('Error obteniendo consulta:', consultaError);
      throw new Error('Consulta no encontrada');
    }

    // Obtener usuarios admin de la firma
    const { data: admins, error: adminsError } = await supabase
      .from('profiles')
      .select('email, nombre')
      .eq('firma_id', consulta.firma_id)
      .in('rol', ['Admin', 'SuperAdmin']);

    if (adminsError) {
      console.error('Error obteniendo admins:', adminsError);
    }

    console.log('Nueva consulta recibida:', {
      consultaId,
      firma: consulta.firmas?.nombre,
      cliente: consulta.nombre,
      admins: admins?.length || 0
    });

    // TODO: Aquí se puede integrar con Resend u otro servicio de email
    // Por ahora solo registramos en logs
    console.log('Notificación pendiente de envío a:', admins?.map(a => a.email));

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Notificación procesada',
        adminsNotificados: admins?.length || 0
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error en enviar-notificacion-consulta:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});