import IdleRefresh from '@/components/admin/IdleRefresh';

export const metadata = { title: 'CILC Admin' };

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IdleRefresh />
      {children}
    </>
  );
}
