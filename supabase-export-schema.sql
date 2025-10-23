-- ========================================
-- EXPORTACIÓN COMPLETA DE ESQUEMA
-- Base de datos: Legiscorp
-- Fecha: 2025-10-23
-- ========================================

-- ========================================
-- FUNCIONES
-- ========================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Función para crear perfil automáticamente al registrar usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  user_count INTEGER;
BEGIN
  -- Contar usuarios existentes
  SELECT COUNT(*) INTO user_count FROM profiles;
  
  -- Si es el primer usuario, asignar SuperAdmin, sino Asistente
  INSERT INTO public.profiles (id, email, nombre, rol, firma_id)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nombre', NEW.email),
    CASE WHEN user_count = 0 THEN 'SuperAdmin' ELSE 'Asistente' END,
    NULL
  );
  RETURN NEW;
END;
$$;

-- ========================================
-- TABLAS
-- ========================================

-- Tabla: firmas
CREATE TABLE public.firmas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  subdominio TEXT,
  logo_url TEXT,
  color_primario TEXT DEFAULT '#1a1a1a',
  plan TEXT DEFAULT 'basico',
  fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla: profiles
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY,
  email TEXT,
  nombre TEXT,
  telefono TEXT,
  avatar_url TEXT,
  rol TEXT NOT NULL DEFAULT 'Asistente',
  firma_id UUID REFERENCES public.firmas(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla: clientes
CREATE TABLE public.clientes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  firma_id UUID NOT NULL REFERENCES public.firmas(id),
  nombre TEXT NOT NULL,
  email TEXT,
  telefono TEXT,
  direccion TEXT,
  estado TEXT DEFAULT 'Activo',
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla: asuntos
CREATE TABLE public.asuntos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  firma_id UUID NOT NULL REFERENCES public.firmas(id),
  cliente_id UUID REFERENCES public.clientes(id),
  abogado_id UUID REFERENCES public.profiles(id),
  titulo TEXT NOT NULL,
  tipo TEXT,
  descripcion TEXT,
  estado TEXT DEFAULT 'En Investigación',
  prioridad TEXT DEFAULT 'Media',
  fecha_inicio DATE DEFAULT CURRENT_DATE,
  fecha_proxima_audiencia DATE,
  clasificacion_ia TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla: citas
CREATE TABLE public.citas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  firma_id UUID NOT NULL REFERENCES public.firmas(id),
  cliente_id UUID REFERENCES public.clientes(id),
  abogado_id UUID REFERENCES public.profiles(id),
  titulo TEXT NOT NULL,
  descripcion TEXT,
  fecha TIMESTAMP WITH TIME ZONE NOT NULL,
  duracion INTEGER DEFAULT 60,
  ubicacion TEXT,
  estado TEXT DEFAULT 'Programada',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla: consultas
CREATE TABLE public.consultas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  firma_id UUID NOT NULL REFERENCES public.firmas(id),
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

-- Tabla: documentos
CREATE TABLE public.documentos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  firma_id UUID NOT NULL REFERENCES public.firmas(id),
  asunto_id UUID REFERENCES public.asuntos(id),
  nombre TEXT NOT NULL,
  tipo TEXT,
  url TEXT,
  tamaño TEXT,
  estado TEXT DEFAULT 'Activo',
  fecha_subida TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ========================================
-- TRIGGERS
-- ========================================

-- Trigger: Actualizar updated_at en profiles
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger: Actualizar updated_at en firmas
CREATE TRIGGER update_firmas_updated_at
BEFORE UPDATE ON public.firmas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger: Actualizar updated_at en clientes
CREATE TRIGGER update_clientes_updated_at
BEFORE UPDATE ON public.clientes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger: Actualizar updated_at en asuntos
CREATE TRIGGER update_asuntos_updated_at
BEFORE UPDATE ON public.asuntos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger: Actualizar updated_at en citas
CREATE TRIGGER update_citas_updated_at
BEFORE UPDATE ON public.citas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger: Actualizar updated_at en consultas
CREATE TRIGGER update_consultas_updated_at
BEFORE UPDATE ON public.consultas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger: Actualizar updated_at en documentos
CREATE TRIGGER update_documentos_updated_at
BEFORE UPDATE ON public.documentos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger: Crear perfil automáticamente al registrar usuario
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- ROW LEVEL SECURITY (RLS)
-- ========================================

-- Habilitar RLS en todas las tablas
ALTER TABLE public.firmas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asuntos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.citas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documentos ENABLE ROW LEVEL SECURITY;

-- Políticas para FIRMAS
CREATE POLICY "Usuarios pueden ver su firma"
ON public.firmas FOR SELECT
USING (id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "SuperAdmins pueden crear firmas"
ON public.firmas FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM profiles 
  WHERE id = auth.uid() AND rol = 'SuperAdmin'
));

-- Políticas para PROFILES
CREATE POLICY "Usuarios pueden ver su propio perfil"
ON public.profiles FOR SELECT
USING (id = auth.uid());

CREATE POLICY "Usuarios pueden actualizar su perfil"
ON public.profiles FOR UPDATE
USING (id = auth.uid());

CREATE POLICY "Usuarios y SuperAdmins pueden actualizar perfiles"
ON public.profiles FOR UPDATE
USING (
  id = auth.uid() 
  OR 
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND raw_user_meta_data->>'rol' = 'SuperAdmin'
  )
);

-- Políticas para CLIENTES
CREATE POLICY "Usuarios pueden ver clientes de su firma"
ON public.clientes FOR SELECT
USING (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Usuarios pueden crear clientes"
ON public.clientes FOR INSERT
WITH CHECK (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Usuarios pueden actualizar clientes"
ON public.clientes FOR UPDATE
USING (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Usuarios pueden eliminar clientes"
ON public.clientes FOR DELETE
USING (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

-- Políticas para ASUNTOS
CREATE POLICY "Usuarios pueden ver asuntos de su firma"
ON public.asuntos FOR SELECT
USING (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Usuarios pueden crear asuntos"
ON public.asuntos FOR INSERT
WITH CHECK (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Usuarios pueden actualizar asuntos"
ON public.asuntos FOR UPDATE
USING (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Usuarios pueden eliminar asuntos"
ON public.asuntos FOR DELETE
USING (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

-- Políticas para CITAS
CREATE POLICY "Usuarios pueden ver citas de su firma"
ON public.citas FOR SELECT
USING (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Usuarios pueden crear citas"
ON public.citas FOR INSERT
WITH CHECK (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Usuarios pueden actualizar citas"
ON public.citas FOR UPDATE
USING (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Usuarios pueden eliminar citas"
ON public.citas FOR DELETE
USING (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

-- Políticas para CONSULTAS
CREATE POLICY "Permitir inserciones públicas"
ON public.consultas FOR INSERT
WITH CHECK (true);

CREATE POLICY "Usuarios pueden ver consultas de su firma"
ON public.consultas FOR SELECT
USING (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Usuarios pueden actualizar consultas"
ON public.consultas FOR UPDATE
USING (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

-- Políticas para DOCUMENTOS
CREATE POLICY "Usuarios pueden ver documentos de su firma"
ON public.documentos FOR SELECT
USING (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Usuarios pueden crear documentos"
ON public.documentos FOR INSERT
WITH CHECK (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Usuarios pueden eliminar documentos"
ON public.documentos FOR DELETE
USING (firma_id IN (SELECT firma_id FROM profiles WHERE id = auth.uid()));

-- ========================================
-- FIN DE EXPORTACIÓN
-- ========================================
