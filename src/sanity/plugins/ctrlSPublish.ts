import { useEffect } from 'react';
import { useDocumentOperation } from 'sanity';
import type { DocumentActionComponent } from 'sanity';

const CtrlSPublishAction: DocumentActionComponent = ({ id, type }) => {
  const { publish } = useDocumentOperation(id, type);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (!publish.disabled) publish.execute();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [publish]);

  return null;
};

export default CtrlSPublishAction;
