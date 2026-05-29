# Instrucciones - Portal Estudios en el Extranjero

## Descripción del Proyecto
Portal web informativo: https://www.estudiosenelextranjero.com.mx/
Estructura: 15 semanas de desarrollo modular con progreso diario

**Tech Stack**:
- Framework: Next.js 14+ (App Router, TypeScript)
- Estilos: Tailwind CSS
- Base de datos: Supabase (PostgreSQL)
- Autenticación: NextAuth.js
- CMS: Contenido en carpetas (Markdown)
- Deploy: Vercel

## Plan General de 15 Semanas

### Semana 1-2: Infraestructura Base
- Setup inicial, navegación, componentes base

### Semana 3-4: Contenido Principal
- Catálogo de países y universidades

### Semana 5-6: Funcionalidades Dinámicas
- Búsqueda, filtros, comparador

### Semana 7-8: Autenticación y Perfil
- Sistema de usuarios y dashboard

### Semana 9-10: Blog y Recursos
- Sistema de blog, descargas

### Semana 11-12: Contacto e Integración
- Formularios, integración email/Zapier

### Semana 13-14: SEO y Performance
- Optimización SEO, Analytics

### Semana 15: Testing y Deploy
- Testing, bugfixes, producción

## Convenciones del Proyecto
- Componentes: `src/components/`
- Páginas: `app/` (App Router)
- Estilos: Tailwind CSS (no custom CSS)
- Datos: `src/lib/data/`
- Commits: `[S#D#] Descripción` (S=semana, D=día)
- Documentación: `/docs/plan-semanas/semana-#.md`

## Estructura de Carpetas
```
cilc/
├── app/                    # Rutas y layouts
├── src/
│   ├── components/         # Componentes React
│   │   ├── shared/        # Componentes reutilizables
│   │   ├── home/          # Componentes de home
│   │   └── ...
│   └── lib/               # Funciones utilitarias
│       └── data/          # Datos estáticos/config
├── docs/
│   └── plan-semanas/      # Plan detallado por semana
├── public/                # Archivos estáticos
└── ...
```

## Checklist de Configuración Inicial

- [x] Crear proyecto Next.js base
- [x] Configurar Tailwind CSS
- [x] Crear estructura de carpetas
- [ ] Configurar eslint y prettier
- [ ] Crear componentes base (Header, Footer, Nav)
- [ ] Configurar layout root
- [ ] Crear página de inicio
- [ ] Initializar Git y hacer primer commit
- [ ] Crear README.md

## Cómo Empezar

1. Ver plan detallado en `docs/plan-semanas/semana-1.md`
2. Seguir tareas diarias en orden
3. Hacer commit al final de cada día
4. Actualizar progreso en este archivo

## Versión
Iniciado: 28 de Mayo de 2026
Semana Actual: 1
Día Actual: 1
