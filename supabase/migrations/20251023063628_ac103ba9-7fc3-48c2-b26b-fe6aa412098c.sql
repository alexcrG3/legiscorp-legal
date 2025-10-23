-- Crear tabla de jurisprudencia
CREATE TABLE public.jurisprudencia (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  firma_id uuid NOT NULL,
  titulo text NOT NULL,
  corte text NOT NULL,
  expediente text NOT NULL,
  fecha date NOT NULL,
  materia text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  resumen text NOT NULL,
  relevancia text NOT NULL DEFAULT 'Media',
  contenido_completo text,
  url_documento text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.jurisprudencia ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Usuarios pueden ver jurisprudencia de su firma"
ON public.jurisprudencia
FOR SELECT
USING (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Usuarios pueden crear jurisprudencia"
ON public.jurisprudencia
FOR INSERT
WITH CHECK (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Usuarios pueden actualizar jurisprudencia"
ON public.jurisprudencia
FOR UPDATE
USING (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Usuarios pueden eliminar jurisprudencia"
ON public.jurisprudencia
FOR DELETE
USING (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

-- Trigger para updated_at
CREATE TRIGGER update_jurisprudencia_updated_at
BEFORE UPDATE ON public.jurisprudencia
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();