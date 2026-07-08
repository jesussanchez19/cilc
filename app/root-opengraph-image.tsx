import { ImageResponse } from 'next/og';

// Tamaño exacto requerido por Open Graph
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #1D4ED8 0%, #1e40af 60%, #1e3a8a 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Círculos decorativos */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        }} />

        {/* Logo texto (fallback sin imagen) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '12px',
            background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px',
          }}>
            🌍
          </div>
          <span style={{ color: 'white', fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>
            CILC
          </span>
        </div>

        {/* Título */}
        <h1 style={{
          color: 'white', fontSize: '64px', fontWeight: '800',
          textAlign: 'center', margin: '0 0 20px', lineHeight: '1.1',
          maxWidth: '900px',
        }}>
          Estudios en el Extranjero que Transforman tu Futuro
        </h1>

        {/* Subtítulo */}
        <p style={{
          color: 'rgba(255,255,255,0.8)', fontSize: '28px',
          textAlign: 'center', margin: '0 0 40px', maxWidth: '700px',
        }}>
          Asesoría personalizada · Sin costo · +23 años de experiencia
        </p>

        {/* CTA pill */}
        <div style={{
          background: 'white', color: '#1D4ED8',
          padding: '14px 36px', borderRadius: '50px',
          fontSize: '22px', fontWeight: '700',
        }}>
          cilc.com.mx
        </div>
      </div>
    ),
    { ...size }
  );
}
