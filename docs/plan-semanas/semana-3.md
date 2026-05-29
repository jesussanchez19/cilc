# Semana 3: Contenido Principal - Catálogo de Países

**Objetivo**: Expandir y mejorar el catálogo de países con información detallada, filtros y búsqueda básica.

## Día 16: Expandir Base de Datos de Países

- Crear datos completos de 25 países
- Agregar más universidades (100+ registros)
- Estructura: costo, duración, idiomas, requisitos, clima

## Día 17: Página de Detalle de País Mejorada

- Mostrar estadísticas del país
- Lista de universidades por país
- Información de costo de vida
- Mapa interactivo (placeholder)

## Día 18: Filtros de Búsqueda Básica

- Filtrar por región
- Filtrar por idioma
- Filtrar por costo
- UI con checkboxes y ranges

## Día 19: Componente de Comparativa Temporal

- Mostrar top 10 países
- Rankings por diferentes criterios
- Tabla comparativa simple

## Día 20: Página de Universidades - Listado Global

- Mostrar todas las universidades
- Grid responsive
- Links a detalles de universidad

## Día 21: Página de Detalle de Universidad

- Información completa de universidad
- Especialidades ofrecidas
- Requisitos de admisión
- Costos

## Día 22: Testing, SEO y Optimizaciones

- Testing manual completo
- Agregar meta tags específicos
- Optimizar imágenes
- Commit final: `[S3D22] Catálogo de países completado`

---

## Archivos a Crear

```
src/lib/data/
  countries.ts (expandido)
  universities.ts (expandido)
  
app/
  universities/page.tsx
  universities/[id]/page.tsx
  countries/[id]/page.tsx (mejorado)
  
src/components/
  shared/
    FilterPanel.tsx
    PriceRange.tsx
    UniversityCard.tsx
  countries/
    CountryStats.tsx
    UniversityListByCountry.tsx
```
