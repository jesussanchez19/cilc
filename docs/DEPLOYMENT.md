# Guía de Deploy — CILC

## Requisitos previos

- Cuenta en [Vercel](https://vercel.com)
- Cuenta en [Resend](https://resend.com) con API key
- Propiedad configurada en [Google Analytics 4](https://analytics.google.com)
- Dominio `cilc.mx` apuntando a Vercel

---

## 1. Conectar repositorio a Vercel

1. Inicia sesión en Vercel → **Add New Project**
2. Importa el repositorio `jesussanchez19/cilc`
3. Framework: **Next.js** (detectado automáticamente)
4. Build command: `npm run build`
5. Output directory: `.next`

---

## 2. Variables de entorno

En Vercel → Settings → Environment Variables, agrega:

| Variable | Entorno | Descripción |
|---|---|---|
| `RESEND_API_KEY` | Production, Preview | API key de Resend |
| `NEXT_PUBLIC_GA_ID` | Production | ID de propiedad GA4 |
| `NEXT_PUBLIC_SITE_URL` | Production | `https://cilc.mx` |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Production | Código de verificación GSC |

---

## 3. Dominio personalizado

1. Vercel → tu proyecto → Settings → Domains
2. Agrega `cilc.mx` y `www.cilc.mx`
3. Configura los DNS según las instrucciones de Vercel (registros A y CNAME)
4. Vercel activa HTTPS automáticamente vía Let's Encrypt

---

## 4. Deploy

Cualquier push a `main` dispara un deploy automático en Vercel.

```bash
# Para hacer deploy manual de la rama main:
git checkout main
git merge develop
git push origin main
```

---

## 5. Verificar en producción

- [ ] `https://cilc.mx` carga correctamente
- [ ] `https://cilc.mx/robots.txt` muestra el sitemap correcto
- [ ] `https://cilc.mx/sitemap.xml` lista todas las rutas
- [ ] Formulario de contacto envía email
- [ ] `https://cilc.mx/admin/dashboard` muestra el panel

---

## 6. Post-launch

- Enviar `https://cilc.mx/sitemap.xml` a Google Search Console
- Verificar eventos en GA4 navegando el sitio
- Revisar errores en Vercel → Functions → Logs
