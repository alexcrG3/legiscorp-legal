import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { asuntoId, descripcion, tipo } = await req.json();
    
    console.log('Clasificando asunto:', asuntoId);

    // Llamar a Lovable AI para clasificar el asunto
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY no configurada');
    }

    const prompt = `Eres un asistente legal experto. Analiza el siguiente caso y proporciona:
1. Área del derecho (civil, penal, laboral, mercantil, familia, administrativo, etc.)
2. Nivel de complejidad (baja, media o alta)
3. Sugerencia de próximos pasos (máximo 3 pasos concretos)

Tipo de caso: ${tipo || 'No especificado'}
Descripción del caso: ${descripcion}

Formato de respuesta:
**Área del Derecho:** [área]
**Complejidad:** [nivel]
**Próximos Pasos:**
1. [paso 1]
2. [paso 2]
3. [paso 3]`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'Eres un asistente legal experto especializado en clasificación de casos legales.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('Error de AI:', aiResponse.status, errorText);
      throw new Error(`Error al clasificar con IA: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const clasificacion = aiData.choices[0].message.content;
    
    console.log('Clasificación generada:', clasificacion);

    // Actualizar el asunto en la base de datos
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: asunto, error: updateError } = await supabase
      .from('asuntos')
      .update({ clasificacion_ia: clasificacion })
      .eq('id', asuntoId)
      .select()
      .single();

    if (updateError) {
      console.error('Error al actualizar asunto:', updateError);
      throw updateError;
    }

    console.log('Asunto actualizado con clasificación IA');

    return new Response(
      JSON.stringify({ 
        success: true, 
        clasificacion,
        asunto 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error en clasificar-asunto:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});