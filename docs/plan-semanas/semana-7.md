# Semana 7: Autenticación - Login y Registro

**Objetivo**: Sistema completo de autenticación con NextAuth.js y Supabase.

## Día 44: Configurar NextAuth.js y Supabase

- Instalar: `npm install next-auth @auth/supabase-adapter`
- Crear cuenta Supabase
- Configurar variables de entorno

## Día 45: Crear Tablas de Usuarios

- Tabla `users` en Supabase
- Tabla `sessions`
- Tabla `verification_tokens`

## Día 46: Página de Login

- `app/auth/login/page.tsx`
- Email y contraseña
- Link a registro

## Día 47: Página de Registro

- `app/auth/register/page.tsx`
- Validación de email
- Crear usuario en Supabase

## Día 48: Componente de Autenticación en Header

- Mostrar usuario si logueado
- Botones login/logout
- Dropdown de perfil

## Día 49: Verificación de Email

- Enviar email de verificación
- Link de confirmación
- Redirigir según estado

## Día 50: Testing y Seguridad

- Testing de flujos de auth
- Validar contraseñas
- Commit: `[S7D50] Autenticación completada`

---

## Archivos a Crear

```
app/auth/
  login/page.tsx
  register/page.tsx
  
src/
  components/
    auth/
      LoginForm.tsx
      RegisterForm.tsx
  lib/
    auth/
      config.ts
```
