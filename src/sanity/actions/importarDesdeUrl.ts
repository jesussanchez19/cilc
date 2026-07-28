import { useState } from 'react';
import { useFormValue, useDocumentOperation } from 'sanity';
import type { DocumentActionProps } from 'sanity';

export function ImportarDesdeUrlAction(props: DocumentActionProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // `props.patch` no existe en DocumentActionProps: las operaciones sobre el
  // documento se obtienen con este hook, que debe llamarse en el cuerpo de la
  // acción y no dentro de onHandle.
  const { patch } = useDocumentOperation(props.id, props.type);

  const tipo = useFormValue(['tipo']) as string | undefined;
  const urlExterna = useFormValue(['urlExterna']) as string | undefined;

  const isExterno = tipo === 'externo';
  const hasUrl = Boolean(urlExterna);

  return {
    label: loading ? 'Importando…' : '⬇️ Importar datos',
    disabled: !isExterno || !hasUrl || loading,
    title: !isExterno
      ? 'Solo disponible para artículos tipo "Enlace externo"'
      : !hasUrl
        ? 'Escribe primero la URL de la publicación'
        : 'Importar título, resumen, imagen y fecha desde la URL',

    dialog: errorMsg
      ? {
          type: 'confirm' as const,
          tone: 'critical' as const,
          message: errorMsg,
          onConfirm: () => setErrorMsg(null),
          onCancel: () => setErrorMsg(null),
        }
      : undefined,

    onHandle: async () => {
      if (!urlExterna) return;
      setLoading(true);
      setErrorMsg(null);
      try {
        const res = await fetch(`/api/fetch-og?url=${encodeURIComponent(urlExterna)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const patches: Array<{ set: Record<string, unknown> }> = [];
        if (data.title) patches.push({ set: { title: data.title } });
        if (data.excerpt) patches.push({ set: { excerpt: data.excerpt } });
        if (data.imagenUrl) patches.push({ set: { imagenUrl: data.imagenUrl } });
        if (data.date) patches.push({ set: { date: data.date } });
        if (patches.length) patch.execute(patches);

        props.onComplete();
      } catch {
        setErrorMsg('No se pudieron importar los datos. Verifica que la URL sea pública e intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    },
  };
}
