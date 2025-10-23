-- =====================================================
-- FASE 1: MVP LEGAL INTERNO - ESTRUCTURA BASE DE DATOS
-- Orden corregido de creación de tablas
-- =====================================================

-- 1. Crear tabla de Firmas (sin políticas que dependan de profiles)
CREATE TABLE IF NOT EXISTS public.firmas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  subdominio TEXT UNIQUE,
  logo_url TEXT,
  color_primario TEXT DEFAULT '#1a1a1a',
  plan TEXT DEFAULT 'basico',
  fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.firmas ENABLE ROW LEVEL SECURITY;

-- 2. Crear tabla de perfiles de usuario (ahora que firmas existe)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  firma_id UUID REFERENCES public.firmas(id) ON DELETE CASCADE,
  rol TEXT NOT NULL DEFAULT 'Asistente',
  nombre TEXT,
  email TEXT,
  telefono TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT rol_valido CHECK (rol IN ('SuperAdmin', 'AdminFirma', 'Abogado', 'Asistente'))
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Ahora crear políticas para firmas que dependen de profiles
CREATE POLICY "Usuarios pueden ver su firma"
  ON public.firmas
  FOR SELECT
  USING (id IN (
    SELECT firma_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "SuperAdmins pueden crear firmas"
  ON public.firmas
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND rol = 'SuperAdmin'
    )
  );

-- 4. Crear políticas para profiles
CREATE POLICY "Usuarios pueden ver perfiles de su firma"
  ON public.profiles
  FOR SELECT
  USING (firma_id IN (
    SELECT firma_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Usuarios pueden actualizar su perfil"
  ON public.profiles
  FOR UPDATE
  USING (id = auth.uid());

-- 5. Crear tabla de Clientes
CREATE TABLE IF NOT EXISTS public.clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firma_id UUID NOT NULL REFERENCES public.firmas(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  email TEXT,
  telefono TEXT,
  direccion TEXT,
  estado TEXT DEFAULT 'Activo',
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT estado_valido CHECK (estado IN ('Activo', 'Inactivo'))
);

ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios pueden ver clientes de su firma"
  ON public.clientes
  FOR SELECT
  USING (firma_id IN (
    SELECT firma_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Usuarios pueden crear clientes"
  ON public.clientes
  FOR INSERT
  WITH CHECK (firma_id IN (
    SELECT firma_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Usuarios pueden actualizar clientes"
  ON public.clientes
  FOR UPDATE
  USING (firma_id IN (
    SELECT firma_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Usuarios pueden eliminar clientes"
  ON public.clientes
  FOR DELETE
  USING (firma_id IN (
    SELECT firma_id FROM public.profiles WHERE id = auth.uid()
  ));

-- 6. Crear tabla de Asuntos (Casos)
CREATE TABLE IF NOT EXISTS public.asuntos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firma_id UUID NOT NULL REFERENCES public.firmas(id) ON DELETE CASCADE,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE CASCADE,
  abogado_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  tipo TEXT,
  estado TEXT DEFAULT 'En Investigación',
  prioridad TEXT DEFAULT 'Media',
  fecha_inicio DATE DEFAULT CURRENT_DATE,
  fecha_proxima_audiencia DATE,
  clasificacion_ia TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.asuntos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios pueden ver asuntos de su firma"
  ON public.asuntos
  FOR SELECT
  USING (firma_id IN (
    SELECT firma_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Usuarios pueden crear asuntos"
  ON public.asuntos
  FOR INSERT
  WITH CHECK (firma_id IN (
    SELECT firma_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Usuarios pueden actualizar asuntos"
  ON public.asuntos
  FOR UPDATE
  USING (firma_id IN (
    SELECT firma_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Usuarios pueden eliminar asuntos"
  ON public.asuntos
  FOR DELETE
  USING (firma_id IN (
    SELECT firma_id FROM public.profiles WHERE id = auth.uid()
  ));

-- 7. Crear tabla de Documentos
CREATE TABLE IF NOT EXISTS public.documentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firma_id UUID NOT NULL REFERENCES public.firmas(id) ON DELETE CASCADE,
  asunto_id UUID REFERENCES public.asuntos(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  tipo TEXT,
  url TEXT,
  tamaño TEXT,
  estado TEXT DEFAULT 'Activo',
  fecha_subida TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.documentos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios pueden ver documentos de su firma"
  ON public.documentos
  FOR SELECT
  USING (firma_id IN (
    SELECT firma_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Usuarios pueden crear documentos"
  ON public.documentos
  FOR INSERT
  WITH CHECK (firma_id IN (
    SELECT firma_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Usuarios pueden eliminar documentos"
  ON public.documentos
  FOR DELETE
  USING (firma_id IN (
    SELECT firma_id FROM public.profiles WHERE id = auth.uid()
  ));

-- 8. Crear tabla de Citas
CREATE TABLE IF NOT EXISTS public.citas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firma_id UUID NOT NULL REFERENCES public.firmas(id) ON DELETE CASCADE,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE CASCADE,
  abogado_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  fecha TIMESTAMP WITH TIME ZONE NOT NULL,
  duracion INTEGER DEFAULT 60,
  ubicacion TEXT,
  estado TEXT DEFAULT 'Programada',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.citas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios pueden ver citas de su firma"
  ON public.citas
  FOR SELECT
  USING (firma_id IN (
    SELECT firma_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Usuarios pueden crear citas"
  ON public.citas
  FOR INSERT
  WITH CHECK (firma_id IN (
    SELECT firma_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Usuarios pueden actualizar citas"
  ON public.citas
  FOR UPDATE
  USING (firma_id IN (
    SELECT firma_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Usuarios pueden eliminar citas"
  ON public.citas
  FOR DELETE
  USING (firma_id IN (
    SELECT firma_id FROM public.profiles WHERE id = auth.uid()
  ));

-- 9. Función para actualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 10. Triggers para actualizar updated_at
CREATE TRIGGER update_firmas_updated_at
  BEFORE UPDATE ON public.firmas
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clientes_updated_at
  BEFORE UPDATE ON public.clientes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_asuntos_updated_at
  BEFORE UPDATE ON public.asuntos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_documentos_updated_at
  BEFORE UPDATE ON public.documentos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_citas_updated_at
  BEFORE UPDATE ON public.citas
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 11. Función trigger para crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, nombre, rol)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nombre', NEW.email),
    'Asistente'
  );
  RETURN NEW;
END;
$$;

-- 12. Trigger para crear perfil al registrarse
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 13. Insertar firma de demostración
INSERT INTO public.firmas (nombre, subdominio, plan)
VALUES ('Firma Legal Demo', 'demo', 'premium')
ON CONFLICT DO NOTHING;