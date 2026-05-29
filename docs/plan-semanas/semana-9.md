# Semana 9: Blog y Recursos

**Objetivo**: Sistema de blog con artículos sobre estudios en el extranjero.

## Día 58: Sistema de Blog con MDX

- Instalar: `npm install next-mdx-remote gray-matter`
- Crear carpeta `content/blog/` con artículos MDX
- Estructura: título, fecha, autor, tags, contenido

## Día 59: Página de Blog Listado

- `app/blog/page.tsx`
- Listar todos los artículos
- Paginación
- Tags para filtrar

## Día 60: Página de Artículo Individual

- `app/blog/[slug]/page.tsx`
- Renderizar contenido MDX
- Tabla de contenidos
- Artículos relacionados

## Día 61: Componentes de Blog

- `BlogCard.tsx`
- `BlogHeader.tsx` (con fecha, autor)
- `RelatedArticles.tsx`

## Día 62: Crear Contenido Inicial

- Crear 10-15 artículos MDX
- Temas: consejos, experiencias, becas, etc.

## Día 63: Página de Recursos

- `app/resources/page.tsx`
- Guías descargables (PDF)
- Plantillas
- Links útiles

## Día 64: Testing y Finalización

- Testing de MDX rendering
- Testing de navegación
- Commit: `[S9D64] Blog y recursos completados`

---

## Archivos a Crear

```
content/blog/
  articulo-1.mdx
  articulo-2.mdx
  ...
  
app/
  blog/
    page.tsx
    [slug]/page.tsx
  resources/page.tsx
    
src/components/
  blog/
    BlogCard.tsx
    BlogHeader.tsx
    RelatedArticles.tsx
    TableOfContents.tsx
    
src/lib/
  blog/
    getBlogPosts.ts
    parseMDX.ts
```
