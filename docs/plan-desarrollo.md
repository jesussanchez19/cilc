# Plan de Desarrollo CILC — 15 Semanas

**Inicio:** 1 de junio de 2026  
**Entrega final:** 11 de septiembre de 2026  
**Equipo:** Persona 1 (Frontend/UI) · Persona 2 (Datos/Integración)  
**Metodología:** Kanban — entrega al final de cada semana (viernes)

---

## División de módulos por developer

Para evitar conflictos en git, cada developer tiene jurisdicción exclusiva sobre sus módulos.

| Persona 1 — Frontend/UI | Persona 2 — Datos/Integración |
|---|---|
| `src/components/**` | `src/lib/**` |
| `app/*/page.tsx` (capa visual) | `app/api/**` (rutas API) |
| `public/` (assets, imágenes) | `app/layout.tsx`, `next.config.*` |
| Estilos, animaciones, layout | SEO metadata, config, integraciones |

## Estrategia de ramas

```
main          ← producción (merge viernes de cada semana)
  └─ develop  ← integración (PRs aquí durante la semana)
       ├─ feature/P1/nombre-tarea   ← Persona 1
       └─ feature/P2/nombre-tarea   ← Persona 2
```

**Regla:** nunca hacer push directo a `main`. Todo pasa por PR a `develop`.

---

## Kanban — Columnas

| Por hacer | En progreso | En revisión (PR) | Hecho |
|---|---|---|---|
| Tareas pendientes | Máx. 1 por dev | Esperando code review | Mergeado a develop |

---

## Semanas

### Semana 1 · 1–6 jun · Navegación y contacto funcional

| Persona 1 | Persona 2 |
|---|---|
| Menú hamburguesa en móvil | Integrar Resend — formulario envía emails reales |
| Scroll suave entre secciones | Variables de entorno para Resend API key |
| Botón WhatsApp flotante (global) | Validación de formulario con Zod |

**Entregable:** Navegación móvil + formulario de contacto envía correo a CILC

---

### Semana 2 · 8–13 jun · Homepage

| Persona 1 | Persona 2 |
|---|---|
| Rediseño Hero: imagen de fondo real, animación de entrada | Google Analytics 4 — evento de clics en CTAs |
| Sección "¿Por qué CILC?" mejorada con iconos e imágenes | Open Graph / meta tags dinámicos |
| Agregar imágenes reales a las cards de programas | Sitemap.xml básico |

**Entregable:** Homepage con imágenes reales + GA4 activo

---

### Semana 3 · 15–20 jun · Páginas de programas

| Persona 1 | Persona 2 |
|---|---|
| Rediseño de ProgramPage: hero con imagen real, galería de fotos | FAQs por programa (datos en `src/lib/data/faqs.ts`) |
| Sección de testimonios placeholder en cada programa | Precios orientativos y tabla de comparación (datos) |
| Breadcrumbs en todas las páginas internas | Schema.org structured data para programas |

**Entregable:** 6 páginas de programas con contenido e imágenes reales

---

### Semana 4 · 22–27 jun · Sección destinos

| Persona 1 | Persona 2 |
|---|---|
| CountryGrid con filtros visuales (región, idioma) | Datos de países completos: visa, clima, costo estimado |
| Rediseño página de país: hero, stats, galería | Datos de universidades enriquecidos: requisitos, ranking |
| Mapa visual interactivo (SVG o librería ligera) | Página `/destinos` como entrada principal (reemplaza `/countries`) |

**Entregable:** Sección destinos navegable con datos reales

---

### Semana 5 · 29 jun–4 jul · Flujo de leads

| Persona 1 | Persona 2 |
|---|---|
| Formulario de cotización rápida (modal, por programa) | API route `POST /api/quote` — guarda lead + envía email |
| CTA "Obtén tu cotización" en todas las páginas de programa | Rate limiting básico en formularios |
| Indicadores de carga y confirmación visual | Almacenar leads en archivo JSON local (sin BD) |

**Entregable:** Flujo completo: usuario solicita info → email llega a CILC

---

### Semana 6 · 6–11 jul · WhatsApp y CTAs

| Persona 1 | Persona 2 |
|---|---|
| Widget WhatsApp flotante mejorado (animado, con tooltip) | Mensajes pre-llenados por programa en wa.me links |
| Sticky CTA bar en páginas de programa en móvil | UTM tracking en links de WhatsApp y formularios |
| Banner de "Consulta gratis" en homepage | — |

**Entregable:** WhatsApp integrado con mensajes específicos por programa + tracking

---

### Semana 7 · 13–18 jul · Blog

| Persona 1 | Persona 2 |
|---|---|
| Layout de blog: listado de artículos, página de artículo | MDX setup + primeros 3 artículos de contenido |
| Card de artículo con imagen, categoría, tiempo de lectura | Categorías: Vida en el extranjero, Tips, Noticias CILC |
| Sección "Últimas noticias" en homepage | RSS feed básico |

**Entregable:** Blog con 3 artículos publicados

---

### Semana 8 · 20–25 jul · Búsqueda y filtros

| Persona 1 | Persona 2 |
|---|---|
| UI de barra de búsqueda global (header) | Lógica de búsqueda: programas, países, artículos del blog |
| Filtros en `/destinos`: región, idioma, duración | Hook `useSearch` con debounce |
| Página de resultados de búsqueda `/buscar` | — |

**Entregable:** Búsqueda funcional de programas y destinos

---

### Semana 9 · 27 jul–1 ago · Testimonios y social proof

| Persona 1 | Persona 2 |
|---|---|
| Carrusel de testimonios en homepage y páginas de programa | Datos de 10+ testimonios reales (con foto, nombre, programa) |
| Galería de fotos de estudiantes (grid, lightbox) | Widget de calificación (stars) |
| Sección "Medios / Certificaciones" con logos | — |

**Entregable:** Sección de confianza completa con testimonios reales

---

### Semana 10 · 3–8 ago · SEO técnico

| Persona 1 | Persona 2 |
|---|---|
| Imágenes con `alt` descriptivos en todos los componentes | Metadata dinámica en todas las rutas |
| Breadcrumbs con JSON-LD | robots.txt, sitemap.xml dinámico |
| Open Graph images por página | Google Search Console — verificación y primeras métricas |

**Entregable:** SEO técnico completo — sitio indexable

---

### Semana 11 · 10–15 ago · Performance

| Persona 1 | Persona 2 |
|---|---|
| Skeleton screens en contenido dinámico | next/image optimización en todas las imágenes |
| Lazy loading de secciones below the fold | Bundle analysis — eliminar dependencias innecesarias |
| Fuentes optimizadas con `next/font` | Core Web Vitals — objetivo LCP < 2.5s |

**Entregable:** Lighthouse score 90+ en móvil

---

### Semana 12 · 17–22 ago · Galería multimedia y página Sobre nosotros

| Persona 1 | Persona 2 |
|---|---|
| Galería de fotos con lightbox + página `/galeria` | Datos del equipo CILC (`src/lib/data/team.ts`) |
| Página `/sobre-nosotros` con historia, misión y equipo | Datos de socios y certificaciones (`src/lib/data/partners.ts`) |
| Sección de socios y logos en homepage | — |

**Entregable:** Página "Sobre nosotros" completa + galería de estudiantes

---

### Semana 13 · 24–29 ago · Accesibilidad y pulido

| Persona 1 | Persona 2 |
|---|---|
| ARIA labels, focus visible, contraste de color | Revisión de todos los errores de consola/warnings |
| Animaciones respetuosas de `prefers-reduced-motion` | Error boundaries y página 404 mejorada |
| Revisión de tipografía y espaciado en todos los breakpoints | Variables CSS para colores del tema |

**Entregable:** Sitio accesible y sin errores de consola

---

### Semana 14 · 31 ago–5 sep · Testing y QA

| Persona 1 | Persona 2 |
|---|---|
| Tests E2E con Playwright: flujo homepage → programa → contacto | Tests unitarios de lógica de búsqueda y validación de formularios |
| Pruebas en dispositivos reales (iOS, Android) | Pruebas de carga del formulario y API routes |
| Checklist de QA visual por página | — |

**Entregable:** Suite de tests básica — sitio probado en móvil y desktop

---

### Semana 15 · 7–11 sep · Deploy y lanzamiento

| Persona 1 | Persona 2 |
|---|---|
| Deploy en Vercel — configuración de dominio personalizado | Variables de entorno en Vercel (Resend API key, etc.) |
| Favicon, splash screen, PWA básico | Monitoring con Vercel Analytics |
| Revisión final visual en producción | DNS + SSL — sitio en línea |

**Entregable:** Sitio en producción bajo dominio de CILC

---

## Estado de la base actual (inicio de semana 1)

- [x] Next.js + TypeScript + Tailwind configurados
- [x] Componentes base: Header, Footer, Navigation, Card
- [x] 6 páginas de programas con estructura real de CILC
- [x] Página de contacto con datos reales
- [x] Datos de 16 países y 61 universidades
- [x] Repositorio en GitHub: `jesussanchez19/cilc`
- [ ] Imágenes reales en `public/images/`
- [ ] Formulario de contacto funcional (solo frontend por ahora)
- [ ] Menú móvil (hamburguesa)
