# Progreso del Reporte Técnico — Flores (ING_DGS_FLORES_AMBROSIO_JESUS_2523160027)

Archivo de seguimiento para las correcciones del reporte de Jesús Flores Ambrosio.
Versión de trabajo: v5. Documento base: `ING_DGS_FLORES_AMBROSIO_JESUS_2523160027 (5).docx`
Instrucciones entregadas vía Claude para Word.

---

## Reglas de formato UTT (referencia rápida)
- Fuente cuerpo: Arial 12pt | Títulos capítulo: Arial 14pt negritas MAYÚSCULAS
- Márgenes: sup 2cm, inf 2cm, der 2cm, izq 3cm
- Interlineado: 1.5 | Alineación: justificada (excepto portada y Programa de Trabajo pp.4-9)
- Subtemas: Arial 12pt, sin negritas, mayúscula solo al inicio, alineados a la izquierda
- Pies de figura: **Figura X.Y** Descripción. (negritas en "Figura X.Y", descripción normal, 10pt, centrado)
- Sin punto entre número y descripción. Figura referenciada en el texto antes de aparecer.
- Figuras en secciones previas a capítulos (Intro/MT/Metodología): numeración simple (Figura 1, Figura 2...)
- Estructura: 3 capítulos (no 4), mínimo 10 páginas por capítulo

---

## Cambios aplicados

### Portada
- ✅ Título ya en mayúsculas

### Agradecimientos y Dedicatorias
- ✅ Estructura separada (DEDICATORIAS / AGRADECIMIENTOS) ya existía en v5
- ✅ Redacción reemplazada: dedicatoria corta a padres; agradecimientos a CILC, Lic. Patricia, Mtro. Bendaña, Jesús Sánchez, UTT
- ✅ Justificación: aplicar a todo el documento EXCEPTO portada y Programa de Trabajo (pp. 4-9)

### Objetivos
- ✅ Objetivo general corregido: "adecuaciones de proyecto al cliente" (asesor pidió este término)
- ✅ 7 objetivos específicos redactados: análisis → diseño → Sanity CMS → auth → formularios → GA4/SEO → validación
- ✅ Actualizar en DOS lugares: sección OBJETIVOS y tabla del Programa de Trabajo

### Programa de Trabajo
- ✅ Alcance reescrito: fases análisis→diseño→desarrollo→pruebas hasta entrega en producción con Vercel
- ✅ Metas: 3 metas (eliminar 4ta que tenía); redactadas con Sanity CMS incluido
- ✅ Objetivos actualizados (mismos que sección OBJETIVOS)

### Marco Teórico
- ✅ Párrafo intro actualizado (menciona Sanity CMS)
- ✅ Sección "Sanity CMS" AGREGADA después de Tailwind CSS
- ✅ "Gestión de datos en TypeScript" → renombrada "Gestión de datos" con enfoque híbrido TS + Sanity
- ✅ MDX ELIMINADO (blog ahora en Sanity)
- ✅ Playwright ELIMINADO (tests E2E eliminados del proyecto)
- ✅ Resend: párrafo ampliado con cita (Resend, 2024)
- ✅ Vercel: párrafo ampliado con cita (Vercel, 2024a)
- ✅ Google Analytics 4: sección nueva insertada antes de Resend con cita (Google, 2024c)
- ✅ Tailwind CSS: cita (Tailwind Labs, 2024) agregada al final del párrafo
- ✅ Citas corregidas: (Vercel, 2024) → (Vercel, 2024a) x3; (Google, 2024) → (Google, 2024c)

### Metodología
- ✅ "cada mejora implementada" → "cada funcionalidad implementada"
- ✅ Figura 0.1 → Figura 1 (numeración consecutiva para secciones pre-capítulo)
- ✅ Pie de figura: **Figura 1** Tablero Kanban... (10pt, centrado, negritas en número)
- ✅ Agregar referencia "En la Figura 1 se muestra el tablero Kanban..." antes de la imagen

### Referencias
- ✅ MDX eliminada
- ✅ Agregadas: Resend, Sanity, Tailwind Labs
- ✅ Google(2024c): Google Analytics 4 agregada
- ✅ Vercel(2024) → Vercel(2024a) renombrada para consistencia con (2024b)
- ✅ Orden alfabético final: Banks, Colinhacks, Flanagan, Freeman, Google(a), Google(b), Google(c), HubSpot, IBM, Kinsta, Masse, Microsoft, Mozilla, Nielsen, Resend, Sanity, Tailwind Labs, Vercel(a), Vercel(b), Wieruch

---

## Estado final — Correcciones completas ✅

### Capítulo 1
- ✅ Secciones 1.1–1.7 con contenido expandido (~10.5 páginas)
- ✅ Figuras 1.1–1.7 sin huecos ni duplicados
- ✅ Encabezados de tablas: gris #D9D9D9 (no azul)
- ✅ Tablas renombradas como "Figura" (no "Tabla") per guía UTT

### Capítulo 2
- ✅ Figuras 2.1–2.34 secuencia continua sin huecos ni duplicados
- ✅ Secciones 2.1–2.9 con subsecciones (Título2/Título3 en índice)
- ✅ Encabezados de tablas: gris #D9D9D9 uniformes
- ✅ Figura 2.35 (tabla comparativa) agregada
- ✅ Idiomas sección: 2.7/2.8
- ✅ Nombre componentes corregidos (CountryDetail→SiteChrome, PhotoGallery→AnimateIn)
- ✅ §2.2 blog.ts: "lectura de MDX" → "consultas GROQ a Sanity CMS" *(pendiente aplicar en Word)*

### Capítulo 3
- ✅ Figuras 3.1–3.13 secuencia continua
- ✅ Secciones 3.1–3.5 con subsecciones 3.4.1–3.4.11
- ✅ Contenido agregado en 3.1 (BackEnd), 3.2 (Frontend), 3.3 (Funcionalidades)
- ✅ Sección 3.5 Pruebas con Lighthouse (3.12) y Axe (3.13)
- ⚠️ Figura 3.11: celda con "Imagen pendiente" en cursiva gris (captura pendiente de Flores)

### Capítulo 4
- ✅ ELIMINADO (contenido fusionado en Cap 3)

### Secciones frontales/finales
- ✅ Introducción: 9 párrafos, ~840 palabras (~3.4 cuartillas), todos los puntos UTT cubiertos
- ✅ Resumen: redactado (~330 palabras, ~1.3 cuartillas), 5 puntos guía cubiertos
- ✅ Abstract: traducción al inglés del Resumen
- ✅ Listado de siglas: formato doble línea (inglés + español) per guía UTT, 27 entradas
- ✅ Glosario: 20 términos, todos con cita de fuente reconocida
- ✅ CONCLUSIONES general: ~430 palabras (~1.7 cuartillas), tiempo pasado, métricas reales, mejoras futuras
- ✅ Cronograma: PROG y REAL llenados (15 actividades × 15 semanas); REAL completo hasta semana 12
- ✅ Índice: actualizado sin Cap 4
- ✅ Marco Teórico: MDX eliminado, sección Sanity CMS agregada

### Pendiente
- ✅ Conclusiones por capítulo (2.10 / 3.6) — descartadas, no requeridas
- ✅ Figura 3.11: captura del Sanity Studio insertada
- ✅ Índice: actualizado, incluye RESUMEN, ABSTRACT y todas las secciones correctas
- ✅ Verificación PDF: 78 págs, sin figuras huérfanas, Cap1=10p Cap2=25p
- ⚠️ Cap 3 tenía 9 págs → sección 3.3 ampliada con 5 párrafos de funcionalidades
- ✅ PDF final verificado: 80 págs | Cap1=10p Cap2=25p Cap3=11p | sin figuras huérfanas
- ✅ REPORTE COMPLETO

---
Última actualización: 2026-08-01
