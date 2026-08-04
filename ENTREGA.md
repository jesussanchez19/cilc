# Entrega del sitio web a CILC

Qué recibe CILC, qué tiene que pagar, qué cuentas hay que poner a su nombre y
qué queda pendiente. Documento de traspaso — para el día a día técnico, ver
[`DESPLIEGUE.md`](DESPLIEGUE.md).

Última revisión: 3 de agosto de 2026.

---

## 1. Fechas críticas

Las dos pruebas gratuitas vencen la misma semana. **La de Sanity es la
peligrosa, porque su fallo es silencioso.**

| Fecha | Qué vence | Qué pasa si nadie hace nada |
|---|---|---|
| ~10 ago 2026 | Sanity Growth Trial | El dataset pasa de privado a **público**. El sitio sigue funcionando igual: nada se rompe, nada avisa |
| 12 ago 2026 | Vercel Pro Trial | El sitio deja de servirse |

### Por qué la de Sanity es la grave

El dataset guarda, además del contenido de la web:

- Las **solicitudes de los formularios**: nombre, correo, teléfono y mensaje de
  cada persona que ha contactado
- La **contraseña del Studio**
- Los **tokens de testimonio** y sus URLs

En un dataset público, todo eso se lee desde internet con una sola petición,
sin contraseña ni token. Comprobado el 3 de agosto de 2026: hoy está privado, y
la misma consulta sin token devuelve cero resultados.

El sitio publica un aviso de privacidad. Que esos datos queden accesibles no es
solo un problema técnico.

---

## 2. Qué cuesta mantenerlo

| Concepto | Coste | Obligatorio |
|---|---|---|
| Sanity Growth, 1 asiento | 15 USD/mes | Sí — es lo que mantiene el dataset privado |
| Vercel Pro | 20 USD/mes | Sí — el plan gratuito de Vercel es para uso personal, no comercial |
| Dominio propio | ~400 MXN/año | Sí — ver punto 4 |
| Resend | gratis | El plan gratuito (3.000 correos/mes) sobra para el volumen actual |

**Total: unos 420 USD al año**, alrededor de 7.700 MXN.

> Sobre Sanity: su plan gratuito incluye 2 datasets pero **solo públicos**. No
> hay forma de tener un dataset privado sin pagar Growth. Existe un mecanismo
> para ocultar documentos sueltos en un dataset público —los IDs que empiezan
> por `_` no se sirven a peticiones sin autenticar, verificado el 3 de agosto—,
> pero no cubre los documentos con ID fijo de los que depende el código, así que
> no sustituye al plan de pago.

---

## 3. Cuentas que hay que poner a nombre de CILC

Hoy **todas cuelgan de la cuenta personal de quien desarrolló el sitio**. Si esa
cuenta desaparece, CILC se queda sin acceso a su propia web.

| Servicio | Qué contiene | Identificador |
|---|---|---|
| Sanity | El CMS: contenido, solicitudes, configuración | Proyecto `epcoien9`, organización `osuE6rFKV` |
| Vercel | El alojamiento y las variables de entorno | Proyecto `cilc` |
| Resend | El envío de correos de los formularios | — |
| Google Analytics | La medición de tráfico y conversiones | Propiedad `G-1ZXHE8R2P8` |
| Google Search Console | La indexación en Google | Propiedad `https://cilc.vercel.app` |
| GitHub | El código fuente | `jesussanchez19/cilc` |

Recomendación: que CILC cree una cuenta de correo institucional —por ejemplo
`sistemas@` su dominio— y que las seis cuelguen de ahí. Traspasar la titularidad
es más limpio que compartir contraseñas: cuando alguien deja la empresa no hay
que rehacer nada.

La organización de Sanity ya se llama *Canadian & International Language
Centers*, así que ahí solo hay que mover titularidad y método de pago.

### Secretos que hay que regenerar al traspasar

Quien desarrolló el sitio los conoce. Al entregar, deben cambiarse todos:

`RESEND_API_KEY` · `SANITY_API_WRITE_TOKEN` · `SANITY_API_READ_TOKEN` ·
`STUDIO_SESSION_TOKEN` · `TESTIMONIAL_ACCESS_TOKEN` · la contraseña del Studio
(campo *Contraseña del Studio* en Configuración del sitio, dentro del Studio)

Cambiar `STUDIO_SESSION_TOKEN` cierra de golpe todas las sesiones abiertas del
Studio, que es justo lo que se quiere en un traspaso.

---

## 4. Lo que falta decidir: el dominio

**El sitio vive hoy en `https://cilc.vercel.app`.** Funciona, pero es una
dirección prestada.

`cilc.mx` **no sirve**: pertenece a otra empresa que comparte las siglas.
Cualquier configuración que apunte ahí le atribuye el contenido a un tercero.

Mientras no haya dominio propio hay dos consecuencias concretas.

### a) Los clientes no reciben confirmación

Quien rellena un formulario **no recibe el correo de acuse de recibo**. Resend
solo entrega a destinatarios arbitrarios desde un dominio verificado con
registros DNS, y el DNS de `vercel.app` es de Vercel. La solicitud sí queda
guardada y el administrador sí recibe su aviso.

### b) El aviso al administrador funciona por una coincidencia

⚠️ **Esto hay que leerlo antes de tocar la configuración.**

Sin dominio verificado, el sistema envía desde `onboarding@resend.dev`, el
dominio de pruebas de Resend, que **solo puede escribir a la dirección con la
que se registró la cuenta de Resend**. A cualquier otra responde 403.

Hoy el aviso llega porque el campo *Email de contacto* de Sanity coincide
exactamente con esa dirección. En cuanto se cambie por el correo de CILC —lo
más natural al recibir el sitio— los avisos dejarán de entregarse.

Las solicitudes **no se pierden**: siguen guardándose en Sanity y se ven en
`/admin/stats` y en el Studio, y los formularios siguen respondiendo bien al
visitante. Pero nadie recibirá el correo de aviso, y solo se sabrá mirando el
panel.

Así que, hasta que haya dominio: **no cambies el *Email de contacto* ni el
*Email de seguridad* del Studio**, o hazlo sabiendo que los avisos por correo
quedan en pausa hasta verificar el dominio en Resend.

Cuando CILC tenga dominio, los pasos están en [`DESPLIEGUE.md`](DESPLIEGUE.md):
verificarlo en Resend, definir `EMAIL_FROM_DOMAIN` y `NEXT_PUBLIC_SITE_URL`, y
añadir el dominio en Vercel. Conviene hacerlo **antes** de que Google indexe a
fondo `cilc.vercel.app`, para no tener que rehacer la indexación.

---

## 5. Qué está funcionando hoy

- Sitio publicado y servido desde Vercel, con despliegue automático al hacer
  push a `main`
- Contenido gestionable desde el Studio en `/studio` (blog, testimonios,
  destinos, programas, configuración, teléfonos y correos de contacto)
- Formularios de contacto, cotización y el chat de WhatsApp, guardando cada
  solicitud en Sanity y avisando al administrador por correo
- Panel de administración en `/admin/dashboard` y `/admin/stats`
- Google Analytics 4 midiendo páginas vistas y conversiones (`generate_lead`,
  `whatsapp_open`, `testimonial_submit`)
- Search Console verificado, con el sitemap de 32 URLs enviado
- 22 pruebas automáticas end-to-end (`npm run test:e2e`)

## 6. Limitación conocida

El control de frecuencia de peticiones de los formularios y del login guarda su
estado **en memoria del proceso**. Con una sola instancia es suficiente. Si
algún día se escala horizontalmente, hay que moverlo a un almacén compartido
(Redis o Upstash), o el límite efectivo se multiplica por el número de
instancias.

---

## 7. Resumen para quien decide

Tres cosas, por orden de urgencia:

1. **Antes del 10 de agosto**: contratar Sanity Growth (15 USD/mes). Si no, los
   datos personales de los contactos quedan públicos sin que nadie se entere.
2. **Antes del 12 de agosto**: contratar Vercel Pro (20 USD/mes). Si no, el
   sitio deja de estar en línea.
3. **Cuando se pueda**: comprar un dominio propio. Hasta entonces los clientes
   no reciben confirmación de sus formularios.
