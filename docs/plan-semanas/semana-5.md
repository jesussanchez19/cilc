# Semana 5: Funcionalidades Dinámicas - Búsqueda y Filtros Avanzados

**Objetivo**: Sistema de búsqueda avanzada y filtros en todas las páginas principales.

## Día 30: Motor de Búsqueda Básico

- Crear servicio de búsqueda (`src/lib/services/search.ts`)
- Búsqueda en países, universidades, programas
- Filtrar resultados localmente

## Día 31: Filtros Avanzados para Países

- Filtrar por región, idioma, costo, clima
- Guardar filtros en URL (query params)
- Componente FilterBar reutilizable

## Día 32: Filtros Avanzados para Universidades

- Filtrar por ranking, tipo, especialidades
- Búsqueda combinada
- Mostrar cantidad de resultados

## Día 33: Filtros Avanzados para Programas

- Filtrar por especialidad, duración, costo, modalidad
- Búsqueda por palabras clave
- Guardar búsquedas recientes (localStorage)

## Día 34: Página de Resultados de Búsqueda Global

- Crear `app/search/page.tsx`
- Búsqueda unificada en todos los tipos
- Tabs con resultados por categoría

## Día 35: Componente de Búsqueda en Header

- Buscar desde header en cualquier página
- Sugerencias mientras escribes
- Navegación rápida

## Día 36: Testing, Performance y Commit

- Testing de filtros
- Optimizar búsqueda (memoization)
- Commit: `[S5D36] Búsqueda y filtros completados`

---

## Archivos a Crear

```
src/lib/
  services/
    search.ts
  utils/
    filters.ts

src/components/
  shared/
    SearchBar.tsx
    FilterBar.tsx
    SearchSuggestions.tsx
    
app/
  search/page.tsx
```
