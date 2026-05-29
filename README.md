# CILC - Canadian & International Language Centers

Sitio web oficial de CILC, agencia mexicana especializada en estudios en el extranjero con más de 23 años de experiencia.

## 🌐 URL de referencia
https://www.estudiosenelextranjero.com.mx/

## 🎯 Objetivo

Crear el sitio web de CILC que permita a los usuarios:
- Conocer los 6 programas disponibles (Idiomas, Au Pair, Años Académicos, Estudia y Trabaja, Formación Corporativa, Idiomas en Línea)
- Explorar destinos y países
- Contactar a CILC vía formulario o WhatsApp

## 🏗️ Tech Stack

- **Framework**: Next.js (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Email**: Resend
- **Deploy**: Vercel
- **Analytics**: Google Analytics 4

## 📅 Estructura: 15 Semanas Modulares

El desarrollo está dividido en **15 semanas** con tareas diarias:

| Semana | Módulo | Enfoque |
|--------|--------|---------|
| 1-2 | Infraestructura Base | Setup, componentes, navegación |
| 3-4 | Contenido Principal | Países, universidades, programas |
| 5-6 | Búsqueda y Comparación | Filtros, búsqueda, comparador |
| 7-8 | Autenticación y Perfil | Login, registro, dashboard |
| 9-10 | Blog y Recursos | Blog con MDX, descargas |
| 11-12 | Contacto e Integraciones | Email, Zapier, webhooks |
| 13-14 | SEO y Analytics | Optimización, informes |
| 15 | Testing y Deploy | QA, bugfixes, producción |

## 🚀 Primeros Pasos

### Requisitos
- Node.js 18+
- npm o yarn
- Cuenta Vercel (para deploy)

### Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

## 📚 Documentación del Plan

Para ver el plan detallado de cada semana, consulta la carpeta `docs/plan-semanas/`:

- **Semana 1-2**: Infraestructura Base
- **Semana 3-4**: Contenido Principal (Países, Universidades, Programas)
- **Semana 5-6**: Búsqueda y Comparación
- **Semana 7-8**: Autenticación y Dashboard
- **Semana 9-10**: Blog y Recursos
- **Semana 11-12**: Email e Integraciones
- **Semana 13-14**: SEO y Analytics
- **Semana 15**: Testing y Deploy

## 🔑 Convenciones del Proyecto

### Git
- **Commits diarios**: `[S#D#] Descripción` (S=semana, D=día)
- Ejemplo: `[S1D2] Crear componente Header`

### Código
- **TypeScript**: Obligatorio en todos los archivos
- **Estilos**: Solo Tailwind CSS
- **Componentes**: En `src/components/`
- **Datos**: En `src/lib/data/`

## 📊 Comandos Disponibles

```bash
npm run dev      # Desarrollo
npm run build    # Build para producción
npm start        # Ejecutar build en producción
npm run lint     # Linting
```

---

**Inicio del Proyecto**: 28 de Mayo de 2026
**Semana Actual**: 1 | **Día Actual**: 1
