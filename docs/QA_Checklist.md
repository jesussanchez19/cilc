# Checklist de QA Visual — CILC

## Cómo usar este checklist
- Revisa cada página en los 3 breakpoints indicados
- Marca ✅ cuando pasa, ❌ cuando falla (anota el problema), ⏳ pendiente
- Usa Chrome DevTools → Toggle Device Toolbar para simular resoluciones

---

## Dispositivos a revisar
| Dispositivo        | Resolución | Cómo simular                            |
|--------------------|------------|-----------------------------------------|
| iPhone SE          | 375px      | DevTools → iPhone SE                    |
| iPhone 14 Pro      | 393px      | DevTools → iPhone 14 Pro                |
| iPad               | 768px      | DevTools → iPad Mini                    |
| Laptop             | 1280px     | DevTools → Responsive → 1280           |
| Desktop            | 1440px     | DevTools → Responsive → 1440           |

---

## Checklist por página

### `/` — Homepage
| Criterio                                          | 375px | 768px | 1440px |
|---------------------------------------------------|-------|-------|--------|
| No hay texto cortado o desbordado                 | ⏳    | ⏳    | ⏳     |
| Todas las imágenes cargan (no hay ícono roto)     | ⏳    | ⏳    | ⏳     |
| El logo de CILC se ve correctamente               | ⏳    | ⏳    | ⏳     |
| El banner de consulta gratuita es visible         | ⏳    | ⏳    | ⏳     |
| El HeroBanner ocupa el ancho completo             | ⏳    | ⏳    | ⏳     |
| La sección de programas muestra grid correcto     | ⏳    | ⏳    | ⏳     |
| El carrusel de testimonios funciona               | ⏳    | ⏳    | ⏳     |
| La sección de logos/socios está alineada          | ⏳    | ⏳    | ⏳     |
| El botón WhatsApp flotante es visible             | ⏳    | ⏳    | ⏳     |
| El menú hamburguesa aparece al hacer scroll       | ⏳    | ⏳    | N/A    |

### `/idiomas` — Página de programa
| Criterio                                          | 375px | 768px | 1440px |
|---------------------------------------------------|-------|-------|--------|
| El hero imagen carga correctamente                | ⏳    | ⏳    | ⏳     |
| La animación slide-up funciona                    | ⏳    | ⏳    | ⏳     |
| Los botones CTA son visibles en el hero           | ⏳    | ⏳    | ⏳     |
| La barra CTA fija aparece en móvil                | ⏳    | N/A   | N/A    |
| El carrusel de galería funciona                   | ⏳    | ⏳    | ⏳     |
| Los testimonios muestran foto y texto             | ⏳    | ⏳    | ⏳     |
| El modal de cotización abre y cierra              | ⏳    | ⏳    | ⏳     |
| El programa está preseleccionado en el modal      | ⏳    | ⏳    | ⏳     |

### `/au-pair`, `/anos-academicos`, `/estudia-trabaja`, `/formacion-corporativa`, `/idiomas-en-linea`
| Criterio                                          | 375px | 1440px |
|---------------------------------------------------|-------|--------|
| La página carga sin error 404                     | ⏳    | ⏳     |
| El hero imagen es específico del programa         | ⏳    | ⏳     |
| Los botones de cotización están presentes         | ⏳    | ⏳     |

### `/destinos` — Listado de destinos
| Criterio                                          | 375px | 768px | 1440px |
|---------------------------------------------------|-------|-------|--------|
| Los chips de filtro se ven completos              | ⏳    | ⏳    | ⏳     |
| El grid de países muestra imágenes                | ⏳    | ⏳    | ⏳     |
| Filtrar por región funciona sin recargar          | ⏳    | ⏳    | ⏳     |
| El contador de resultados se actualiza            | ⏳    | ⏳    | ⏳     |

### `/destinos/canada` (y otros países)
| Criterio                                          | 375px | 1440px |
|---------------------------------------------------|-------|--------|
| La página carga sin error 404                     | ⏳    | ⏳     |
| Las 4 stats son visibles                          | ⏳    | ⏳     |
| La información de visa está presente              | ⏳    | ⏳     |
| El botón WhatsApp lleva al número correcto        | ⏳    | ⏳     |

### `/contact` — Formulario de contacto
| Criterio                                          | 375px | 768px | 1440px |
|---------------------------------------------------|-------|-------|--------|
| Todos los campos son visibles y usables           | ⏳    | ⏳    | ⏳     |
| El spinner aparece al enviar                      | ⏳    | ⏳    | ⏳     |
| El mensaje de éxito aparece tras enviar           | ⏳    | ⏳    | ⏳     |
| El mensaje de error aparece si falla              | ⏳    | ⏳    | ⏳     |

### `/blog` y `/blog/[slug]`
| Criterio                                          | 375px | 1440px |
|---------------------------------------------------|-------|--------|
| El listado muestra las tarjetas de artículos      | ⏳    | ⏳     |
| Clic en tarjeta navega al artículo correcto       | ⏳    | ⏳     |
| El artículo muestra imagen hero y contenido       | ⏳    | ⏳     |
| El link "Volver al blog" funciona                 | ⏳    | ⏳     |

### `/buscar` — Búsqueda global
| Criterio                                          | 375px | 1440px |
|---------------------------------------------------|-------|--------|
| La barra de búsqueda funciona                     | ⏳    | ⏳     |
| Los resultados se agrupan por tipo                | ⏳    | ⏳     |
| Sin parámetro muestra la invitación a buscar      | ⏳    | ⏳     |

### `/sobre-nosotros`
| Criterio                                          | 375px | 1440px |
|---------------------------------------------------|-------|--------|
| La página carga sin error 404                     | ⏳    | ⏳     |
| La línea de tiempo es legible                     | ⏳    | ⏳     |
| Los socios y logos se ven correctamente           | ⏳    | ⏳     |

### `/galeria`
| Criterio                                          | 375px | 1440px |
|---------------------------------------------------|-------|--------|
| El grid muestra 2 columnas en móvil               | ⏳    | ⏳     |
| El lightbox abre al hacer clic en una foto        | ⏳    | ⏳     |
| Las flechas del lightbox funcionan                | ⏳    | ⏳     |
| Escape cierra el lightbox                         | ⏳    | ⏳     |

---

## Checklist de producción (Actividad 9 — 20 puntos)

| # | Criterio                                                              | Estado |
|---|-----------------------------------------------------------------------|--------|
| 1 | Homepage carga en menos de 3 segundos en móvil (Lighthouse)           | ⏳     |
| 2 | El logo de CILC se ve correctamente en desktop y móvil                | ⏳     |
| 3 | La navegación funciona en móvil (hamburguesa) y desktop               | ⏳     |
| 4 | Todas las páginas de programa cargan sin error                        | ⏳     |
| 5 | El formulario de contacto envía email a CILC                          | ⏳     |
| 6 | El botón de WhatsApp funciona con el número correcto                  | ⏳     |
| 7 | Las imágenes cargan sin error en todas las páginas                    | ⏳     |
| 8 | No hay links rotos (revisar con https://www.drlinkcheck.com)          | ⏳     |
| 9 | El sitio se ve bien en iPhone SE (375px)                              | ⏳     |
| 10| El sitio se ve bien en iPad (768px)                                   | ⏳     |
| 11| El sitio se ve bien en desktop (1440px)                               | ⏳     |
| 12| El menú hamburguesa aparece y funciona al hacer scroll en móvil       | ⏳     |
| 13| Los filtros de /destinos funcionan sin recargar la página             | ⏳     |
| 14| La búsqueda global encuentra programas, destinos y artículos          | ⏳     |
| 15| El modal de cotización se abre y cierra en todas las páginas          | ⏳     |
| 16| El breadcrumb muestra la ruta correcta en páginas internas            | ⏳     |
| 17| HTTPS activo — el candado verde aparece en el navegador               | ⏳     |
| 18| http:// redirige automáticamente a https://                           | ⏳     |
| 19| El favicon de CILC aparece en la pestaña del navegador                | ⏳     |
| 20| El meta theme-color azul aparece en Android Chrome                    | ⏳     |

---

## Problemas encontrados
> Documenta aquí cualquier bug visual encontrado durante la revisión.

| Página | Dispositivo | Descripción del problema | Prioridad |
|--------|-------------|--------------------------|-----------|
|        |             |                          |           |
