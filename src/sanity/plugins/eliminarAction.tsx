import { useState } from 'react';
import type { DocumentActionComponent } from 'sanity';
import { sileo } from 'sileo';

const EliminarAction: DocumentActionComponent = ({ id }) => {
  const [showDialog, setShowDialog] = useState(false);

  const doDelete = async () => {
    setShowDialog(false);
    try {
      const res = await fetch('/api/admin/delete-doc', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: 'Error al borrar' }));
        throw new Error(error);
      }

      sileo.success({
        title: 'Documento eliminado',
        description: 'El registro fue borrado correctamente.',
        fill: '#1B67E8',
      });
      setTimeout(() => { window.location.href = '/studio'; }, 800);
    } catch (err: unknown) {
      sileo.error({
        title: 'Error al eliminar',
        description: err instanceof Error ? err.message : 'No se pudo borrar el documento.',
        fill: '#E31E24',
      });
    }
  };

  return {
    label: 'Eliminar',
    tone: 'critical',
    group: ['paneActions'] as never,
    onHandle() { setShowDialog(true); },
    dialog: showDialog
      ? {
          type: 'confirm',
          tone: 'critical',
          message: '¿Eliminar este documento? Esta acción no se puede deshacer.',
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar',
          onConfirm: doDelete,
          onCancel: () => setShowDialog(false),
        }
      : undefined,
  };
};

EliminarAction.action = 'delete';
export default EliminarAction;
