# CILC Project – Knowledge Graph Report v2
## (Actualizado — estructura real del código fuente)

## Estadísticas generales
- Archivos analizados: 123 archivos TypeScript/TSX
- Nodos en el grafo: 123
- Aristas (dependencias internas): 135
- Dependencias externas: next (76), react (30), sanity (22), resend (6), zod (5)

## Cambio arquitectónico principal vs. versión anterior
Las 6 páginas de programa estáticas (`app/idiomas/`, `app/au-pair/`, etc.) fueron **migradas a una ruta dinámica**: `app/programas/[slug]/page.tsx` alimentada por Sanity CMS. Los programas y destinos ya no son datos estáticos en TypeScript — son contenido gestionado en Sanity.

---

## Nodos Dios (God Nodes) — los más conectados

| Nodo | Grado | Tipo | Rol |
|------|-------|------|-----|
| src/lib/sanity/queries.ts | 19 | Sanity | Puerta central al CMS: consultado por 17 archivos distintos |
| src/lib/data/countries.ts | 11 | Datos | Destinos internacionales; aún estático (híbrido con Sanity) |
| app/page.tsx | 10 | Página | Home: consume Sanity, animaciones, blog, stats |
| src/components/shared/AnimateIn.tsx | 10 | Componente | Wrapper de animación de entrada; usado en 10 páginas |
| src/sanity/schemas/index.ts | 10 | Sanity Schema | Registro de 9 schemas: programa, destino, blog, testimonios, etc. |
| app/layout.tsx | 9 | Página | Root layout: ahora incluye StudioExitButton y queries.ts |
| src/lib/sanity/image.ts | 9 | Sanity | Helper de imagen; usado en 8 archivos (programas, galería, blog) |
| src/components/shared/ProgramPage.tsx | 6 | Componente | Template de programa; ahora solo lo usa `programas/[slug]` |
| src/lib/search.ts | 6 | Lib | Motor de búsqueda interno (aún basado en datos estáticos) |
| src/lib/data/programs.ts | 6 | Datos | Datos de programas (estático; coexiste con schema Sanity) |

---

## Comunidades (grupos de archivos fuertemente relacionados)

### 1. Catálogo de programas (Sanity-driven)
`sanity/schemas/programa.ts` → `sanity/queries.ts` → `app/programas/[slug]/page.tsx` → `ProgramPage.tsx`
**Cambio clave**: ya no hay 6 páginas individuales — una sola ruta dinámica con slug.

### 2. Sanity CMS (blog, testimonios, destinos, programas, configuración)
`queries.ts` (grado 19) es el nuevo centro del sistema.
9 schemas: blogPost, testimonial, programa, destino, configuracion, socio, teamMember, solicitudTestimonio, tokenTestimonio.
3 plugins de Studio: ctrlSPublish, eliminarAction, generarTokenAction.

### 3. Sistema de autenticación (nuevo)
`middleware.ts` → protege rutas de admin y studio.
`app/api/studio-auth/` (login, forgot, reset) → `queries.ts` (verifica credenciales en Sanity).
`app/studio/login/` + `app/studio/reset/` → UI de autenticación propia.
`TokenGate.tsx` + `api/verificar-token/` → acceso por token para dar testimonio.

### 4. Panel de administración (ampliado)
`admin/dashboard` + `admin/stats` → `leads.ts`
`admin/generar-token` → `GenerarToken.tsx` → genera tokens para testimonios
`admin/IdleRefresh.tsx` → refresco automático de sesión admin
`admin/delete-doc` → elimina documentos Sanity desde el admin

### 5. Sistema de destinos y búsqueda
`countries.ts` → FeaturedCountries, HeroBanner, destinos/, search.ts, DestinosStats.tsx
`destinos/[id]/page.tsx` ahora consume también `queries.ts` (datos enriquecidos de Sanity)
Búsqueda: `search.ts` aún usa datos estáticos (programas, países, blog estático)

### 6. Animaciones y UX
`AnimateIn.tsx` (grado 10, nuevo) — wrapper de animación de entrada usado en 10 páginas.
Indica una refactorización visual global de las páginas de contenido.

### 7. SEO y analítica
`layout.tsx` → `schemas.ts` (JSON-LD global)
`app/sitemap.ts`, `robots.ts`, `manifest.ts` — archivos estáticos SEO
`app/api/revalidate/` — revalidación ISR para contenido de Sanity

---

## Conexiones Sorprendentes

| Conexión | Por qué importa |
|----------|----------------|
| `queries.ts` grado 19 (+12 vs. v1) | Sanity pasó de CMS secundario a columna vertebral del proyecto |
| `AnimateIn.tsx` grado 10 sin dependencias propias | Componente puro reutilizado en toda la app; un solo punto de falla visual |
| `app/layout.tsx` → `queries.ts` | El root layout ahora hace queries a Sanity (probablemente para nav o config global) |
| `ProgramPage.tsx` solo lo usa `programas/[slug]` | 6 importadores colapsados en 1 por la migración a ruta dinámica |
| `api/studio-auth` → `queries.ts` | La autenticación del Studio verifica credenciales en Sanity (usuarios como documentos) |
| `countries.ts` coexiste con `destino.ts` (schema Sanity) | Migración en curso: datos híbridos estático+CMS |

---

## Tabla de Riesgo (archivos críticos)

| Archivo | Grado | Riesgo si falla |
|---------|-------|----------------|
| src/lib/sanity/queries.ts | 19 | Todo el contenido CMS deja de cargar (blog, programas, destinos, testimonios, auth) |
| src/lib/data/countries.ts | 11 | Destinos, búsqueda, stats y hero rotos |
| src/components/shared/AnimateIn.tsx | 10 | 10 páginas sin animaciones (regresión visual) |
| src/sanity/schemas/index.ts | 10 | Studio sin schemas → no se puede editar contenido |
| src/lib/sanity/image.ts | 9 | Imágenes rotas en programas, blog, galería, testimonios |
| middleware.ts | 1* | *Bloquea acceso a rutas admin y studio si falla |

---

## Grupos de archivos

| Grupo | Archivos | Color |
|-------|----------|-------|
| Páginas (app/) | 29 | Azul |
| Componentes (src/components/) | 28 | Verde |
| Lib / Datos (src/lib/) | 21 | Amarillo |
| API Routes (app/api/) | 11 | Rojo |
| Sanity Schemas | 10 | Cian |
| Sanity (lib/sanity, sanity.config) | 8 | Cian oscuro |
| Admin | 6 | Naranja |
| Sanity Plugins | 3 | Cian claro |

---

## Cambios vs. Grafo v1

### Archivos NUEVOS (28)
- **Auth Studio**: app/api/studio-auth/{route,forgot,reset}.ts, app/studio/login/, app/studio/reset/
- **Token testimonios**: app/api/verificar-token/, app/api/admin/generar-token/, TokenGate.tsx, GenerarToken.tsx, tokenTestimonio.ts
- **Ruta dinámica programas**: app/programas/[slug]/page.tsx
- **Sanity schemas nuevos**: programa.ts, destino.ts, configuracion.ts
- **Sanity plugins**: ctrlSPublish.ts, eliminarAction.tsx, generarTokenAction.ts
- **Otros**: middleware.ts, AnimateIn.tsx, DestinosStats.tsx, StudioExitButton.tsx, IdleRefresh.tsx, GaleriaGrid.tsx, utils.ts, app/api/revalidate/

### Archivos ELIMINADOS (10)
- Páginas estáticas de programa: app/idiomas/, app/au-pair/, app/anos-academicos/, app/estudia-trabaja/, app/formacion-corporativa/, app/idiomas-en-linea/
- app/idiomas/program-opengraph-image.tsx, next-env.d.ts, next.config.ts, tests/e2e/cilc.spec.ts
