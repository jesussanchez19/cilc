import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/shared/Header';
import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import Breadcrumb from '@/components/shared/Breadcrumb';

import { GA_ID } from '@/lib/analytics';
 
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cilc.mx';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
  title: {
    default: 'CILC | Canadian & International Language Centers',
    template: '%s | CILC',
  },
  description:
    'Más de 23 años ayudando a estudiantes mexicanos a estudiar en Canadá, Estados Unidos, Inglaterra e Irlanda. Asesoría personalizada en programas de idiomas, Au Pair, años académicos y más.',
  keywords:
    'estudios en el extranjero, programas de idiomas, Au Pair, años académicos, estudia y trabaja, Canadá, Estados Unidos, Inglaterra, Irlanda, CILC',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: BASE_URL,
    siteName: 'CILC - Canadian & International Language Centers',
    title: 'CILC | Canadian & International Language Centers',
    description:
      'Más de 23 años ayudando a estudiantes mexicanos a estudiar en el extranjero. Idiomas, Au Pair, Años Académicos y más.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CILC - Estudios en el Extranjero',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CILC | Canadian & International Language Centers',
    description:
      'Más de 23 años ayudando a estudiantes mexicanos a estudiar en el extranjero.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"

      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white">
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        <Header />
        <Navigation />
        <Breadcrumb />
        <main className="flex-1">{children}</main>
        <Footer />

        <WhatsAppButton />
      </body>
    </html>
  );
}
