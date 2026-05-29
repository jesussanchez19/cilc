import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/shared/Header';
import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';

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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <Header />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
