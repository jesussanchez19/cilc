'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function StudioExitButton() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const isStudio = pathname.startsWith('/studio') &&
    pathname !== '/studio/login' &&
    pathname !== '/studio/reset';

  if (!isStudio) return null;

  const handleExit = async () => {
    setLoading(true);
    await fetch('/api/studio-auth', { method: 'DELETE' });
    window.location.href = '/';
  };

  return (
    <button
      onClick={handleExit}
      disabled={loading}
      title="Salir del Studio"
      style={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 16px',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(15,23,42,0.85)',
        backdropFilter: 'blur(12px)',
        color: '#e2e8f0',
        fontSize: 13,
        fontWeight: 600,
        cursor: loading ? 'wait' : 'pointer',
        boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
        transition: 'opacity 0.15s',
        opacity: loading ? 0.6 : 1,
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
      </svg>
      {loading ? 'Saliendo…' : 'Salir del Studio'}
    </button>
  );
}
