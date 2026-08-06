import { useCallback, useMemo } from 'react';
import type { StringInputProps } from 'sanity';
import { useFormValue, useDocumentOperation } from 'sanity';
import { direccionDesdeUrl } from '@/lib/ubicacion';

/**
 * Campo de la URL de Google Maps, con un botón que copia la dirección al campo
 * "Dirección de la oficina".
 *
 * Sin esto había que teclear la dirección dos veces y era fácil que acabaran
 * diciendo cosas distintas — que es justo lo que pasaba: el pie del sitio
 * mostraba una dirección y la página de contacto otra.
 *
 * El botón escribe en `direccion` en lugar de que la página lo deduzca sola, a
 * propósito: así queda a la vista lo que se va a publicar y se puede corregir
 * antes de guardar. Google devuelve el nombre del negocio pegado a la calle
 * ("CILC-ESTUDIA INTERNACIONAL, Av. Insurgentes Sur…"), y eso casi siempre hay
 * que retocarlo a mano.
 */
export function UrlMapaInput(props: StringInputProps) {
  const rawId = useFormValue(['_id']) as string | undefined;
  const docId = (rawId ?? '').replace(/^drafts\./, '');
  const direccionActual = useFormValue(['direccion']) as string | undefined;
  const { patch } = useDocumentOperation(docId, 'configuracion');

  const propuesta = useMemo(() => direccionDesdeUrl(props.value), [props.value]);

  const copiar = useCallback(() => {
    if (!propuesta) return;
    // Google separa por comas; una línea por parte se lee mejor en el pie.
    patch.execute([{ set: { direccion: propuesta.split(/,\s*/).join('\n') } }]);
  }, [propuesta, patch]);

  const yaCoincide =
    !!propuesta && (direccionActual ?? '').replace(/\s+/g, ' ').trim() ===
      propuesta.split(/,\s*/).join(' ').replace(/\s+/g, ' ').trim();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {props.renderDefault(props)}

      {propuesta && (
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
            padding: '10px 12px', borderRadius: 6, background: '#f1f5fe',
            border: '1px solid #dbeafe',
          }}
        >
          <div style={{ flex: 1, minWidth: 220 }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Dirección según este mapa
            </p>
            <p style={{ margin: '2px 0 0', fontSize: 13, color: '#0f172a' }}>{propuesta}</p>
          </div>
          <button
            type="button"
            onClick={copiar}
            disabled={yaCoincide}
            style={{
              flexShrink: 0,
              padding: '7px 14px',
              background: yaCoincide ? '#16a34a' : '#1B67E8',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              cursor: yaCoincide ? 'default' : 'pointer',
              fontSize: 13,
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            {yaCoincide ? '✅ Ya coincide' : '↑ Usar esta dirección'}
          </button>
        </div>
      )}
    </div>
  );
}
