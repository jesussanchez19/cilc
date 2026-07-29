import { Suspense } from 'react';
import LoginForm from './LoginForm';

export const metadata = { title: 'Acceso al Studio | CILC' };

/**
 * El formulario lee `?from=` con useSearchParams, que obliga a un límite de
 * Suspense: sin él la generación estática falla, porque Next no puede
 * pre-renderizar un componente que depende de la URL en el cliente.
 */
export default function StudioLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
