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
    const { consultaId, mensaje } = await req.json();

    if (!consultaId || !mensaje) {
      return new Response(
        JSON.stringify({ error: 'Faltan parámetros requeridos' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY no configurada');
    }

    console.log('Clasificando consulta:', consultaId);

    // Llamar a Lovable AI para clasificar la consulta
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `Actúa como asistente legal experto. Analiza el mensaje de un cliente potencial y clasifícalo.

Debes responder ÚNICAMENTE en formato JSON con esta estructura exacta:
{
  "tipo_asunto": "civil|laboral|penal|familiar|corporativo|otro",
  "nivel_urgencia": "alta|media|baja",
  "respuesta_sugerida": "Texto de respuesta inicial sugerida para el abogado (máximo 200 palabras)"
}

Criterios de urgencia:
- ALTA: Asuntos penales, órdenes judiciales, plazos inmediatos
- MEDIA: Consultas que requieren atención pronta pero no inmediata
- BAJA: Consultas informativas o sin fecha límite

Se profesional, empático y conciso en la respuesta sugerida.`
          },
          {
            role: 'user',
            content: `Mensaje del cliente: ${mensaje}`
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('Error de Lovable AI:', aiResponse.status, errorText);
      throw new Error(`Error en clasificación IA: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const clasificacion = aiData.choices[0].message.content;
    
    console.log('Clasificación IA:', clasificacion);

    // Parsear la respuesta JSON
    let clasificacionData;
    try {
      clasificacionData = JSON.parse(clasificacion);
    } catch (e) {
      console.error('Error parseando JSON de IA:', e);
      clasificacionData = {
        tipo_asunto: 'otro',
        nivel_urgencia: 'media',
        respuesta_sugerida: clasificacion
      };
    }

    // Actualizar la consulta en la base de datos
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabase = createClient(supabaseUrl!, supabaseKey!);

    const { error: updateError } = await supabase
      .from('consultas')
      .update({
        tipo_asunto: clasificacionData.tipo_asunto,
        nivel_urgencia: clasificacionData.nivel_urgencia,
        clasificacion_ia: JSON.stringify(clasificacionData),
        updated_at: new Date().toISOString()
      })
      .eq('id', consultaId);

    if (updateError) {
      console.error('Error actualizando consulta:', updateError);
      throw updateError;
    }

    console.log('Consulta clasificada exitosamente');

    return new Response(
      JSON.stringify({ 
        success: true, 
        clasificacion: clasificacionData 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error en clasificar-consulta:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});