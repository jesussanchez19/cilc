# Semana 4: Contenido Principal - Programas Académicos

**Objetivo**: Sistema completo de programas académicos con detalles, búsqueda y navegación.

## Día 23: Base de Datos de Programas Académicos

- Crear estructura de Programas (500+ registros)
- Cada programa: nombre, universidad, país, duración, costo, idioma
- Campos: especialidad, nivel (pregrado/posgrado), modalidad (presencial/online)

## Día 24: Página de Listado de Programas

- Grid de programas con filtros
- Búsqueda por nombre
- Mostrar los mejores programas

## Día 25: Página de Detalle de Programa

- Información completa del programa
- Requisitos de admisión
- Plan de estudios
- Costos desglosados

## Día 26: Especialidades y Categorías

- Crear categorías de programas
- Página de especialidades
- Relacionar programas con especialidades

## Día 27: Componentes de Información Relacionada

- Mostrar programas similares
- Universidades con programa similar
- Países con programa similar

## Día 28: Sistema de Favoritos (Frontend)

- LocalStorage para guardar favoritos
- Hook useFavorites
- Mostrar favoritos en página

## Día 29: Testing, Optimización y Commit Final

- Testing completo de flujos
- Optimizar búsquedas
- Commit: `[S4D29] Programas académicos completados`

---

## Archivos a Crear

```
src/lib/data/
  programs.ts
  specialties.ts

app/
  programs/page.tsx
  programs/[id]/page.tsx
  specialties/page.tsx
  specialties/[id]/page.tsx

src/components/
  shared/
    ProgramCard.tsx
    SpecialtyCard.tsx
  programs/
    ProgramDetail.tsx
    RelatedPrograms.tsx
    
src/hooks/
  useFavorites.ts
```
