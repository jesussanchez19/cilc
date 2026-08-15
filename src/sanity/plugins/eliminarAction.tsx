import { useState } from 'react';
import type { DocumentActionComponent } from 'sanity';
import { usePaneRouter } from 'sanity/structure';
import { sileo } from 'sileo';

/**
 * Acción de eliminar del Studio.
 *
 * Al borrar hacía `window.location.href = '/studio'`, una navegación completa
 * del navegador: la pantalla se quedaba en blanco, el Studio entero se volvía a
 * cargar y encima aparecías en la raíz, no en la lista donde estabas. Borrar
 * varios documentos seguidos era una sucesión de recargas.
 *
 * `closeCurrent()` del router de paneles cierra solo la ficha del documento y
 * te deja en su lista, dentro de la misma sesión de la aplicación. Sin recarga
 * y sin perder el sitio.
 */
const EliminarAction: DocumentActionComponent = ({ id }) => {
  const [showDialog, setShowDialog] = useState(false);
  const { closeCurrent } = usePaneRouter();

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
      // Sin espera: el aviso se queda visible por su cuenta y cerrar de
      // inmediato es justo lo que hace falta cuando se borran varios seguidos.
      closeCurrent();
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
