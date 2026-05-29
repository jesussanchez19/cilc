# Semana 1: Infraestructura Base - Setup Inicial

**Objetivo**: Crear la base sólida del proyecto con navegación, header, footer y componentes reutilizables.

## Día 1: Setup Git, ESLint, Prettier y Estructura

### Tareas:
1. **Inicializar Git repository**
   - `git init` (ya hecho por Next.js)
   - Crear `.gitignore` si no existe
   - Primer commit: `git commit -m "[S1D1] Inicializar proyecto"`

2. **Configurar ESLint y Prettier**
   - Instalar: `npm install -D prettier eslint-config-prettier`
   - Crear `.prettierrc`: indentación 2, semicolons, single quotes
   - Crear `.eslintrc.json` con reglas de Next.js

3. **Crear estructura de carpetas**
   - `src/components/shared/` - componentes reutilizables
   - `src/components/home/` - componentes específicos de home
   - `src/lib/data/` - datos estáticos
   - `src/styles/` - estilos globales (si es necesario)

4. **Verificar instalación**
   - Correr: `npm run dev`
   - Verificar que la página carga en `http://localhost:3000`

### Criterio de Éxito:
- ✓ Git configurado con primer commit
- ✓ ESLint y Prettier funcionando
- ✓ Estructura de carpetas creada
- ✓ `npm run dev` funciona sin errores

---

## Día 2: Crear Componentes Base (Header, Footer, Navigation)

### Tareas:
1. **Crear componente Header**
   - Archivo: `src/components/shared/Header.tsx`
   - Incluir logo, título, buscador básico
   - Estilo responsivo con Tailwind

2. **Crear componente Footer**
   - Archivo: `src/components/shared/Footer.tsx`
   - Links de navegación, copyright, redes sociales (placeholders)

3. **Crear componente Navigation/Menu**
   - Archivo: `src/components/shared/Navigation.tsx`
   - Items: Home, Países, Universidades, Blog, Contacto
   - Mobile responsive con hamburger menu (opcional por ahora)

4. **Crear Layout principal**
   - Editar `app/layout.tsx`
   - Integrar Header, Navigation y Footer
   - Configurar Tailwind CSS base

### Criterio de Éxito:
- ✓ Header renderiza correctamente
- ✓ Footer visible en página
- ✓ Navegación con todos los links
- ✓ Layout responsive (mobile + desktop)

---

## Día 3: Crear Página de Inicio (Homepage)

### Tareas:
1. **Crear componente HeroBanner**
   - Archivo: `src/components/home/HeroBanner.tsx`
   - Título principal, subtítulo, CTA (Call to Action)
   - Imagen de fondo (placeholder)

2. **Crear componente FeaturedCountries**
   - Archivo: `src/components/home/FeaturedCountries.tsx`
   - Grid de 4-6 países destacados
   - Cada tarjeta: imagen, nombre, descripción breve

3. **Crear componente StatsSection**
   - Archivo: `src/components/home/StatsSection.tsx`
   - Números: universidades, programas, estudiantes, países
   - Animación simple con números que incrementan

4. **Actualizar página home**
   - Editar `app/page.tsx`
   - Integrar HeroBanner, FeaturedCountries, StatsSection
   - Verificar que se vea bien en mobile y desktop

### Criterio de Éxito:
- ✓ Homepage con hero banner visible
- ✓ Sección de países destacados funciona
- ✓ Sección de estadísticas se muestra
- ✓ Página responsive y sin errores

---

## Día 4: Sistema de Datos Estáticos - Configurar datos de Países

### Tareas:
1. **Crear archivo de datos de países**
   - Archivo: `src/lib/data/countries.ts`
   - Estructura: nombre, código, descripción, imagen, universidades principales
   - Al menos 15 países

2. **Crear interfaz TypeScript**
   - Archivo: `src/lib/types/index.ts`
   - Interface `Country`: id, name, code, description, image, universities, students, etc.
   - Interface `University`: id, name, country, website, specialties, ranking

3. **Crear datos de universidades**
   - Archivo: `src/lib/data/universities.ts`
   - Al menos 50 universidades de diferentes países

4. **Conectar datos a componentes**
   - Usar datos en `FeaturedCountries.tsx`
   - Hacer dinámico el componente con datos reales

### Criterio de Éxito:
- ✓ Archivo countries.ts con 15+ países
- ✓ Archivo universities.ts con 50+ universidades
- ✓ Interfaces TypeScript definidas
- ✓ Componentes usando datos dinámicamente

---

## Día 5: Componente de Tarjeta Reutilizable y Página de Contacto Básica

### Tareas:
1. **Crear componente Card reutilizable**
   - Archivo: `src/components/shared/Card.tsx`
   - Props: título, descripción, imagen, footer, onClick
   - Responsive y consistente

2. **Refactorizar FeaturedCountries con Card**
   - Usar el nuevo componente Card
   - Mejorar apariencia visual

3. **Crear página de contacto básica**
   - Archivo: `app/contact/page.tsx`
   - Formulario básico: nombre, email, asunto, mensaje
   - Sin funcionalidad backend aún (solo frontend)

4. **Crear componente ContactForm**
   - Archivo: `src/components/shared/ContactForm.tsx`
   - Validación básica con JavaScript

### Criterio de Éxito:
- ✓ Componente Card funciona en múltiples lugares
- ✓ Página de contacto se renderiza
- ✓ Formulario tiene validación básica
- ✓ No hay errores de consola

---

## Día 6: Página de Países - Listado y Grid

### Tareas:
1. **Crear página de países**
   - Archivo: `app/countries/page.tsx`
   - Mostrar todos los países en grid
   - Usando datos de `countries.ts`

2. **Crear componente CountryGrid**
   - Archivo: `src/components/shared/CountryGrid.tsx`
   - Props: países, columns (responsive)
   - Usar componente Card

3. **Página de detalles de país**
   - Archivo: `app/countries/[country]/page.tsx`
   - Mostrar detalles del país, universidades, estadísticas
   - Link desde grid a página de detalles

4. **Crear componente CountryDetail**
   - Archivo: `src/components/shared/CountryDetail.tsx`
   - Información completa del país

### Criterio de Éxito:
- ✓ Página de países muestra listado completo
- ✓ Página de detalles de país funciona
- ✓ Links navegación entre páginas
- ✓ Datos se cargan correctamente

---

## Día 7: Testing, Bugfixes y Optimizaciones

### Tareas:
1. **Testing manual de todo**
   - Navegar por todas las páginas
   - Verificar links funcionen
   - Probar en móvil (DevTools)

2. **Bugfixes**
   - Corregir errores encontrados
   - Optimizar imágenes (usar Next.js Image)

3. **Performance**
   - Verificar Lighthouse score
   - Optimizar CSS si es necesario

4. **Commits finales**
   - `git add .`
   - `git commit -m "[S1D7] Semana 1 completada - base funcional"`
   - Crear rama `semana-1-complete`

### Criterio de Éxito:
- ✓ Todas las páginas cargan sin errores
- ✓ Navegación funciona perfectamente
- ✓ Responsive en móvil y desktop
- ✓ Lighthouse score > 80
- ✓ Git con historial limpio

---

## Resumen de Archivos Creados en Semana 1

```
src/
  components/
    shared/
      Header.tsx
      Footer.tsx
      Navigation.tsx
      Card.tsx
      ContactForm.tsx
      CountryGrid.tsx
      CountryDetail.tsx
    home/
      HeroBanner.tsx
      FeaturedCountries.tsx
      StatsSection.tsx
  lib/
    data/
      countries.ts
      universities.ts
    types/
      index.ts
  styles/
    globals.css (actualizado)

app/
  layout.tsx (actualizado)
  page.tsx (actualizado)
  contact/
    page.tsx
  countries/
    page.tsx
    [country]/
      page.tsx
```

## Notas
- Usar Tailwind CSS para todos los estilos
- No crear archivos CSS custom si es posible
- Mantener componentes pequeños y reutilizables
- TypeScript en todos los archivos
- Commits diarios son obligatorios
