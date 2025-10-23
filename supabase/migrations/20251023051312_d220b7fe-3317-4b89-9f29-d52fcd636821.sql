-- Eliminar la política problemática que causa recursión infinita
DROP POLICY IF EXISTS "Admins pueden asignar firmas a usuarios" ON public.profiles;

-- Eliminar la función que ya no se usará
DROP FUNCTION IF EXISTS public.is_admin_or_superadmin(UUID);

-- Crear una política más simple que NO cause recursión
-- Solo permite que los usuarios actualicen su propio perfil Y que SuperAdmins actualicen cualquier perfil
CREATE POLICY "Usuarios y SuperAdmins pueden actualizar perfiles"
ON public.profiles
FOR UPDATE
USING (
  id = auth.uid() 
  OR 
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND raw_user_meta_data->>'rol' = 'SuperAdmin'
  )
);