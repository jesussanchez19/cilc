# Semana 2: Infraestructura Base - Componentes Avanzados

**Objetivo**: Mejorar componentes existentes, crear sistema de diseño consistente y agregar componentes más complejos.

## Día 8: Sistema de Diseño y Configuración Tailwind

### Tareas:
1. **Crear archivo de configuración de tema**
   - Archivo: `src/lib/constants/theme.ts`
   - Colores, espacios, tipografía
   - Exportar como variables reutilizables

2. **Actualizar tailwind.config.ts**
   - Agregar colores personalizados
   - Configurar fuentes (Google Fonts)
   - Extender configuración base

3. **Crear archivo de estilos globales**
   - Archivo: `src/styles/globals.css`
   - Variables CSS customizadas
   - Reset de estilos

4. **Crear componentes de botones y inputs**
   - `src/components/shared/Button.tsx`
   - `src/components/shared/Input.tsx`
   - Variantes: primary, secondary, danger, ghost

### Criterio de Éxito:
- ✓ Tema consistente en toda la app
- ✓ Componentes Button e Input reutilizables
- ✓ Colores y espacios unificados
- ✓ Responsive en todos los componentes

---

## Día 9: Modal, Dropdown y Componentes Complejos

### Tareas:
1. **Crear componente Modal**
   - Archivo: `src/components/shared/Modal.tsx`
   - Con overlay, cierre con ESC, animaciones

2. **Crear componente Dropdown**
   - Archivo: `src/components/shared/Dropdown.tsx`
   - Para menús secundarios

3. **Crear componente Tabs**
   - Archivo: `src/components/shared/Tabs.tsx`
   - Para organizar contenido

4. **Crear componente Pagination**
   - Archivo: `src/components/shared/Pagination.tsx`
   - Para listas largas

### Criterio de Éxito:
- ✓ Modal funciona y se cierra correctamente
- ✓ Dropdown abre/cierra con click
- ✓ Tabs cambiam de contenido
- ✓ Pagination permite navegar

---

## Día 10: Navegación Mejorada - Mobile Menu

### Tareas:
1. **Mejorar componente Navigation**
   - Agregar hamburger menu en móvil
   - Sidebar con transición suave

2. **Crear componente MobileNav**
   - Archivo: `src/components/shared/MobileNav.tsx`
   - Menú lateral responsive

3. **Hook para gestionar estado del menu**
   - Archivo: `src/hooks/useMenuState.ts`
   - Estado global del menu

4. **Actualizar Header**
   - Integrar mobile nav
   - Mostrar/ocultar según breakpoint

### Criterio de Éxito:
- ✓ Menu hamburger visible en móvil
- ✓ Menu se abre/cierra suavemente
- ✓ Links funcionan correctamente
- ✓ Desktop sin cambios

---

## Día 11: Sistema de Notificaciones y Toast

### Tareas:
1. **Crear componente Toast**
   - Archivo: `src/components/shared/Toast.tsx`
   - Variantes: success, error, warning, info

2. **Crear Hook useToast**
   - Archivo: `src/hooks/useToast.ts`
   - Gestionar notificaciones desde componentes

3. **Crear ToastContainer**
   - Archivo: `src/components/shared/ToastContainer.tsx`
   - Mostrar múltiples notificaciones

4. **Integrar en formularios**
   - ContactForm muestra toast al enviar
   - Otros formularios futuros

### Criterio de Éxito:
- ✓ Toast aparece y desaparece automáticamente
- ✓ Múltiples toast no se superponen
- ✓ Estilos consistentes con tema
- ✓ Funciona en ContactForm

---

## Día 12: Páginas Secundarias - About, FAQ, Testimonios

### Tareas:
1. **Crear página About**
   - Archivo: `app/about/page.tsx`
   - Historia, misión, visión, equipo

2. **Crear componente TeamCard**
   - Archivo: `src/components/shared/TeamCard.tsx`
   - Foto, nombre, rol, bio

3. **Crear página FAQ**
   - Archivo: `app/faq/page.tsx`
   - Usar componente Accordion (a crear)

4. **Crear componente Accordion**
   - Archivo: `src/components/shared/Accordion.tsx`
   - Para secciones expandibles

### Criterio de Éxito:
- ✓ Página About se renderiza
- ✓ Página FAQ funciona con Accordion
- ✓ Team cards se muestran correctamente
- ✓ Responsive en móvil

---

## Día 13: Integración de Imágenes y Optimización

### Tareas:
1. **Integrar Next.js Image**
   - Reemplazar img tags con Image component
   - En todos los componentes

2. **Crear imagen placeholder**
   - Usar color de fondo como placeholder
   - Mientras carga imagen real

3. **Optimizar imagen del hero**
   - Usar srcSet para diferentes tamaños
   - Lazyloading donde sea aplicable

4. **Crear componente ImageWithFallback**
   - Archivo: `src/components/shared/ImageWithFallback.tsx`
   - Manejo de errores de carga

### Criterio de Éxito:
- ✓ Image component en todo el proyecto
- ✓ Lazy loading funciona
- ✓ Imágenes se ven bien en móvil
- ✓ Performance mejorada

---

## Día 14: Metadata, SEO Básico y Meta Tags

### Tareas:
1. **Crear archivo de metadatos**
   - Archivo: `src/lib/constants/metadata.ts`
   - Título, descripción, keywords globales

2. **Actualizar layout.tsx**
   - Metadata por página
   - Open Graph tags

3. **Crear componentes SEO**
   - `src/components/shared/SEO.tsx` (si es necesario)

4. **Agregar favicon y manifest**
   - favicon.ico en public/
   - manifest.json básico

### Criterio de Éxito:
- ✓ Cada página tiene meta tags
- ✓ OG tags para compartir en redes
- ✓ Favicon visible en pestaña
- ✓ Manifest configurado

---

## Día 15: Documentación, Cleanup y Commits

### Tareas:
1. **Crear archivo COMPONENTS.md**
   - Documentar todos los componentes
   - Props, ejemplos de uso

2. **Actualizar README.md**
   - Instrucciones de instalación
   - Estructura del proyecto
   - Comandos disponibles

3. **Limpieza de código**
   - Remover código no utilizado
   - Revisar imports no necesarios
   - Formatear con Prettier

4. **Commits finales**
   - `git commit -m "[S2D15] Semana 2 completada - Sistema de diseño"`
   - Crear tag: `v0.2-design-system`

### Criterio de Éxito:
- ✓ Documentación completa
- ✓ README actualizado
- ✓ Código limpio y formateado
- ✓ Git con tags y ramas

---

## Resumen de Nuevos Archivos Semana 2

```
src/
  components/
    shared/
      Button.tsx
      Input.tsx
      Modal.tsx
      Dropdown.tsx
      Tabs.tsx
      Pagination.tsx
      MobileNav.tsx
      Toast.tsx
      ToastContainer.tsx
      TeamCard.tsx
      Accordion.tsx
      ImageWithFallback.tsx
  hooks/
    useMenuState.ts
    useToast.ts
  lib/
    constants/
      theme.ts
      metadata.ts

docs/
  COMPONENTS.md
```

## Notas
- Mantener componentes small (< 200 líneas cuando sea posible)
- Priorizar accesibilidad (ARIA labels)
- Testing manual en cada componente
- Commits diarios obligatorios
