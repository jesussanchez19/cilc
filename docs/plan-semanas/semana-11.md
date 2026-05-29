# Semana 11: Contacto e Integración de Email

**Objetivo**: Formularios de contacto funcionales con envío de emails.

## Día 72: Configurar SendGrid o Resend

- Instalar: `npm install resend` (o sendgrid)
- Configurar API keys en variables de entorno
- Crear templates de email

## Día 73: API de Envío de Email

- Crear ruta `/api/contact` con POST
- Validar datos del formulario
- Enviar email al administrador

## Día 74: Formulario de Contacto Mejorado

- Validación completa con Zod
- Diferentes tipos: general, becas, soporte técnico
- Confirmación de envío

## Día 75: Respuesta Automática al Usuario

- Enviar email de confirmación
- Incluir número de ticket
- Link para seguimiento

## Día 76: Formulario de Solicitud de Información

- Específico para programas/universidades
- Datos pre-llenados
- Guardar en base de datos

## Día 77: Notificaciones por Email al Admin

- Recibir nuevos contactos
- Resumen diario de contactos
- Alertas de solicitudes importantes

## Día 78: Testing y Validación

- Testing de envío de emails
- Validación de datos
- Commit: `[S11D78] Contacto e email completados`

---

## Archivos a Crear

```
app/api/
  contact/route.ts
  subscribe/route.ts
  
src/lib/
  email/
    templates.ts
    sendEmail.ts
    
src/components/
  forms/
    ContactForm.tsx
    InfoRequestForm.tsx
```
