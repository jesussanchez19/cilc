# Semana 10: Descargas y Recursos Avanzados

**Objetivo**: Sistema de recursos descargables y gestión de contenido.

## Día 65: Crear Base de Datos de Recursos

- Tabla `resources` en Supabase
- Campos: título, descripción, archivo, categoría, descargas

## Día 66: Página de Recursos Mejorada

- Categorías de recursos
- Vista grid/lista
- Búsqueda y filtros

## Día 67: Descargas y Tracking

- Crear sistema de descarga
- Guardar estadísticas de descarga
- Link de descarga seguro

## Día 68: Recursos por Programa

- Mostrar recursos relacionados a programas
- Recomendaciones personalizadas
- Widget en página de programa

## Día 69: Recursos Premium (Opcional)

- Algunos recursos requieren login
- Contador de descargas para usuarios
- Estadísticas de uso

## Día 70: Componentes de Recurso

- `ResourceCard.tsx`
- `ResourceDetail.tsx`
- `DownloadButton.tsx`

## Día 71: Testing y Seguridad

- Testing de descargas
- Validación de acceso
- Commit: `[S10D71] Recursos completados`

---

## Archivos a Crear

```
app/
  resources/[category]/page.tsx
  resources/[id]/page.tsx
  
src/components/
  resources/
    ResourceCard.tsx
    ResourceDetail.tsx
    ResourceFilter.tsx
```
