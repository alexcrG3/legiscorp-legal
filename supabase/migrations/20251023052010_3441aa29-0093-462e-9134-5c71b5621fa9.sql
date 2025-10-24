-- Eliminar la política que causa recursión
DROP POLICY IF EXISTS "SuperAdmins ven todos los perfiles" ON public.profiles;

-- Los SuperAdmins podrán ver otros perfiles a través de queries específicas
-- Por ahora, cada usuario solo ve su propio perfil sin recursión