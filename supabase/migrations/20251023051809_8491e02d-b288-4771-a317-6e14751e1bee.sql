-- Ver las políticas actuales
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'profiles';

-- Eliminar las políticas SELECT existentes que causan problemas
DROP POLICY IF EXISTS "Usuarios pueden ver perfiles de su firma" ON public.profiles;

-- Crear una política SELECT simple que permita a cada usuario ver su propio perfil
-- Y que permita ver perfiles de la misma firma
CREATE POLICY "Usuarios pueden ver su propio perfil"
ON public.profiles
FOR SELECT
USING (id = auth.uid());

-- Política adicional: SuperAdmins pueden ver todos los perfiles
CREATE POLICY "SuperAdmins ven todos los perfiles"
ON public.profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid() 
    AND p.rol = 'SuperAdmin'
  )
);