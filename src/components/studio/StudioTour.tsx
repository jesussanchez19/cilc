'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { PASOS, type PasoTutorial } from './tourSteps';

/** Marca en el navegador de que este usuario ya vio el tutorial. */
const CLAVE_VISTO = 'cilc-studio-tour-visto';

interface Recuadro { top: number; left: number; width: number; height: number }

/** Prefijo de las entradas de `prepara` que abren un menú desplegable. */
const MENU_CON = 'menu-con:';

/**
 * Resuelve un ancla a un elemento real.
 *
 * Soporta selector CSS, búsqueda por texto y por aria-label, porque el DOM del
 * Studio está minificado y no expone identificadores estables.
 */
function buscarElemento(ancla: string): HTMLElement | null {
  const corte = ancla.indexOf(':');
  if (corte < 0) return null;
  let tipo = ancla.slice(0, corte);
  const valor = ancla.slice(corte + 1);

  /**
   * El prefijo `panel-` limita la búsqueda al área de paneles.
   *
   * Es necesario porque el Studio tiene DOS botones con el mismo significado:
   * el + global de la barra superior y el + de la cabecera de cada carpeta.
   * Una búsqueda por todo el documento encontraba primero el de arriba y
   * resaltaba el botón equivocado.
   */
  const soloPanel = tipo.startsWith('panel-');
  if (soloPanel) tipo = tipo.slice('panel-'.length);

  const raizPanel = document.querySelector('[data-ui="PaneLayout"]');
  const raiz: ParentNode = (soloPanel && raizPanel) || document;

  /**
   * Descarta lo que esté en la barra superior.
   *
   * Hace falta incluso con `panel-`: si el contenedor de paneles no se
   * encuentra —cambia entre versiones del Studio— la búsqueda caía a todo el
   * documento y volvía a encontrar el + del navbar. Se usa como referencia el
   * borde inferior de las pestañas de herramientas, que sí son estables.
   */
  const filtrar = (e: HTMLElement): boolean => {
    if (!soloPanel) return true;
    if (raizPanel) return raizPanel.contains(e);
    const limite = bordeInferiorNavbar();
    return limite === 0 || e.getBoundingClientRect().top >= limite;
  };

  try {
    if (tipo === 'junto-a') return botonJuntoATexto(valor);
    if (tipo === 'rotulo') return porRotulo(valor);

    if (tipo === 'css') {
      const todos = [...raiz.querySelectorAll<HTMLElement>(valor)];
      return todos.find(filtrar) ?? null;
    }

    if (tipo === 'texto') {
      // `menuitem` incluido para las opciones de los menús desplegables, que no
      // son botones ni enlaces y sin esto quedaban fuera del alcance.
      const candidatos = [...raiz
        .querySelectorAll<HTMLElement>('button, a, [role="button"], [role="menuitem"]')]
        .filter(filtrar);
      // La coincidencia exacta va primero. Buscando solo "contiene", `Publish`
      // encontraba antes el distintivo "Published" de la cabecera que el botón
      // de publicar del pie.
      return candidatos.find((e) => (e.textContent ?? '').trim() === valor)
        ?? candidatos.find((e) => (e.textContent ?? '').trim().includes(valor))
        ?? null;
    }

    if (tipo === 'aria') {
      const candidatos = [...raiz.querySelectorAll<HTMLElement>('[aria-label]')];
      return candidatos.find((e) => (e.getAttribute('aria-label') ?? '').includes(valor) && filtrar(e)) ?? null;
    }
  } catch {
    // Un selector inválido no debe tumbar el tutorial.
  }
  return null;
}

/**
 * Botón que está en la misma fila que un texto dado y a su derecha.
 *
 * Sirve para el + de la cabecera de una carpeta, que no lleva `data-testid`
 * reconocible ni un aria-label con "Create". Buscarlo por su posición respecto
 * al título del panel es más estable que depender del DOM interno del Studio.
 *
 * Se toma la ÚLTIMA coincidencia del texto porque el nombre de la carpeta
 * aparece dos veces: en la barra lateral y en la cabecera del panel abierto.
 */
function botonJuntoATexto(texto: string): HTMLElement | null {
  const limite = bordeInferiorNavbar();

  const rotulos = [...document.querySelectorAll<HTMLElement>('h1, h2, h3, span, div')]
    .filter((e) => (e.textContent ?? '').trim() === texto)
    .filter((e) => e.getBoundingClientRect().top >= limite);
  const rotulo = rotulos[rotulos.length - 1];
  if (!rotulo) return null;

  const r = rotulo.getBoundingClientRect();
  const centro = r.top + r.height / 2;

  // Se incluyen enlaces: el + de la cabecera NO es un <button>, es un <a> que
  // apunta a una URL de tipo `intent/create`. Buscando solo botones se
  // encontraba el menú de tres puntos, que está justo a su derecha.
  const candidatos = [...document.querySelectorAll<HTMLElement>('button, a, [role="button"]')]
    .filter((b) => {
      const rb = b.getBoundingClientRect();
      if (rb.width < 8 || rb.height < 8) return false;
      // Misma franja horizontal y a la derecha del rótulo.
      if (Math.abs(rb.top + rb.height / 2 - centro) < 22 && rb.left > r.right) {
        return mismaFila(rotulo, b);
      }
      return false;
    })
    .sort((a, z) => a.getBoundingClientRect().left - z.getBoundingClientRect().left);

  // El más a la izquierda: el + va antes que el menú de tres puntos.
  return candidatos[0] ?? null;
}

/**
 * Comprueba que dos elementos pertenecen a la MISMA barra, no solo a la misma
 * altura de la pantalla.
 *
 * Estar alineados horizontalmente no basta. Los paneles del Studio van lado a
 * lado, así que el rótulo "Blog / Noticias" de la barra lateral quedaba a la
 * misma altura que una tarjeta de la lista del panel de al lado, y el tutorial
 * resaltaba esa tarjeta creyendo que era el botón + de la cabecera.
 *
 * La condición de verdad es que compartan un contenedor PEQUEÑO: una cabecera
 * mide unas decenas de píxeles de alto y agrupa el título con sus botones. Si
 * el primer ancestro común es alto, es que son cosas de paneles distintos que
 * solo coinciden en pantalla por casualidad.
 */
function mismaFila(rotulo: HTMLElement, boton: HTMLElement): boolean {
  const ALTO_MAX_CABECERA = 120;
  let nodo: HTMLElement | null = rotulo.parentElement;
  for (let i = 0; nodo && i < 8; i += 1, nodo = nodo.parentElement) {
    if (nodo.contains(boton)) {
      return nodo.getBoundingClientRect().height <= ALTO_MAX_CABECERA;
    }
  }
  return false;
}

/**
 * Cualquier elemento cuyo texto coincida exactamente, por debajo de la barra
 * superior. A diferencia de `texto:`, no se limita a botones y enlaces, así que
 * sirve para señalar rótulos de campos del formulario.
 */
function porRotulo(texto: string): HTMLElement | null {
  const limite = bordeInferiorNavbar();
  return [...document.querySelectorAll<HTMLElement>('label, h1, h2, h3, span, div, p')]
    .find((e) => {
      if ((e.textContent ?? '').trim() !== texto) return false;
      const r = e.getBoundingClientRect();
      return r.width >= 8 && r.height >= 8 && r.top >= limite;
    }) ?? null;
}

/** Dónde termina la barra superior, medida desde sus pestañas de herramientas. */
function bordeInferiorNavbar(): number {
  const pestanas = ['Structure', 'Vision', 'Releases'];
  const tab = [...document.querySelectorAll<HTMLElement>('a, button, [role="tab"]')]
    .find((e) => pestanas.includes((e.textContent ?? '').trim()));
  return tab ? tab.getBoundingClientRect().bottom : 0;
}

/** Primer ancla que exista y sea visible. `null` si ninguna coincide. */
/**
 * Rectángulo del área que queda a la DERECHA de un elemento, por debajo de la
 * barra superior.
 *
 * Se construye a mano en vez de buscar el elemento del panel de documento
 * porque ese contenedor no es identificable de forma fiable: los intentos
 * acababan cayendo en el separador entre paneles, una franja de unos pocos
 * píxeles de ancho. Calcularlo a partir de la lista de carpetas, que sí se
 * localiza bien, da siempre el área correcta.
 */
function regionDerechaDe(selector: string): Recuadro | null {
  const ref = document.querySelector<HTMLElement>(selector);
  if (!ref) return null;

  const r = ref.getBoundingClientRect();
  const top = Math.max(bordeInferiorNavbar(), r.top);
  const left = r.right;
  const width = window.innerWidth - left;
  const height = window.innerHeight - top;

  if (width < 120 || height < 120) return null;
  return { top, left, width, height };
}

/**
 * Abre el menú desplegable que contiene una opción concreta y devuelve el botón
 * que lo abrió, o `null` si no se logró.
 *
 * El botón de tres puntos de la cabecera del documento no se puede identificar:
 * es uno de cinco iconos seguidos, sin aria-label ni testid propios. En vez de
 * adivinar cuál es, se prueban los que declaran abrir un menú y se COMPRUEBA el
 * resultado — si la opción buscada aparece, era ese; si no, se cierra y se
 * sigue. El criterio de éxito es justo lo que el paso necesita resaltar, así que
 * no hay forma de acertar el botón y fallar el objetivo.
 *
 * Se descartan los enlaces y se ordena de arriba abajo a propósito: en esa fila
 * también están el botón de cerrar el documento y los menús de cada campo del
 * formulario, y pulsar el de cerrar dejaría el paso sin nada que enseñar.
 */
async function abrirMenuCon(texto: string): Promise<HTMLElement | null> {
  const visible = () => buscarElemento(`texto:${texto}`);
  // Si ya está abierto no se toca nada: no lo abrimos nosotros, así que
  // tampoco nos toca cerrarlo.
  if (visible()) return null;

  const limite = bordeInferiorNavbar();
  const candidatos = [...document.querySelectorAll<HTMLElement>('[aria-haspopup], [aria-expanded]')]
    .filter((b) => {
      if (b.tagName === 'A') return false;
      const r = b.getBoundingClientRect();
      if (r.width < 8 || r.height < 8 || r.top < limite) return false;
      // Solo iconos cuadrados: descarta pestañas y desplegables de texto.
      return Math.abs(r.width - r.height) < 12;
    })
    .sort((a, z) => {
      const ra = a.getBoundingClientRect();
      const rz = z.getBoundingClientRect();
      // Cabecera del documento primero, y dentro de ella de derecha a
      // izquierda: el menú del documento está al final de la fila.
      return ra.top - rz.top || rz.left - ra.left;
    });

  for (const boton of candidatos) {
    boton.click();
    await new Promise((r) => setTimeout(r, 380));
    if (visible()) return boton;
    // No era este: se cierra para no ir dejando menús abiertos por la pantalla.
    boton.click();
    await new Promise((r) => setTimeout(r, 140));
  }
  return null;
}

/**
 * Recuadro que engloba los botones de icono situados a la derecha de un texto,
 * en su mismo renglón.
 *
 * Es para el menú de tres puntos de la cabecera del documento, donde vive la
 * opción de eliminar. Ese botón no expone nada por lo que buscarlo: es uno de
 * cinco iconos seguidos, sin aria-label ni testid útiles, y quedarse con "el
 * tercero" se rompería en cuanto Sanity añadiera o quitara uno.
 *
 * Resaltar el grupo entero señala la zona correcta y aguanta esos cambios; el
 * texto del paso concreta cuál de ellos hay que pulsar.
 */
function grupoDerechaDe(texto: string): Recuadro | null {
  const limite = bordeInferiorNavbar();

  // Se incluyen botones y enlaces: la referencia natural de esa fila son los
  // distintivos "Published" y "Draft", que en el Studio son pulsables, no
  // simples etiquetas. Buscando solo texto plano no se encontraba nada y el
  // paso se quedaba sin foco.
  const rotulos = [...document.querySelectorAll<HTMLElement>('span, div, h1, h2, h3, button, a')]
    .filter((e) => (e.textContent ?? '').trim() === texto)
    .filter((e) => e.getBoundingClientRect().top >= limite);
  const rotulo = rotulos[rotulos.length - 1];
  if (!rotulo) return null;

  const r = rotulo.getBoundingClientRect();
  const centro = r.top + r.height / 2;

  const iconos = [...document.querySelectorAll<HTMLElement>('button, [role="button"]')]
    .map((b) => b.getBoundingClientRect())
    .filter((rb) => {
      if (rb.width < 8 || rb.height < 8) return false;
      if (Math.abs(rb.top + rb.height / 2 - centro) >= 22) return false;
      if (rb.left <= r.right) return false;
      // Solo botones cuadrados. En esa misma fila están los distintivos
      // "Published" y "Draft", que también son botones pero alargados; sin este
      // filtro el recuadro se estiraba desde ellos hasta el borde y dejaba de
      // señalar los iconos.
      return Math.abs(rb.width - rb.height) < 12;
    });
  if (!iconos.length) return null;

  const left = Math.min(...iconos.map((b) => b.left));
  const top = Math.min(...iconos.map((b) => b.top));
  const width = Math.max(...iconos.map((b) => b.right)) - left;
  const height = Math.max(...iconos.map((b) => b.bottom)) - top;

  if (width < 8 || height < 8) return null;
  return { top, left, width, height };
}

function localizar(paso: PasoTutorial): Recuadro | null {
  const areaPantalla = window.innerWidth * window.innerHeight;

  for (const ancla of paso.anclas ?? []) {
    // Las anclas que construyen un rectángulo en vez de buscar un elemento se
    // devuelven tal cual: no tienen nodo del que medir, y los descartes de más
    // abajo (tamaño, franjas) están pensados para elementos encontrados.
    if (ancla.startsWith('region-derecha:')) {
      const rect = regionDerechaDe(ancla.slice('region-derecha:'.length));
      if (rect) return rect;
      continue;
    }

    if (ancla.startsWith('grupo-derecha:')) {
      const rect = grupoDerechaDe(ancla.slice('grupo-derecha:'.length));
      if (rect) return rect;
      continue;
    }

    const el = buscarElemento(ancla);
    if (!el) continue;
    const r = el.getBoundingClientRect();

    // Descarta elementos ocultos o de tamaño ridículo: resaltarlos se vería peor
    // que no resaltar nada.
    if (r.width < 8 || r.height < 8) continue;

    // Y las franjas muy estrechas y muy altas —o al revés—, que son separadores
    // y barras de desplazamiento. Resaltarlas confunde: parece que se señala
    // algo cuando no hay nada que mirar ahí.
    const esFranja =
      (r.width < 80 && r.height > window.innerHeight * 0.4) ||
      (r.height < 80 && r.width > window.innerWidth * 0.9 && !paso.lado);
    if (esFranja) continue;

    // Y también los que ocupan casi toda la pantalla. Resaltar "todo" no señala
    // nada, y además no deja hueco donde poner la tarjeta sin taparlo. En ese
    // caso es mejor oscurecer sin foco.
    //
    // El umbral es alto a propósito: un panel de documento ocupa buena parte de
    // la ventana y sí tiene sentido resaltarlo entero, porque se distingue del
    // resto. Solo se descarta lo que prácticamente cubre la pantalla.
    if ((r.width * r.height) / areaPantalla > 0.88) continue;

    return { top: r.top, left: r.left, width: r.width, height: r.height };
  }
  return null;
}

export default function StudioTour() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [indice, setIndice] = useState(0);
  const [foco, setFoco] = useState<Recuadro | null>(null);
  const tarjetaRef = useRef<HTMLDivElement>(null);

  const enStudio =
    pathname.startsWith('/studio') &&
    pathname !== '/studio/login' &&
    pathname !== '/studio/reset';

  /**
   * Arranca solo la primera vez, y solo cuando el Studio ya está montado.
   *
   * No basta con mirar la ruta: si el usuario aún no ha iniciado sesión en
   * Sanity, /studio muestra la pantalla "Choose login provider" y el tutorial
   * se abriría encima de ella, explicando una interfaz que no está a la vista.
   *
   * `PaneLayout` es el contenedor de los paneles del Studio y no existe en esa
   * pantalla de acceso, así que sirve de señal de que la interfaz real cargó.
   */
  useEffect(() => {
    if (!enStudio) return;
    if (localStorage.getItem(CLAVE_VISTO)) return;

    let intentos = 0;
    const id = setInterval(() => {
      intentos += 1;
      if (document.querySelector('[data-ui="PaneLayout"]')) {
        clearInterval(id);
        setAbierto(true);
      } else if (intentos > 40) {
        // ~20 s sin cargar: probablemente sigue en la pantalla de acceso de
        // Sanity. Se deja estar; el botón "Ver tutorial" sigue disponible.
        clearInterval(id);
      }
    }, 500);

    return () => clearInterval(id);
  }, [enStudio]);

  // Permite lanzarlo desde el botón "Ver tutorial", que vive en otro componente.
  useEffect(() => {
    const abrir = () => { setIndice(0); setAbierto(true); };
    window.addEventListener('cilc:abrir-tutorial', abrir);
    return () => window.removeEventListener('cilc:abrir-tutorial', abrir);
  }, []);

  const paso = PASOS[indice];

  // Recalcula el foco al cambiar de paso y cuando la ventana se mueve. El
  // recuadro se mide en cada frame relevante porque el Studio reacomoda sus
  // paneles al redimensionar.
  useEffect(() => {
    if (!abierto || !paso) return;

    /**
     * Algunos pasos necesitan navegar antes de poder señalar nada: el botón +
     * no existe hasta que se abre una carpeta, y el menú de eliminar hasta que
     * se abre un documento.
     *
     * Los clics van EN SECUENCIA, con una pausa entre ellos, porque cada uno
     * abre el panel donde vive el siguiente: pulsarlos de golpe fallaría, ya
     * que el segundo elemento aún no existe cuando se busca.
     *
     * Es deliberadamente solo navegación. Nada que cree, edite ni borre
     * contenido: el tutorial no debe tocar los datos de nadie.
     */
    let cancelado = false;
    // En un objeto y no en una variable suelta porque se asigna dentro de la
    // función asíncrona y se lee en la limpieza del efecto.
    const menu: { boton: HTMLElement | null } = { boton: null };

    if (paso.prepara?.length) {
      void (async () => {
        for (const clic of paso.prepara!) {
          if (cancelado) return;
          // Una lista anidada son ALTERNATIVAS del mismo clic, no pasos
          // sucesivos: se pulsa la primera que exista y se deja el resto. Sin
          // esta distinción, un paso que solo quería abrir una carpeta con
          // reserva acababa abriendo las dos, una detrás de otra.
          for (const sel of Array.isArray(clic) ? clic : [clic]) {
            if (sel.startsWith(MENU_CON)) {
              menu.boton = await abrirMenuCon(sel.slice(MENU_CON.length));
              break;
            }
            const el = buscarElemento(sel);
            if (el) { el.click(); break; }
          }
          await new Promise((r) => setTimeout(r, 550));
        }
      })();
    }

    // Se compara antes de guardar: `localizar` devuelve un objeto nuevo cada
    // vez, así que asignarlo sin más provocaría un render en cada evento de
    // scroll y la tarjeta nunca llegaría a quedarse quieta.
    const medir = () =>
      setFoco((previo) => {
        const nuevo = localizar(paso);
        if (previo === nuevo) return previo;
        if (previo && nuevo &&
            previo.top === nuevo.top && previo.left === nuevo.left &&
            previo.width === nuevo.width && previo.height === nuevo.height) {
          return previo;
        }
        return nuevo;
      });
    medir();
    // Se remide en bucle durante un rato en lugar de una sola vez: tras pulsar
    // una carpeta el panel nuevo tarda en montarse, y una única medición a los
    // 300 ms llegaba antes de que el botón + existiera. La ventana se alarga
    // según cuántos clics encadenados haya —cada uno añade su pausa— y bastante
    // más si hay que abrir un menú, porque ahí se prueban varios botones.
    const nClics = paso.prepara?.length ?? 0;
    const abreMenu = (paso.prepara ?? []).flat().some((s) => s.startsWith(MENU_CON));
    const duracion = nClics ? 2200 + nClics * 700 + (abreMenu ? 5000 : 0) : 400;
    const bucle = setInterval(medir, 200);
    const fin = setTimeout(() => clearInterval(bucle), duracion);

    window.addEventListener('resize', medir);
    window.addEventListener('scroll', medir, true);
    return () => {
      cancelado = true;
      clearInterval(bucle);
      clearTimeout(fin);
      // Cierra el menú que este paso hubiera abierto. Sin esto se quedaba
      // desplegado al avanzar o al cerrar el tutorial.
      menu.boton?.click();
      window.removeEventListener('resize', medir);
      window.removeEventListener('scroll', medir, true);
    };
  }, [abierto, paso]);

  const cerrar = useCallback(() => {
    setAbierto(false);
    localStorage.setItem(CLAVE_VISTO, '1');
  }, []);

  const siguiente = useCallback(() => {
    setIndice((i) => {
      if (i >= PASOS.length - 1) { cerrar(); return i; }
      return i + 1;
    });
  }, [cerrar]);

  const anterior = useCallback(() => setIndice((i) => Math.max(0, i - 1)), []);

  // Navegación con teclado: Escape sale, flechas y Enter avanzan.
  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); cerrar(); }
      else if (e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); siguiente(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); anterior(); }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [abierto, cerrar, siguiente, anterior]);

  useEffect(() => { tarjetaRef.current?.focus(); }, [indice, abierto]);

  /**
   * Corrige la posición con la altura REAL de la tarjeta.
   *
   * El cálculo previo usa una altura estimada porque hay que decidir dónde
   * ponerla antes de pintarla. Pero los pasos con más texto miden bastante más,
   * y con la estimación corta se salían por abajo. Aquí ya existe en el DOM, se
   * mide y se ajusta antes de que el navegador pinte, así que no se ve saltar.
   */
  useEffect(() => {
    const card = tarjetaRef.current;
    if (!abierto || !card) return;

    const ajustar = () => {
      const r = card.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let top = r.top;
      let left = r.left;

      if (r.bottom > vh - 12) top = Math.max(12, vh - r.height - 12);
      if (top < 12) top = 12;
      if (r.right > vw - 12) left = Math.max(12, vw - r.width - 12);
      if (left < 12) left = 12;

      // Recolocar por el borde puede devolver la tarjeta encima del recuadro
      // resaltado, que es justo lo que hay que evitar: si se solapa, se aparta
      // al lado con más espacio.
      if (foco) {
        const choca =
          left < foco.left + foco.width + 4 && left + r.width > foco.left - 4 &&
          top < foco.top + foco.height + 4 && top + r.height > foco.top - 4;

        if (choca) {
          const espacio = {
            izq: foco.left,
            der: vw - (foco.left + foco.width),
            arr: foco.top,
            aba: vh - (foco.top + foco.height),
          };
          const mejor = (Object.keys(espacio) as (keyof typeof espacio)[])
            .sort((a, z) => espacio[z] - espacio[a])[0];

          if (mejor === 'izq') left = Math.max(12, foco.left - r.width - 12);
          else if (mejor === 'der') left = Math.min(vw - r.width - 12, foco.left + foco.width + 12);
          else if (mejor === 'arr') top = Math.max(12, foco.top - r.height - 12);
          else top = Math.min(vh - r.height - 12, foco.top + foco.height + 12);
        }
      }

      if (Math.abs(top - r.top) > 0.5) card.style.top = `${top}px`;
      if (Math.abs(left - r.left) > 0.5) card.style.left = `${left}px`;
    };

    ajustar();
    window.addEventListener('resize', ajustar);
    return () => window.removeEventListener('resize', ajustar);
  }, [abierto, indice, foco]);

  if (!enStudio || !abierto || !paso) return null;

  const MARGEN = 8;
  const hayFoco = foco !== null;

  /**
   * Coloca la tarjeta sin que se salga nunca de la pantalla.
   *
   * Se prueba debajo, encima, a la derecha y a la izquierda, en ese orden. El
   * caso que obliga a los laterales es un panel a altura completa —como la
   * lista de contenido—: no cabe ni encima ni debajo, y colocarla ahí empujaba
   * la tarjeta fuera del borde superior.
   *
   * Al final se recorta a los límites de la ventana, para que ningún cálculo
   * pueda dejarla inaccesible.
   */
  const ANCHO = 380;
  const ALTO_EST = 300;
  const HUECO = 20;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  /**
   * Elige dónde poner la tarjeta SIN taparla contra lo que está resaltando.
   *
   * Es el punto clave: colocarla encima del foco hace inútil el resaltado,
   * porque el usuario no puede ver aquello de lo que le estamos hablando. Pasaba
   * con el panel de documento —que ocupa media pantalla— y con el botón de
   * salir, que quedaba oculto tras la propia tarjeta.
   *
   * Se prueban los cuatro lados y se descarta el que se solape o se salga. Si
   * ninguno vale, se usa el lado con más espacio libre aunque quede justo.
   */
  const { top: posTop, left: posLeft } = (() => {
    const centrado = { top: vh / 2 - ALTO_EST / 2, left: vw / 2 - ANCHO / 2 };
    if (!hayFoco) return centrado;

    const cx = foco.left + foco.width / 2 - ANCHO / 2;
    const cy = foco.top + foco.height / 2 - ALTO_EST / 2;

    const porLado = {
      abajo:     { top: foco.top + foco.height + HUECO, left: cx, hueco: vh - (foco.top + foco.height) },
      arriba:    { top: foco.top - HUECO - ALTO_EST,    left: cx, hueco: foco.top },
      derecha:   { top: cy, left: foco.left + foco.width + HUECO, hueco: vw - (foco.left + foco.width) },
      izquierda: { top: cy, left: foco.left - HUECO - ANCHO,      hueco: foco.left },
    };

    // El lado pedido por el paso va primero; el resto queda como alternativa
    // por si no cabe.
    const orden: (keyof typeof porLado)[] = paso.lado
      ? [paso.lado, ...(['abajo', 'arriba', 'derecha', 'izquierda'] as const).filter((l) => l !== paso.lado)]
      : ['abajo', 'arriba', 'derecha', 'izquierda'];

    const opciones = orden.map((l) => porLado[l]);

    const cabe = (o: { top: number; left: number }) => {
      const t = Math.max(12, Math.min(o.top, vh - ALTO_EST - 12));
      const l = Math.max(12, Math.min(o.left, vw - ANCHO - 12));
      if (o.top < 0 || o.top + ALTO_EST > vh) return false;
      if (o.left < 0 || o.left + ANCHO > vw) return false;
      // Sin solape con el recuadro resaltado, con algo de margen.
      const seSolapa =
        l < foco.left + foco.width + 4 && l + ANCHO > foco.left - 4 &&
        t < foco.top + foco.height + 4 && t + ALTO_EST > foco.top - 4;
      return !seSolapa;
    };

    return opciones.find(cabe)
      ?? [...opciones].sort((a, z) => z.hueco - a.hueco)[0]
      ?? centrado;
  })();

  const estiloTarjeta: React.CSSProperties = {
    position: 'fixed',
    top: Math.min(Math.max(12, posTop), Math.max(12, vh - ALTO_EST - 12)),
    left: Math.min(Math.max(12, posLeft), Math.max(12, vw - ANCHO - 12)),
    width: ANCHO,
    maxHeight: vh - 24,
    overflowY: 'auto',
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100000 }} role="dialog" aria-modal="true" aria-label="Tutorial del panel">

      {hayFoco ? (
        /* El oscurecido se consigue con una sombra enorme alrededor del recuadro
           en vez de recortar el fondo: así el "agujero" funciona en cualquier
           navegador y deja ver el elemento real por debajo. */
        <div
          style={{
            position: 'fixed',
            top: foco.top - MARGEN,
            left: foco.left - MARGEN,
            width: foco.width + MARGEN * 2,
            height: foco.height + MARGEN * 2,
            borderRadius: 12,
            boxShadow: '0 0 0 9999px rgba(6,13,26,0.82)',
            border: '2px solid #1B67E8',
            pointerEvents: 'none',
            transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      ) : (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(6,13,26,0.82)' }} />
      )}

      {/* Capta los clics fuera de la tarjeta para que no lleguen al Studio */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1 }} onClick={cerrar} />

      <div
        ref={tarjetaRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{
          ...estiloTarjeta,
          zIndex: 2,
          background: '#0f1629',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 16,
          padding: '22px 24px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.45)',
          color: '#e2e8f0',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          outline: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b' }}>
            Paso {indice + 1} de {PASOS.length}
          </span>
          <button
            onClick={cerrar}
            aria-label="Cerrar tutorial"
            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 20, lineHeight: 1, padding: 4 }}
          >
            ×
          </button>
        </div>

        <h2 style={{ margin: '0 0 10px', fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
          {paso.titulo}
        </h2>

        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: '#cbd5e1', whiteSpace: 'pre-line' }}>
          {paso.cuerpo}
        </p>

        {paso.tip && (
          <p style={{
            margin: '14px 0 0', padding: '10px 12px', fontSize: 12.5, lineHeight: 1.55,
            color: '#bfdbfe', background: 'rgba(27,103,232,0.12)',
            borderLeft: '3px solid #1B67E8', borderRadius: '0 8px 8px 0',
          }}>
            {paso.tip}
          </p>
        )}

        {/* Puntos de progreso */}
        <div style={{ display: 'flex', gap: 5, margin: '18px 0 14px' }}>
          {PASOS.map((_, i) => (
            <span key={i} style={{
              height: 3, flex: 1, borderRadius: 2,
              background: i <= indice ? '#1B67E8' : 'rgba(255,255,255,0.12)',
              transition: 'background 0.25s',
            }} />
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={cerrar}
            style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 12.5, cursor: 'pointer', padding: '8px 0' }}
          >
            Saltar
          </button>
          <div style={{ flex: 1 }} />
          {indice > 0 && (
            <button
              onClick={anterior}
              style={{
                padding: '9px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', color: '#cbd5e1',
              }}
            >
              Atrás
            </button>
          )}
          <button
            onClick={siguiente}
            style={{
              padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer',
              background: '#1B67E8', border: 'none', color: '#fff',
              boxShadow: '0 4px 16px rgba(27,103,232,0.35)',
            }}
          >
            {indice === PASOS.length - 1 ? 'Entendido' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  );
}
