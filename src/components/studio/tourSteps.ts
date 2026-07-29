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
 *   'rotulo:<texto>'   → cualquier elemento cuyo texto sea exactamente ese
 *   'junto-a:<texto>'  → primer botón o enlace en el mismo renglón que ese
 *                        texto y a su derecha (para el + de una cabecera)
 *   'region-derecha:<selector>' → el área que queda a la derecha de ese
 *                        elemento. No busca un elemento: construye el
 *                        rectángulo. Útil cuando la zona a resaltar no tiene
 *                        un contenedor identificable.
 *   'grupo-derecha:<texto>' → el conjunto de botones de icono que hay en el
 *                        mismo renglón que ese texto y a su derecha. También
 *                        construye el rectángulo. Para las barras de iconos
 *                        seguidos, donde no se puede distinguir uno solo.
 *
 * Cualquiera admite el prefijo `panel-` para buscar SOLO dentro del área de
 * paneles: 'panel-aria:Create'. Casi siempre es lo que se quiere. El Studio
 * repite botones equivalentes en la barra superior — hay un + global además
 * del + de cada carpeta— y sin acotar se resalta el de arriba.
 */
export interface PasoTutorial {
  titulo: string;
  cuerpo: string;
  anclas?: string[];
  /** Consejo corto que se muestra destacado bajo el texto. */
  tip?: string;
  /**
   * Navegación que el tutorial hace ANTES de medir el foco.
   *
   * Hace falta porque algunas cosas no existen hasta que navegas: el botón +
   * solo aparece dentro de una carpeta, y el menú de eliminar solo con un
   * documento abierto.
   *
   * Cada elemento de la lista es UN clic, y se ejecutan en orden. Si un
   * elemento es a su vez una lista, sus entradas son ALTERNATIVAS para ese
   * mismo clic: se prueba en orden y se pulsa la primera que exista.
   *
   *   ['a', 'b']    → pulsa a, espera, pulsa b   (secuencia)
   *   [['a', 'b']]  → pulsa a, o b si a no está  (alternativas)
   *
   * Solo se usa para navegar. Nunca para acciones que modifiquen contenido.
   */
  prepara?: (string | string[])[];
  /**
   * Fuerza de qué lado del foco se coloca la tarjeta.
   *
   * Por defecto se elige el primer lado donde quepa sin solaparse. Sirve para
   * los focos grandes, donde el hueco automático puede no ser el que mejor se
   * lee: con el panel de documento resaltado, la tarjeta se quiere a la
   * izquierda, sobre la lista de carpetas.
   */
  lado?: 'izquierda' | 'derecha' | 'arriba' | 'abajo';
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
    // Sin `main` como reserva: abarca toda la página, y resaltarla entera no
    // señala nada ni deja sitio para la tarjeta.
    anclas: ['css:[data-ui="PaneLayout"] > div:first-child', 'css:#structure'],
  },
  {
    titulo: 'Crear contenido nuevo',
    cuerpo:
      'Acabamos de abrir "Blog / Noticias" para enseñártelo. Fíjate en el botón + ' +
      'resaltado, arriba de la lista.\n\n' +
      'Ese botón solo aparece DENTRO de una carpeta, no en el índice. Al pulsarlo se ' +
      'abre un documento en blanco a la derecha, listo para rellenar.',
    // Abre una carpeta primero: el + no existe en la lista raíz. Las dos
    // entradas son ALTERNATIVAS de un mismo clic —de ahí la lista anidada—, no
    // dos navegaciones seguidas.
    prepara: [['panel-texto:Blog / Noticias', 'panel-texto:Destinos']],
    // El + de la cabecera no tiene identificador reconocible ni aria-label con
    // "Create", y además es un enlace, no un botón. Se localiza por posición:
    // mismo renglón que el título del panel y a su derecha. Las reservas van
    // acotadas al panel, porque el + de la barra superior significa lo mismo y
    // una búsqueda global lo encontraba antes.
    anclas: [
      'junto-a:Blog / Noticias',
      'panel-css:[data-testid="create-new-document-button"]',
      'panel-aria:Create new document',
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
    prepara: ['panel-texto:Configuración del sitio'],
    // Se resalta el panel de documento completo. El área se calcula a partir de
    // la lista de carpetas porque ese contenedor no se identifica de forma
    // fiable: los selectores acababan cayendo en el separador entre paneles.
    // La tarjeta va a la izquierda, encajada sobre la lista, para dejar el
    // formulario entero a la vista.
    anclas: [
      'region-derecha:[data-ui="PaneLayout"] > div:first-child',
      'panel-css:[data-testid="document-pane"]',
    ],
    lado: 'izquierda',
    tip: 'Los campos obligatorios se marcan solos. No hace falta que los adivines.',
  },
  {
    titulo: 'Publicar los cambios',
    cuerpo:
      'Mientras escribes, el Studio guarda un borrador automáticamente. Ese borrador ' +
      'todavía NO se ve en la web.\n\n' +
      'Para que salga publicado, pulsa "Guardar y publicar" abajo a la derecha. Si ' +
      'aparece apagado es que no hay cambios pendientes.',
    // El botón se renombró a "Guardar y publicar" en sanity.config.ts. Se dejan
    // los nombres originales como reserva.
    //
    // "Publish" tiene que casar exacto: el distintivo "Published" de la cabecera
    // contiene esa misma palabra y se encontraba antes que el botón del pie.
    anclas: [
      'panel-texto:Guardar y publicar',
      'panel-css:[data-testid="action-Publish"]',
      'panel-texto:Publish',
    ],
    // Queda abajo a la derecha, así que la tarjeta va encima para no taparlo.
    lado: 'arriba',
    tip: 'Atajo: Ctrl + S (o Cmd + S en Mac) publica sin tocar el ratón.',
  },
  {
    titulo: 'Eliminar un documento',
    cuerpo:
      'Hemos abierto un destino porque aquí sí se puede borrar. Entre los iconos ' +
      'resaltados, arriba del documento, está el de tres puntos: ahí dentro aparece ' +
      'la opción Eliminar.\n\n' +
      'Pide confirmación antes de hacer nada, pero una vez confirmado NO hay vuelta ' +
      'atrás: el documento desaparece de Sanity y de la web.',
    // Dos clics encadenados: primero la carpeta, luego un documento. La opción
    // de eliminar solo existe con un documento abierto, y Configuración del
    // sitio y Programas no la tienen — son fijos y no deben borrarse.
    prepara: ['panel-texto:Destinos', 'panel-texto:Canadá'],
    // Se resalta la barra de iconos completa. El de tres puntos no se puede
    // distinguir de sus vecinos por el DOM, y los aria-label que se probaron
    // ("Document actions", "Actions") no existen en esta versión del Studio: el
    // paso se quedaba sin foco. Se toman los distintivos de estado como
    // referencia de la fila, con reserva por si el documento aún no está
    // publicado y solo aparece "Draft".
    anclas: ['grupo-derecha:Published', 'grupo-derecha:Draft'],
    lado: 'abajo',
    tip: 'Configuración del sitio y Programas no se pueden eliminar: el sitio los necesita.',
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
