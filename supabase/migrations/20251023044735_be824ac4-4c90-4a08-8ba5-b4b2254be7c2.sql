-- Modificar el trigger para que NO asigne firma automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, nombre, rol, firma_id)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nombre', NEW.email),
    'Asistente',
    NULL  -- No asignar firma al registrarse
  );
  RETURN NEW;
END;
$function$;

-- Crear función para verificar si un usuario es SuperAdmin o Admin
CREATE OR REPLACE FUNCTION public.is_admin_or_superadmin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = user_id 
    AND rol IN ('SuperAdmin', 'Admin')
  );
$$;

-- Política para que SuperAdmin y Admin puedan actualizar perfiles de usuarios sin firma
CREATE POLICY "Admins pueden asignar firmas a usuarios"
ON public.profiles
FOR UPDATE
USING (
  public.is_admin_or_superadmin(auth.uid()) 
  AND (firma_id IS NULL OR firma_id IN (
    SELECT firma_id FROM profiles WHERE id = auth.uid()
  ))
);