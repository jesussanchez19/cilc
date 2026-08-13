import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import 'sileo/styles.css';
import Header from '@/components/shared/Header';
import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import StudioExitButton from '@/components/shared/StudioExitButton';
import StudioTour from '@/components/studio/StudioTour';
import StudioTourButton from '@/components/studio/StudioTourButton';
import Breadcrumb from '@/components/shared/Breadcrumb';
import SiteChrome from '@/components/shared/SiteChrome';
import { Toaster } from 'sileo';

import { GA_ID } from '@/lib/analytics';
import { organizationSchema } from '@/lib/seo/schemas';
import { getContactInfo, getSearchIndex, getCertificaciones } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
 
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

import { SITE_URL as BASE_URL } from '@/lib/siteUrl';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  /**
   * Cada página se declara canónica de sí misma.
   *
   * Hace falta porque el sitio va a existir en dos direcciones a la vez —el
   * dominio propio y la de Vercel— y sin canónica Google puede indexar las dos
   * y hacerlas competir entre sí por el mismo contenido.
   *
   * El valor es './' y no '/' a propósito: '/' apuntaría TODAS las páginas a la
   * portada, que es peor que no tener canónica. La forma relativa se resuelve
   * contra la ruta actual.
   */
  alternates: {
    canonical: './',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
  title: {
    default: 'CILC | Canadian & International Language Centers',
    template: '%s | CILC',
  },
  description:
    'Más de 23 años ayudando a estudiantes mexicanos a estudiar en el extranjero. Programas en más de 16 destinos: idiomas, Au Pair, años académicos, estudia y trabaja, y más.',
  keywords:
    'estudios en el extranjero, programas de idiomas, Au Pair, años académicos, estudia y trabaja, Canadá, Estados Unidos, Reino Unido, Irlanda, Australia, Alemania, Japón, CILC',
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Las dos consultas en paralelo: son independientes entre sí.
  const [contact, searchIndex, certificacionesSanity] = await Promise.all([
    getContactInfo(),
    getSearchIndex(),
    getCertificaciones(),
  ]);
  const mainPhone = (contact.telefonos?.find((p) => p.esPrincipal) ?? contact.telefonos?.[0])?.wa;

  /**
   * Las imágenes se resuelven a URL aquí, en el servidor. El componente que las
   * rota es de cliente, y pasarle el objeto de Sanity obligaría a arrastrar el
   * constructor de URLs al navegador para nada.
   */
  const certificaciones = certificacionesSanity.map((c) => ({
    _id: c._id,
    nombre: c.nombre,
    url: c.url,
    imagenUrl: urlFor(c.imagen).width(192).height(192).fit('max').url(),
  }));
  return (
    <html
      lang="es"

      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        {/* Red de seguridad sin JS. Sustituye a los antiguos setTimeout de
            AnimateIn/LazySection, que eran inútiles: si el JS no corre, el
            temporizador tampoco. `!important` gana a los estilos inline. */}
        <noscript>
          <style>{`.reveal,.reveal-blur,.reveal-left,.reveal-right,.reveal-scale,.lazy-section{opacity:1!important;transform:none!important;filter:none!important;transition:none!important}`}</style>
        </noscript>
      </head>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              organizationSchema({
                direccion: contact.direccion,
                // El principal, en el formato internacional que espera schema.org.
                telefono: mainPhone ? `+${mainPhone}` : undefined,
              }),
            ),
          }}
        />
        <SiteChrome>
          <Header searchIndex={searchIndex} />
          <Suspense fallback={null}><Navigation /></Suspense>
          <Breadcrumb />
        </SiteChrome>

        <main className="flex-1">{children}</main>

        <SiteChrome>
          <Footer
            contactEmail={contact.emailAdmin}
            phones={contact.telefonos}
            mainPhone={mainPhone}
            address={contact.direccion}
            certificaciones={certificaciones}
            socialLinks={{
              facebook:  contact.facebook,
              instagram: contact.instagram,
              linkedin:  contact.linkedin,
              youtube:   contact.youtube,
              tiktok:    contact.tiktok,
            }}
          />
        </SiteChrome>

        <WhatsAppButton />
        <StudioExitButton />
        <StudioTourButton />
        <StudioTour />
        <Toaster position="bottom-right" theme="system" />
      </body>
    </html>
  );
}
