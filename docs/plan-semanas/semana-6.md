# Semana 6: Funcionalidades Dinámicas - Comparador

**Objetivo**: Herramienta de comparación entre países, universidades y programas.

## Día 37: Crear Página de Comparador

- `app/compare/page.tsx`
- Seleccionar múltiples items para comparar
- Mostrar en tabla comparativa

## Día 38: Hook useComparison

- `src/hooks/useComparison.ts`
- Gestionar items en comparación
- LocalStorage para persistencia

## Día 39: Tabla Comparativa Responsiva

- Componente `ComparisonTable.tsx`
- Mostrar atributos relevantes
- Scroll horizontal en móvil

## Día 40: Agregar a Comparación desde Cards

- Botón en cada card
- Modal de confirmación
- Toast de notificación

## Día 41: Criterios Personalizados

- Permitir seleccionar qué columnas mostrar
- Ordenar columnas
- Destacar diferencias

## Día 42: Exportar Comparación

- Descargar como PDF
- Compartir vía link
- Impresión optimizada

## Día 43: Testing y Optimización Final

- Testing completo
- Performance (comparativas grandes)
- Commit: `[S6D43] Comparador funcional`

---

## Archivos a Crear

```
src/
  components/
    shared/
      ComparisonTable.tsx
      ComparisonSelector.tsx
  hooks/
    useComparison.ts
    
app/
  compare/page.tsx
```
