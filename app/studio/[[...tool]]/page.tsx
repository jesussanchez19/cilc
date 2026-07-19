'use client';

import { useEffect } from 'react';
import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export default function StudioPage() {
  useEffect(() => {
    document.body.classList.add('studio-page');
    return () => document.body.classList.remove('studio-page');
  }, []);

  return <NextStudio config={config} />;
}
