-- ========================================
-- EXPORTACIÓN DE DATOS
-- Base de datos: Legiscorp
-- Fecha: 2025-10-23
-- ========================================

-- IMPORTANTE: Ejecuta este script DESPUÉS de haber importado el schema (supabase-export-schema.sql)

-- ========================================
-- DATOS: FIRMAS
-- ========================================

INSERT INTO public.firmas (id, nombre, subdominio, logo_url, color_primario, plan, fecha_registro, created_at, updated_at)
VALUES (
  'bf763d78-891d-463c-ad5c-4cdb5d38de9d',
  'Firma Legal Demo',
  'demo',
  NULL,
  '#1a1a1a',
  'premium',
  '2025-10-23 04:02:27.523404+00',
  '2025-10-23 04:02:27.523404+00',
  '2025-10-23 04:02:27.523404+00'
);

-- ========================================
-- DATOS: PROFILES
-- ========================================

INSERT INTO public.profiles (id, email, nombre, telefono, avatar_url, rol, firma_id, created_at, updated_at)
VALUES (
  'ee2c2fe2-9d8c-4366-8c59-be297cc1042d',
  'alxndrgm@gmail.com',
  'Alexander Grand',
  NULL,
  NULL,
  'SuperAdmin',
  NULL,
  '2025-10-23 04:25:43.474663+00',
  '2025-10-23 04:53:28.504739+00'
);

-- ========================================
-- NOTAS IMPORTANTES
-- ========================================
-- 1. Las tablas clientes, asuntos, citas, consultas y documentos están vacías
-- 2. El usuario con ID 'ee2c2fe2-9d8c-4366-8c59-be297cc1042d' debe existir en auth.users
-- 3. Después de importar este script, deberás crear el usuario manualmente en Supabase Auth:
--    - Email: alxndrgm@gmail.com
--    - User ID: ee2c2fe2-9d8c-4366-8c59-be297cc1042d (usa este UUID específico)

-- ========================================
-- FIN DE EXPORTACIÓN DE DATOS
-- ========================================
