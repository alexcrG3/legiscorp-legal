-- Crear tabla de consultas
CREATE TABLE public.consultas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  firma_id UUID NOT NULL REFERENCES public.firmas(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  correo TEXT NOT NULL,
  telefono TEXT,
  mensaje TEXT NOT NULL,
  tipo_asunto TEXT,
  nivel_urgencia TEXT,
  clasificacion_ia TEXT,
  estado TEXT NOT NULL DEFAULT 'Pendiente',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.consultas ENABLE ROW LEVEL SECURITY;

-- Política: Usuarios de la firma pueden ver sus consultas
CREATE POLICY "Usuarios pueden ver consultas de su firma"
ON public.consultas
FOR SELECT
TO authenticated
USING (firma_id IN (
  SELECT firma_id FROM public.profiles WHERE id = auth.uid()
));

-- Política: Usuarios pueden actualizar consultas
CREATE POLICY "Usuarios pueden actualizar consultas"
ON public.consultas
FOR UPDATE
TO authenticated
USING (firma_id IN (
  SELECT firma_id FROM public.profiles WHERE id = auth.uid()
));

-- Política: Permitir inserciones anónimas (para formulario público)
CREATE POLICY "Permitir inserciones públicas"
ON public.consultas
FOR INSERT
TO anon
WITH CHECK (true);

-- Trigger para updated_at
CREATE TRIGGER update_consultas_updated_at
BEFORE UPDATE ON public.consultas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Índices para mejor rendimiento
CREATE INDEX idx_consultas_firma_id ON public.consultas(firma_id);
CREATE INDEX idx_consultas_estado ON public.consultas(estado);
CREATE INDEX idx_consultas_created_at ON public.consultas(created_at DESC);