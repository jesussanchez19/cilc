/**
 * Guion del tutorial del Studio.
 *
 * Cada paso puede apuntar a un elemento real de la interfaz mediante
 * `anclas`: una lista de candidatos que se prueban EN ORDEN hasta que uno
 * exista. Es a propósito — el Studio es una aplicación de terceros y su DOM
 * cambia entre versiones, así que un único selector se rompería en la primera
 * actualización.
 *
 * Si ningún ancla coincide, el paso se muestra centrado y sin foco. La
 * explicación sigue siendo útil y el tutorial nunca se rompe ni resalta un
 * hueco vacío.
 *
 * Sintaxis de las anclas:
 *   'css:<selector>'   → querySelector normal
 *   'texto:<palabra>'  → primer botón o enlace cuyo texto contenga la palabra
 *   'aria:<etiqueta>'  → elemento cuyo aria-label contenga la etiqueta
 */
export interface PasoTutorial {
  titulo: string;
  cuerpo: string;
  anclas?: string[];
  /** Consejo corto que se muestra destacado bajo el texto. */
  tip?: string;
}

export const PASOS: PasoTutorial[] = [
  {
    titulo: 'Bienvenido al panel de CILC',
    cuerpo:
      'Desde aquí gestionas todo el contenido de la web: programas, destinos, blog, ' +
      'testimonios y los datos de contacto. Lo que publiques aquí aparece en el sitio ' +
      'sin que nadie tenga que tocar código.\n\n' +
      'Este recorrido dura menos de un minuto. Puedes salirte cuando quieras.',
  },
  {
    titulo: 'La lista de contenido',
    cuerpo:
      'Esta columna es el índice del sitio. Cada carpeta es un tipo de contenido:\n\n' +
      '• Configuración del sitio — correos, teléfonos y dirección\n' +
      '• Programas — los seis programas que ofrecéis\n' +
      '• Blog / Noticias — artículos\n' +
      '• Destinos — los países\n' +
      '• Socios y Miembros — el equipo y las alianzas\n' +
      '• Solicitudes de Testimonio — lo que envían los alumnos\n' +
      '• Tokens de Testimonio — enlaces de un solo uso',
    anclas: ['css:[data-ui="PaneLayout"] > div:first-child', 'css:#structure', 'css:main'],
  },
  {
    titulo: 'Crear contenido nuevo',
    cuerpo:
      'Para añadir un elemento, entra en su carpeta y pulsa el botón con el símbolo + ' +
      'que aparece arriba de la lista.\n\n' +
      'Se abre un documento en blanco a la derecha, listo para rellenar.',
    anclas: ['aria:Create', 'texto:Create', 'css:[data-ui="Button"][aria-label*="reate"]'],
    tip: 'Configuración del sitio y Programas no tienen +: son documentos fijos que solo se editan.',
  },
  {
    titulo: 'Rellenar los campos',
    cuerpo:
      'Escribe en cada campo del panel derecho. Debajo de varios verás una nota que ' +
      'explica para qué sirve y qué formato espera.\n\n' +
      'Si algo está mal o falta, aparece un aviso en rojo junto al campo y no te dejará ' +
      'publicar hasta corregirlo. Los avisos en amarillo son recomendaciones: no bloquean.',
    anclas: ['css:[data-ui="DocumentPanel"]', 'css:[data-ui="PaneLayout"] > div:last-child'],
    tip: 'Los campos obligatorios se marcan solos. No hace falta que los adivines.',
  },
  {
    titulo: 'Publicar los cambios',
    cuerpo:
      'Mientras escribes, el Studio guarda un borrador automáticamente. Ese borrador ' +
      'todavía NO se ve en la web.\n\n' +
      'Para que salga publicado, pulsa el botón Publicar abajo a la derecha.',
    anclas: ['texto:Publish', 'texto:Publicar', 'aria:Publish', 'css:[data-ui="PaneFooter"]'],
    tip: 'Atajo: Ctrl + S (o Cmd + S en Mac) publica sin tocar el ratón.',
  },
  {
    titulo: 'Cuándo se ve en la web',
    cuerpo:
      'Los cambios aparecen en el sitio aproximadamente un minuto después de publicar. ' +
      'Si no los ves, recarga la página con Ctrl + F5.\n\n' +
      'Si vacías un campo y publicas, esa sección desaparece de la web. Es el ' +
      'comportamiento esperado: sirve para ocultar datos que prefieras no mostrar, ' +
      'como el costo de vida de un destino.',
  },
  {
    titulo: 'Salir del panel',
    cuerpo:
      'Con este botón vuelves al sitio público y cierras la sesión del panel.\n\n' +
      'La sesión se cierra sola tras 10 minutos sin actividad, así que si te alejas del ' +
      'ordenador tendrás que volver a entrar.',
    anclas: ['texto:Salir del Studio'],
    tip: 'Puedes repetir este tutorial cuando quieras con el botón "Ver tutorial".',
  },
];
