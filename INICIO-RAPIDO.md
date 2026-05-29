# 🚀 Instrucciones Rápidas - Portal Estudios en el Extranjero

## ¡Proyecto Inicializado! ✅

Tu portal web está **100% listo para comenzar desarrollo**.

---

## 📂 Ubicación del Proyecto

```
c:\Users\Jesus\OneDrive\Documentos\cilc\
```

---

## 🎯 Cómo Empezar Hoy (Día 1)

### 1. Leer el Plan de Semana 1
```
docs/plan-semanas/semana-1.md
```
Este archivo contiene todas las tareas para esta semana, divididas en 7 días.

### 2. Entender la Estructura
- **Páginas**: `app/` (Next.js App Router)
- **Componentes**: `src/components/`
- **Datos**: `src/lib/data/`
- **Estilos**: Tailwind CSS (sin archivos CSS personalizados)

### 3. Comandos Esenciales

```bash
# Ver el sitio en desarrollo (puerto 3000)
npm run dev

# Compilar para producción
npm build

# Formatear código
npm run format

# Verificar errores
npm run lint
```

---

## 📋 Tu Roadmap (15 Semanas)

| Semana | Tarea Principal | Archivos |
|--------|-----------------|----------|
| **1-2** | **Infraestructura** | Header, Footer, Nav, Homepage |
| **3-4** | **Catálogo** | Países, Universidades, Programas |
| **5-6** | **Búsqueda** | Filtros, búsqueda, comparador |
| **7-8** | **Usuarios** | Login, registro, dashboard |
| **9-10** | **Blog** | Artículos, recursos, descargas |
| **11-12** | **Email** | Contacto, integraciones, Zapier |
| **13-14** | **SEO/Analytics** | Optimización, informes |
| **15** | **Deploy** | Testing, producción, Vercel |

---

## 💻 Estructura del Directorio

```
cilc/
├── app/                         ← Páginas (Next.js App Router)
├── src/
│   ├── components/              ← Componentes React
│   │   ├── shared/             ← Reutilizables
│   │   └── home/               ← Específicos de homepage
│   └── lib/
│       ├── data/               ← Datos estáticos
│       └── types/              ← Tipos TypeScript
├── docs/
│   └── plan-semanas/            ← Plan detallado
│       ├── semana-1.md
│       ├── semana-2.md
│       └── ...
├── public/                      ← Imágenes y archivos estáticos
├── .github/
│   └── copilot-instructions.md  ← Este archivo
├── README.md                    ← Documentación principal
├── PROGRESO.md                  ← Tu tracker de avance
└── package.json
```

---

## 🎮 Próximos Pasos (Después del Día 1)

### Día 2: ESLint y Prettier
```bash
npm install -D prettier eslint-config-prettier
```
- Crear `.prettierrc`
- Crear `.eslintrc.json`

### Día 3-4: Componentes Base
- Crear `src/components/shared/Header.tsx`
- Crear `src/components/shared/Footer.tsx`
- Crear `src/components/shared/Navigation.tsx`

### Día 5-7: Página de Inicio
- Actualizar `app/page.tsx`
- Crear componentes de home
- Agregar datos de países

---

## 📝 Convención de Commits

Cada día, haz un commit con este formato:

```bash
git commit -m "[S1D2] Crear componente Header"
```

Donde:
- `S1` = Semana 1
- `D2` = Día 2

---

## 🌐 Ver tu Sitio en Vivo

El servidor ya está corriendo:
- **URL Local**: http://localhost:3000
- **Red Local**: http://192.168.68.109:3000

---

## 📊 Rastrear tu Progreso

Hay un archivo `PROGRESO.md` en la raíz que actualiza el estado diario.

```bash
# Ver progreso
cat PROGRESO.md
```

---

## ⚙️ Variables de Entorno

Más adelante necesitarás configurar (semanas 7-12):
- Supabase (base de datos)
- NextAuth (autenticación)
- Resend (email)
- Google Analytics

Usa `.env.example` como referencia.

---

## 🎨 Tech Stack Confirmado

✅ **Next.js 14+** - Framework  
✅ **TypeScript** - Lenguaje  
✅ **Tailwind CSS** - Estilos  
✅ **Supabase** - Base de datos (futuro)  
✅ **NextAuth.js** - Autenticación (futuro)  
✅ **Vercel** - Deploy (futuro)  

---

## 🆘 Si Algo No Funciona

1. Abre terminal en la carpeta del proyecto
2. Ejecuta: `npm run dev`
3. Abre: http://localhost:3000
4. Si hay errores, revisa la consola

---

## 📅 Fecha de Inicio

**28 de Mayo de 2026**
**Día 1 de 107 días**

---

**¿Listo para empezar? Abre `docs/plan-semanas/semana-1.md` ahora.** 🚀
