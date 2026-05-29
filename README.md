# CILC - Canadian & International Language Centers

Sitio web oficial de CILC, agencia mexicana especializada en estudios en el extranjero con más de 23 años de experiencia.

## 🌐 URL de referencia
https://www.estudiosenelextranjero.com.mx/

## 🎯 Objetivo

Crear el sitio web de CILC que permita a los usuarios:
- Conocer los 6 programas disponibles (Idiomas, Au Pair, Años Académicos, Estudia y Trabaja, Formación Corporativa, Idiomas en Línea)
- Explorar destinos y países
- Contactar a CILC vía formulario o WhatsApp

## 🏗️ Tech Stack

- **Framework**: Next.js (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Email**: Resend
- **Deploy**: Vercel
- **Analytics**: Google Analytics 4

## 🚀 Instalación

```bash
npm install
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

## 📊 Comandos

```bash
npm run dev      # Desarrollo
npm run build    # Build para producción
npm start        # Ejecutar build en producción
npm run lint     # Linting
```

---

## 🌿 Flujo de trabajo Git

### Ramas principales

| Rama | Propósito |
|------|-----------|
| `main` | Producción — solo recibe merges los viernes |
| `develop` | Integración — todos los PR van aquí |

### Ramas de trabajo

Cada tarea tiene su propia rama. Nunca trabajar directo en `develop` ni en `main`.

```bash
# Antes de empezar una tarea, partir siempre desde develop
git checkout develop
git pull origin develop

# Crear la rama de la tarea
git checkout -b feature/Sanchez/nombre-tarea   # Persona 1
git checkout -b feature/Flores/nombre-tarea    # Persona 2
```

### Ciclo completo de una tarea

```bash
# 1. Crear la rama desde develop (ver arriba)

# 2. Trabajar y hacer commits
git add src/components/shared/Navigation.tsx
git commit -m "[S1] Menú hamburguesa en móvil"

# 3. Subir la rama a GitHub
git push origin feature/Sanchez/menu-hamburguesa

# 4. Abrir un Pull Request hacia develop en GitHub
# 5. El otro developer revisa y aprueba el PR
# 6. Se mergea a develop y se elimina la rama de la tarea
```

### Entrega semanal (viernes)

```bash
# Solo cuando todas las tareas de la semana están en develop
git checkout main
git merge develop
git push origin main
```

---

## 👥 División de módulos

Para evitar conflictos, cada persona tiene jurisdicción exclusiva sobre sus archivos.

| | Persona 1 (Sanchez) | Persona 2 (Flores) |
|---|---|---|
| **Rol** | Frontend / UI | Datos / API |
| **Módulos propios** | `src/components/` · `public/` · páginas UI | `src/lib/` · `app/api/` · config · SEO |
| **Nunca tocar** | `src/lib/` · `app/api/` · `next.config.*` | `src/components/` · `public/` |

### Archivos compartidos — coordinar antes de editar

- `app/layout.tsx`
- `app/page.tsx`
- `tailwind.config.*`
- `package.json`

> Regla: avisar en el equipo antes de editar un archivo compartido. Nunca los dos al mismo tiempo.

---

## 🔑 Convenciones de código

- **TypeScript** obligatorio en todos los archivos
- **Estilos** solo con Tailwind CSS — sin CSS personalizado
- **Componentes** en `src/components/`
- **Datos** en `src/lib/data/`
- **API routes** en `app/api/`

### Formato de commits

```
[S#] Descripción breve de lo que se hizo
```

Ejemplos:
- `[S1] Menú hamburguesa en móvil`
- `[S2] Hero banner con imagen real`
- `[S3] FAQs por programa`

---

## 📅 Plan de 15 semanas

Ver el plan completo con tareas, responsables y pruebas de validación en:
- [`docs/plan-desarrollo.md`](docs/plan-desarrollo.md) — resumen por semana
- [`docs/kanban-trello.txt`](docs/kanban-trello.txt) — tablero Kanban para Trello

| Semana | Enfoque | Entregable |
|--------|---------|------------|
| 1 | Navegación y contacto | Menú móvil + formulario funcional |
| 2 | Homepage | Imágenes reales + GA4 |
| 3 | Páginas de programas | 6 páginas completas |
| 4 | Destinos | Sección navegable con datos reales |
| 5 | Flujo de leads | Cotización llega a CILC por email |
| 6 | WhatsApp y CTAs | Mensajes por programa + tracking |
| 7 | Blog | 3 artículos publicados |
| 8 | Búsqueda | Búsqueda de programas y destinos |
| 9 | Testimonios | Carrusel y galería de estudiantes |
| 10 | SEO técnico | Sitio indexable en Google |
| 11 | Performance | Lighthouse 90+ en móvil |
| 12 | Sobre nosotros | Página de equipo + galería |
| 13 | Accesibilidad | Sin errores de consola ni axe |
| 14 | Testing y QA | Suite de tests + pruebas en dispositivos |
| 15 | Deploy | Sitio en producción bajo dominio CILC |

---

**Inicio**: 1 de junio de 2026 · **Entrega final**: 11 de septiembre de 2026
