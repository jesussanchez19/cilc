/**
 * Pasa los artículos de `content/blog/*.mdx` al CMS.
 *
 * El blog dejó de leer archivos y ahora consulta Sanity, así que esos tres
 * artículos quedaron escritos pero invisibles: `/blog` salía vacío en el sitio
 * publicado. Esto los sube una sola vez.
 *
 * Usa `createIfNotExists` con un id derivado del nombre del archivo: volver a
 * ejecutarlo no duplica nada ni pisa lo que se haya editado después desde el
 * Studio.
 *
 *   node scripts/migrar-blog-mdx.mjs           # sube lo que falte
 *   node scripts/migrar-blog-mdx.mjs --dry     # solo enseña lo que haría
 *   node scripts/migrar-blog-mdx.mjs --forzar  # reescribe los ya subidos
 */
import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import { readdir, readFile } from 'fs/promises';
import path from 'path';

config({ path: '.env.local' });

const DIRECTORIO = path.join(process.cwd(), 'content', 'blog');
const SOLO_PRUEBA = process.argv.includes('--dry');
/** Reescribe los que ya existen. Pisa lo editado en el Studio: usar con cuidado. */
const FORZAR = process.argv.includes('--forzar');

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token && !SOLO_PRUEBA) {
  console.error('❌ Falta SANITY_API_WRITE_TOKEN en .env.local');
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

let contador = 0;
const clave = () => `k${(contador++).toString(36)}`;

/** Separa el frontmatter YAML del cuerpo. */
function separarFrontmatter(texto) {
  const m = texto.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { meta: {}, cuerpo: texto };
  const meta = {};
  for (const linea of m[1].split(/\r?\n/)) {
    const par = linea.match(/^(\w+):\s*"?(.*?)"?\s*$/);
    if (par) meta[par[1]] = par[2];
  }
  return { meta, cuerpo: m[2] };
}

/**
 * Convierte `**negrita**` en spans de Portable Text.
 *
 * Es el único énfasis que usan los tres artículos; no hay enlaces ni código,
 * así que no merece la pena arrastrar un parser de Markdown entero.
 */
function spans(texto) {
  const partes = texto.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return partes.map((parte) => {
    const negrita = parte.startsWith('**') && parte.endsWith('**');
    return {
      _type: 'span',
      _key: clave(),
      text: negrita ? parte.slice(2, -2) : parte,
      marks: negrita ? ['strong'] : [],
    };
  });
}

const bloque = (texto, extra = {}) => ({
  _type: 'block',
  _key: clave(),
  style: 'normal',
  markDefs: [],
  children: spans(texto),
  ...extra,
});

/** Markdown → Portable Text. Cubre lo que de verdad aparece en estos archivos. */
function aPortableText(cuerpo) {
  const bloques = [];

  for (const parrafo of cuerpo.split(/\r?\n\s*\r?\n/)) {
    const texto = parrafo.trim();
    if (!texto) continue;

    /**
     * Tabla: Portable Text no tiene tablas, así que cada fila pasa a ser un
     * punto de lista "columna1 — columna2". Se pierde la rejilla, no el dato.
     *
     * Se saltan la fila de guiones y también la **cabecera**: convertida en
     * viñeta quedaba un "País — Tiempo promedio de respuesta" al principio de
     * la lista que no dice nada, porque el párrafo anterior ya lo explica.
     */
    if (texto.startsWith('|')) {
      const filas = texto
        .split(/\r?\n/)
        .map((f) => f.split('|').map((c) => c.trim()).filter(Boolean))
        .filter((celdas) => celdas.length >= 2)
        .filter((celdas) => !celdas.every((c) => /^:?-{3,}:?$/.test(c)));

      for (const celdas of filas.slice(1)) {
        bloques.push(bloque(celdas.join(' — '), { listItem: 'bullet', level: 1 }));
      }
      continue;
    }

    for (const linea of texto.split(/\r?\n/)) {
      const l = linea.trim();
      if (!l) continue;

      const encabezado = l.match(/^(#{2,4})\s+(.*)$/);
      if (encabezado) {
        bloques.push(bloque(encabezado[2], { style: `h${encabezado[1].length}` }));
        continue;
      }

      const vineta = l.match(/^[-*]\s+(.*)$/);
      if (vineta) {
        bloques.push(bloque(vineta[1], { listItem: 'bullet', level: 1 }));
        continue;
      }

      const numerada = l.match(/^\d+\.\s+(.*)$/);
      if (numerada) {
        bloques.push(bloque(numerada[1], { listItem: 'number', level: 1 }));
        continue;
      }

      bloques.push(bloque(l));
    }
  }

  return bloques;
}

/** Minutos de lectura, a 200 palabras por minuto. */
const minutosDeLectura = (cuerpo) =>
  Math.max(1, Math.round(cuerpo.split(/\s+/).filter(Boolean).length / 200));

const archivos = (await readdir(DIRECTORIO)).filter((f) => f.endsWith('.mdx'));
console.log(`${archivos.length} artículos en ${DIRECTORIO}\n`);

for (const archivo of archivos) {
  const slug = archivo.replace(/\.mdx$/, '');
  const { meta, cuerpo } = separarFrontmatter(await readFile(path.join(DIRECTORIO, archivo), 'utf-8'));
  const content = aPortableText(cuerpo);

  const doc = {
    _id: `blogPost-${slug}`,
    _type: 'blogPost',
    tipo: 'propio',
    title: meta.title,
    slug: { _type: 'slug', current: slug },
    excerpt: meta.excerpt,
    content,
    date: meta.date,
    category: meta.category,
    readingTime: minutosDeLectura(cuerpo),
    visible: true,
  };

  const encabezados = content.filter((b) => b.style?.startsWith('h')).length;
  const puntos = content.filter((b) => b.listItem).length;
  console.log(`• ${meta.title}`);
  console.log(`  slug ${slug} · ${meta.category} · ${doc.readingTime} min`);
  console.log(`  ${content.length} bloques (${encabezados} encabezados, ${puntos} puntos de lista)`);

  if (SOLO_PRUEBA) { console.log('  (prueba: no se sube)\n'); continue; }

  const guardado = FORZAR
    ? await client.createOrReplace(doc)
    : await client.createIfNotExists(doc);
  console.log(`  ✅ ${guardado._id}${FORZAR ? ' (reescrito)' : ''}\n`);
}

if (!SOLO_PRUEBA) {
  const total = await client.fetch('count(*[_type == "blogPost"])');
  console.log(`artículos en el CMS: ${total}`);
}
