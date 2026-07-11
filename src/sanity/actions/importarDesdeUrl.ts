import { useState } from 'react';
import type { DocumentActionProps } from 'sanity';

export function ImportarDesdeUrlAction(props: DocumentActionProps) {
  const [loading, setLoading] = useState(false);
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);

  const doc = props.draft ?? props.published;
  const tipo = (doc as Record<string, unknown>)?.tipo;
  const urlExterna = (doc as Record<string, unknown>)?.urlExterna as string | undefined;

  if (tipo !== 'externo') return null;

  return {
    label: loading ? 'Importando…' : '⬇️ Importar datos',
    disabled: !urlExterna || loading,
    title: urlExterna
      ? 'Importar título, resumen, imagen y fecha desde la URL'
      : 'Escribe primero la URL externa',
    dialog: dialogMessage
      ? {
          type: 'confirm' as const,
          tone: 'critical' as const,
          message: dialogMessage,
          onConfirm: () => setDialogMessage(null),
          onCancel: () => setDialogMessage(null),
        }
      : undefined,
    onHandle: async () => {
      if (!urlExterna) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/fetch-og?url=${encodeURIComponent(urlExterna)}`);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();

        const patches: Array<{ set: Record<string, unknown> }> = [];
        if (data.title) patches.push({ set: { title: data.title } });
        if (data.excerpt) patches.push({ set: { excerpt: data.excerpt } });
        if (data.imagenUrl) patches.push({ set: { imagenUrl: data.imagenUrl } });
        if (data.date) patches.push({ set: { date: data.date } });

        if (patches.length) props.patch.execute(patches);
        props.onComplete();
      } catch {
        setDialogMessage('No se pudieron importar los datos. Verifica que la URL sea pública e intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    },
  };
}
