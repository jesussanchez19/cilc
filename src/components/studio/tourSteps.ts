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
  /**
   * Elementos que el tutorial pulsa ANTES de medir el foco, con la misma
   * sintaxis que `anclas`.
   *
   * Hace falta porque algunas cosas no existen hasta que navegas: el botón +
   * solo aparece dentro de una carpeta, no en la lista raíz. Sin esto, el paso
   * de "crear contenido" no tenía nada que resaltar.
   *
   * Solo se usa para navegar dentro del panel. Nunca para acciones que
   * modifiquen contenido.
   */
  prepara?: string[];
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
      'Acabamos de abrir "Blog / Noticias" para enseñártelo. Fíjate en el botón + ' +
      'resaltado, arriba de la lista.\n\n' +
      'Ese botón solo aparece DENTRO de una carpeta, no en el índice. Al pulsarlo se ' +
      'abre un documento en blanco a la derecha, listo para rellenar.',
    // Abre una carpeta primero: el + no existe en la lista raíz.
    prepara: ['texto:Blog / Noticias', 'texto:Destinos'],
    anclas: [
      'css:[data-testid="create-new-document-button"]',
      'aria:Create new document',
      'aria:Create',
      'css:[data-testid="pane-header"] button[aria-label*="reate"]',
    ],
    tip: 'Configuración del sitio y Programas no tienen +: son documentos fijos que solo se editan.',
  },
  {
    titulo: 'Rellenar los campos',
    cuerpo:
      'Hemos abierto "Configuración del sitio" como ejemplo. Escribe en cada campo del ' +
      'panel derecho: debajo de varios hay una nota que explica para qué sirve y qué ' +
      'formato espera.\n\n' +
      'Si algo está mal o falta, aparece un aviso en rojo junto al campo y no te dejará ' +
      'publicar hasta corregirlo. Los avisos en amarillo son recomendaciones: no bloquean.',
    // Un singleton: se abre directo como documento, y siempre existe. Blog está
    // vacío, así que no serviría para enseñar un formulario.
    prepara: ['texto:Configuración del sitio'],
    anclas: [
      'css:[data-testid="document-pane"]',
      'css:[data-ui="DocumentPanel"]',
      'css:[data-ui="PaneLayout"] > div:last-child',
    ],
    tip: 'Los campos obligatorios se marcan solos. No hace falta que los adivines.',
  },
  {
    titulo: 'Publicar los cambios',
    cuerpo:
      'Mientras escribes, el Studio guarda un borrador automáticamente. Ese borrador ' +
      'todavía NO se ve en la web.\n\n' +
      'Para que salga publicado, pulsa el botón Publicar de abajo. Si aparece apagado ' +
      'es que no hay cambios pendientes.',
    anclas: [
      'css:[data-testid="action-Publish"]',
      'texto:Publish',
      'texto:Publicar',
      'css:[data-testid="pane-footer"]',
    ],
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
