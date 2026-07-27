# CILC Project – Knowledge Graph Report
## (Generado desde código fuente real)

## Estadísticas generales
- Archivos analizados: 102 archivos TypeScript/TSX
- Nodos en el grafo: 102
- Aristas (dependencias internas): 101
- Dependencias externas principales: next (59), react (16), sanity (11), resend (5), zod (4)

---

## Nodos Dios (God Nodes) — los más conectados

| Nodo | Grado | Tipo | Rol |
|------|-------|------|-----|
| src/lib/data/programs.ts | 11 | Datos | Define todos los programas académicos; importado por 10 archivos |
| src/lib/data/countries.ts | 9 | Datos | Define destinos internacionales; base de búsqueda y navegación |
| app/page.tsx | 8 | Página | Home: consume Sanity, blog, componentes lazy, testimonios |
| src/components/shared/ProgramPage.tsx | 8 | Componente | Template reutilizable de página de programa; 6 páginas lo usan |
| app/layout.tsx | 7 | Página | Root layout: Navigation, Footer, Breadcrumb, SEO schemas |
| src/lib/sanity/queries.ts | 7 | Sanity | Queries GROQ para blog y testimonios; puerta de entrada al CMS |
| src/lib/seo/schemas.ts | 7 | Lib | Schema.org JSON-LD para todas las páginas de programa |
| src/lib/search.ts | 6 | Lib | Motor de búsqueda interna: unifica programas, países y blog |

---

## Comunidades (grupos de archivos fuertemente relacionados)

### 1. Catálogo de programas
Núcleo: `programs.ts` → `ProgramPage.tsx` → 6 páginas (idiomas, au-pair, etc.)
`schemas.ts` (SEO) se conecta en paralelo al mismo grupo de páginas.
Riesgo: cambio en programs.ts impacta 10 archivos simultáneamente.

### 2. Sanity CMS (blog + testimonios)
`sanity/queries.ts` → `ArticleCard.tsx` → `blog/page.tsx`, `blog/[slug]/page.tsx`, `page.tsx`
`sanity/image.ts` → testimonios, blog/[slug], home
`sanity/schemas/` → 5 esquemas (blogPost, testimonial, socio, teamMember, solicitudTestimonio)
La Sanity Studio embebida vive en `app/studio/[[...tool]]/page.tsx`.

### 3. Sistema de destinos y búsqueda
`countries.ts` → `FeaturedCountries.tsx`, `HeroBanner.tsx`, `destinos/`, `search.ts`
`search.ts` integra programas + países + blog → `SearchBar.tsx` + `useSearch.ts` → `buscar/page.tsx`

### 4. Pipeline de formularios / backend
`api/contact/route.ts` y `api/quote/route.ts` → `leads.ts` (almacén JSON) + `email/templates.ts` + Resend
`api/subscribe/route.ts` → validación Zod (`validations/subscribe.ts`) → Resend
`admin/dashboard` y `admin/stats` → `leads.ts` (lectura de prospectos)

### 5. Panel de Administración
`admin/dashboard/page.tsx` y `admin/stats/page.tsx` → `leads.ts`
Único sistema de autenticación interno (no OAuth externo identificado).

### 6. SEO y analítica
`layout.tsx` → `schemas.ts` (JSON-LD global)
`analytics/events.ts` → consumido en componentes de interacción (GA4 custom events)
`app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` — archivos de configuración SEO estáticos

---

## Conexiones Sorprendentes

| Conexión | Por qué importa |
|----------|----------------|
| `search.ts` unifica 3 fuentes | Programas + países + blog en un solo índice NFD-normalizado |
| `ArticleCard.tsx` → `sanity/queries.ts` | El card hace sus propias queries GROQ, no recibe props del padre |
| `admin/stats` y `admin/dashboard` → `leads.ts` | El panel admin lee el mismo JSON que las rutas API escriben |
| `api/quote` → leads + email | Doble salida: persiste el lead Y envía correo en la misma ruta |
| `app/page.tsx` ← 0 entradas internas | La home no es importada por nadie — es un entry point puro |

---

## Tabla de Riesgo (archivos críticos)

| Archivo | Grado | Riesgo si falla |
|---------|-------|----------------|
| src/lib/data/programs.ts | 11 | 10 páginas/componentes sin datos |
| src/lib/data/countries.ts | 9 | Destinos, búsqueda y hero rotos |
| src/lib/sanity/queries.ts | 7 | Blog y testimonios sin contenido |
| src/lib/seo/schemas.ts | 7 | Pérdida de Schema.org en 6+ rutas |
| src/lib/search.ts | 6 | Búsqueda global inoperante |
| src/components/shared/ProgramPage.tsx | 8 | 6 páginas de programa sin renderizar |

---

## Módulos Nuevos vs Documentación Previa

Los siguientes módulos **no estaban documentados** en el reporte técnico previo y fueron
descubiertos al analizar el código fuente real:

- **Sanity CMS**: client, queries, writeClient, image + 5 schemas + Sanity Studio embebida
- **Panel de administración**: dashboard y stats con visualización de leads
- **Sistema de testimonios**: dar-testimonio, testimonios, api/testimonio, TestimonioForm
- **api/subscribe**: suscripción a newsletter con validación Zod
- **api/feedback** y **api/fetch-og**: rutas utilitarias adicionales
- **Páginas adicionales**: galeria, sobre-nosotros, universities, aviso-de-privacidad, terminos-y-condiciones
- **Playwright e2e**: tests/e2e/cilc.spec.ts + playwright.config.ts
- **useSearch.ts**: hook personalizado sobre search.ts
- **analytics/events.ts**: eventos GA4 con tipado TypeScript
