'use client';
import { useCallback, useState } from 'react';
import type { StringInputProps } from 'sanity';
import { useFormValue, useDocumentOperation } from 'sanity';

export function TokenGeneratorInput(props: StringInputProps) {
  const rawId        = useFormValue(['_id']) as string | undefined;
  const docId        = (rawId ?? '').replace(/^drafts\./, '');
  const existingToken = useFormValue(['token']) as string | undefined;
  const { patch, publish } = useDocumentOperation(docId, 'tokenTestimonio');
  const [done, setDone] = useState(false);

  const generar = useCallback(() => {
    const nombre = (props.value ?? '').trim();
    if (existingToken || !nombre) return;

    const token   = crypto.randomUUID();
    const siteUrl = window.location.origin;

    patch.execute([
      {
        set: {
          token,
          url:      `${siteUrl}/dar-testimonio?acceso=${token}`,
          creadoEn: new Date().toISOString(),
          usado:    false,
        },
      },
    ]);
    // Pequeño delay para que el patch se refleje en el draft antes de publicar
    setTimeout(() => publish.execute(), 80);
    setDone(true);
  }, [existingToken, props.value, patch]);

  const ready    = !!existingToken || done;
  const disabled = ready || !(props.value ?? '').trim();

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <div style={{ flex: 1 }}>
        {props.renderDefault(props)}
      </div>
      <button
        type="button"
        onClick={generar}
        disabled={disabled}
        style={{
          flexShrink: 0,
          padding: '7px 16px',
          background: ready ? '#16a34a' : '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          cursor: disabled ? 'default' : 'pointer',
          fontSize: 13,
          fontWeight: 600,
          whiteSpace: 'nowrap',
          opacity: disabled && !ready ? 0.45 : 1,
          transition: 'background 0.2s',
        }}
      >
        {ready ? '✅ Generado' : '🔗 Generar token'}
      </button>
    </div>
  );
}
