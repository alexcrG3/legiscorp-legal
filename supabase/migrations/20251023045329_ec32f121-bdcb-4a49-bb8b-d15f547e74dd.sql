-- Cambiar rol del usuario actual a SuperAdmin
UPDATE profiles 
SET rol = 'SuperAdmin' 
WHERE email = 'alxndrgm@gmail.com';

-- Modificar trigger para auto-asignar SuperAdmin al primer usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
$function$;