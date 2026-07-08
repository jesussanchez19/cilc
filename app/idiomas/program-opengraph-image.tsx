// ─────────────────────────────────────────────────────────────────────────────
//  OPEN GRAPH IMAGE por página de programa
//
//  Copia este archivo en CADA carpeta de programa:
//    app/idiomas/opengraph-image.tsx
//    app/au-pair/opengraph-image.tsx
//    app/anos-academicos/opengraph-image.tsx
//    app/estudia-trabaja/opengraph-image.tsx
//    app/formacion-corporativa/opengraph-image.tsx
//    app/idiomas-en-linea/opengraph-image.tsx
//
//  En cada uno cambia: PROGRAM_TITLE, PROGRAM_SUBTITLE y PROGRAM_COLOR.
// ─────────────────────────────────────────────────────────────────────────────

import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// ↓↓ Personaliza estos valores por programa ↓↓
const PROGRAM_TITLE    = 'Idiomas en el Extranjero';
const PROGRAM_SUBTITLE = 'Aprende inglés, francés, alemán y más en escuelas acreditadas internacionalmente';
const PROGRAM_EMOJI    = '🗣️';
const PROGRAM_COLOR    = '#7C3AED'; // violet-700 para Idiomas

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Fondo con gradiente del color del programa */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(135deg, ${PROGRAM_COLOR} 0%, #1D4ED8 100%)`,
        }} />

        {/* Círculo decorativo */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }} />

        {/* Contenido */}
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', padding: '70px 80px',
          width: '100%',
        }}>
          {/* Breadcrumb visual */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '20px' }}>CILC</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '20px' }}>›</span>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '20px', fontWeight: '600' }}>
              {PROGRAM_TITLE}
            </span>
          </div>

          {/* Emoji grande */}
          <div style={{ fontSize: '72px', marginBottom: '20px' }}>{PROGRAM_EMOJI}</div>

          {/* Título */}
          <h1 style={{
            color: 'white', fontSize: '68px', fontWeight: '800',
            margin: '0 0 16px', lineHeight: '1.05', maxWidth: '900px',
          }}>
            {PROGRAM_TITLE}
          </h1>

          {/* Subtítulo */}
          <p style={{
            color: 'rgba(255,255,255,0.8)', fontSize: '26px',
            margin: '0 0 40px', maxWidth: '750px', lineHeight: '1.4',
          }}>
            {PROGRAM_SUBTITLE}
          </p>

          {/* Pills de info */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {['Consulta gratuita', 'Sin compromiso', '+23 años de experiencia'].map((tag) => (
              <div key={tag} style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '50px',
                fontSize: '18px',
                fontWeight: '500',
              }}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
