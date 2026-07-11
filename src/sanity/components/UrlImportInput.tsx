import { useState } from 'react';
import { useFormValue, useDocumentOperation } from 'sanity';
import type { StringInputProps } from 'sanity';

export function UrlImportInput(props: StringInputProps) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const rawId = useFormValue(['_id']) as string | undefined;
  const docType = useFormValue(['_type']) as string;
  const docId = rawId?.replace(/^drafts\./, '') ?? '';
  const ops = useDocumentOperation(docId, docType);

  const handleImport = async () => {
    const url = props.value;
    if (!url) return;
    setLoading(true);
    setMsg('');
    try {
      const res = await fetch(`/api/fetch-og?url=${encodeURIComponent(url)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const patches: Array<{ set: Record<string, unknown> }> = [];
      if (data.title) patches.push({ set: { title: data.title } });
      if (data.excerpt) patches.push({ set: { excerpt: data.excerpt } });
      if (data.imagenUrl) patches.push({ set: { imagenUrl: data.imagenUrl } });
      if (data.date) patches.push({ set: { date: data.date } });
      if (patches.length) ops.patch.execute(patches);

      setMsg('✅ Datos importados correctamente');
    } catch {
      setMsg('❌ No se pudo obtener la información. Verifica que la URL sea pública.');
    } finally {
      setLoading(false);
    }
  };

  const hasUrl = Boolean(props.value);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {props.renderDefault(props)}
      <button
        type="button"
        onClick={handleImport}
        disabled={!hasUrl || loading}
        style={{
          alignSelf: 'flex-start',
          padding: '8px 18px',
          background: hasUrl && !loading ? '#2563eb' : '#94a3b8',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          cursor: hasUrl && !loading ? 'pointer' : 'not-allowed',
          fontSize: 13,
          fontWeight: 600,
          transition: 'background 0.15s',
        }}
      >
        {loading ? '⏳ Importando…' : '⬇️ Importar datos desde esta URL'}
      </button>
      {msg && (
        <p style={{ margin: 0, fontSize: 13, color: msg.startsWith('✅') ? '#16a34a' : '#dc2626' }}>
          {msg}
        </p>
      )}
    </div>
  );
}
