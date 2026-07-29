import { useCallback, useState } from 'react';
import { useDocumentOperation, useEditState } from 'sanity';
import type { DocumentActionComponent, DocumentActionDescription } from 'sanity';

const GenerarTokenAction: DocumentActionComponent = ({ id, type }) => {
  const { patch } = useDocumentOperation(id, type);
  const editState  = useEditState(id, type);
  const draft      = editState.draft as Record<string, unknown> | null;

  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);

  const hasToken = Boolean(draft?.token);
  const hasLabel = Boolean((draft?.label as string | undefined)?.trim());

  const onHandle = useCallback(() => {
    if (hasToken || !hasLabel || loading) return;
    setLoading(true);

    const token   = crypto.randomUUID();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cilc.vercel.app';

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

    setLoading(false);
    setDone(true);
    setTimeout(() => setDone(false), 4000);
  }, [hasToken, hasLabel, loading, patch]);

  const result: DocumentActionDescription = {
    label:    loading ? 'Generando…' : done ? '✅ Token listo' : '🔗 Generar token',
    disabled: hasToken || !hasLabel || loading,
    title: hasToken
      ? 'Este documento ya tiene un token generado'
      : !hasLabel
        ? 'Escribe primero el nombre del alumno'
        : 'Genera el token y la URL de un solo uso',
    onHandle,
  };

  return result;
};

export default GenerarTokenAction;
