# Guía de despliegue

Pasos para poner CILC en producción. El orden importa: los dos primeros
bloquean el resto.

---

## 1. Verificar un dominio de correo en Resend

**Sin esto, ningún cliente recibe confirmación de sus formularios.**

El código usa por defecto `onboarding@resend.dev`, el dominio de pruebas de
Resend, que solo entrega al correo con el que se registró la cuenta. Enviar a
cualquier otro destinatario devuelve:

> `You can only send testing emails to your own email address. To send emails to
> other recipients, please verify a domain at resend.com/domains.`

Qué hacer:

1. Entra en <https://resend.com/domains> y añade tu dominio (por ejemplo `cilc.mx`).
2. Añade en tu DNS los registros que te indique (SPF, DKIM y DMARC).
3. Espera a que aparezca como **Verified**.
4. Define `EMAIL_FROM_DOMAIN=cilc.mx` en el entorno del hosting.

Los remitentes se construyen solos a partir de esa variable: `web@`, `hola@` y
`studio@`. No hay que tocar código.

**Mientras tanto**, el sitio no se rompe: la solicitud se guarda, el
administrador recibe su aviso y el fallo del correo al cliente queda en el log.
Pero el cliente se queda sin su confirmación.

---

## 2. Variables de entorno

Todas las marcadas como obligatorias van en el panel del hosting. La lista
completa y comentada está en [`.env.example`](.env.example).

| Variable | Si falta |
|---|---|
| `SANITY_API_READ_TOKEN` | **El sitio sale sin nada de contenido.** El dataset es privado |
| `SANITY_API_WRITE_TOKEN` | Fallan testimonios, tokens y cambio de contraseña |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | No hay conexión con el CMS |
| `NEXT_PUBLIC_SANITY_DATASET` | Igual que la anterior |
| `STUDIO_SESSION_TOKEN` | **Nadie puede entrar al Studio**: sin clave no se firman las sesiones |
| `RESEND_API_KEY` | No sale ningún correo |
| `EMAIL_FROM_DOMAIN` | Los clientes no reciben confirmación (ver paso 1) |
| `NEXT_PUBLIC_SITE_URL` | Sitemap, robots y Open Graph apuntan a `cilc.mx`, que hoy es el WordPress antiguo |
| `TESTIMONIAL_ACCESS_TOKEN` | No se pueden generar enlaces de testimonio |

`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GSC_VERIFICATION`, `SANITY_WEBHOOK_SECRET`,
`STUDIO_RECOVERY_EMAIL` y `EMAIL_LOGO_URL` son opcionales.

> Las que llevan prefijo `NEXT_PUBLIC_` **se incrustan en el bundle del
> navegador**. Nunca pongas un secreto ahí.

---

## 3. Configuración en Sanity

- El dataset `production` debe estar en **privado**
  (manage.sanity.io → API → Datasets). Si estuviera público, la contraseña del
  Studio y los tokens de testimonio serían legibles por cualquiera.
- En **Configuración del sitio**, dentro del Studio, rellena el *Email de
  contacto*, el *Email de seguridad* y la *Contraseña del Studio*.
- Comprueba que el plan contratado permita datasets privados. Al acabar el
  periodo de prueba, si el proyecto volviera a público se reabre ese agujero.

---

## 4. Antes de publicar

```bash
npm run build      # debe terminar sin errores
npm run test:e2e   # 20 tests, contra la build de producción
```

Los tests e2e levantan su propio servidor de producción, así que no hace falta
tener nada corriendo.

---

## 5. Después de publicar

Comprueba a mano:

- [ ] La home carga con contenido (si sale vacía, falta `SANITY_API_READ_TOKEN`)
- [ ] `/studio` redirige al login y se puede entrar
- [ ] `/admin/dashboard` redirige al login **sin** sesión
- [ ] Enviar el formulario de contacto y confirmar que llegan **los dos**
      correos: el del administrador y el del cliente
- [ ] `/sitemap.xml` lista los destinos y usa el dominio correcto

---

## Limitación conocida

El control de frecuencia de peticiones (rate limiting) de los formularios y del
login guarda su estado **en memoria del proceso**. Con varias instancias, cada
una lleva su propia cuenta y el límite efectivo se multiplica por el número de
instancias. Para un despliegue de instancia única es suficiente; si se escala
horizontalmente hay que moverlo a un almacén compartido (Redis o Upstash).
