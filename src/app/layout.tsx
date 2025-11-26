import type { Metadata } from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Groupe Saint Martin de Brethencourt - Scoutisme traditionnel',
  description: 'Découvrez le Groupe Saint Martin de Brethencourt, unité scoute française pratiquant le scoutisme traditionnel Europa Scouts. Activités pour enfants de 8 à 22 ans dans le sud des Yvelines.',
  keywords: 'scoutisme, Brethencourt, Yvelines, Europa Scouts, scoutisme traditionnel, enfants, activités, camps',
  authors: [{ name: 'Groupe Saint Martin' }],
  creator: 'Groupe Saint Martin',
  publisher: 'Groupe Saint Martin de Brethencourt',
  openGraph: {
    title: 'Groupe Saint Martin de Brethencourt - Scoutisme traditionnel',
    description: 'Unité scoute française Europa Scouts pour enfants de 8 à 22 ans. Camps, sorties et valeurs éducatives dans le sud des Yvelines.',
    url: 'https://groupsaintmartin.fr',
    siteName: 'Groupe Saint Martin',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Groupe Saint Martin de Brethencourt',
    description: 'Scoutisme traditionnel Europa Scouts - Brethencourt, Yvelines',
    creator: '@groupsaintmartin',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Groupe Saint Martin de Brethencourt",
              "description": "Unité scoute française pratiquant le scoutisme traditionnel Europa Scouts",
              "url": "https://groupsaintmartin.fr",
              "logo": "https://groupsaintmartin.fr/favicon.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Brethencourt",
                "addressRegion": "Île-de-France",
                "addressCountry": "FR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "europa.saintmartin1@gmail.com",
                "telephone": "+33-6-58-36-69-54",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://www.facebook.com/groupsaintmartin"
              ]
            })
          }}
        />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
