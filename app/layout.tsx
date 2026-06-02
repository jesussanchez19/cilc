import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/shared/Header';
import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CILC | Canadian & International Language Centers',
  description:
    'Más de 23 años ayudando a estudiantes mexicanos a estudiar en Canadá, Estados Unidos, Inglaterra e Irlanda. Asesoría personalizada en programas de idiomas, Au Pair, años académicos y más.',
  keywords:
    'estudios en el extranjero, programas de idiomas, Au Pair, años académicos, estudia y trabaja, Canadá, Estados Unidos, Inglaterra, Irlanda, CILC',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      // scroll-smooth activa el desplazamiento suave nativo del navegador
      // cuando se usa <a href="#seccion"> o router.push('#seccion')
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <Header />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Botón WhatsApp flotante — visible en todas las páginas */}
        <WhatsAppButton />
      </body>
    </html>
  );
}
