import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat } from 'next/font/google';

import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { getContent } from '@/lib/content';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

const c = getContent();

export const metadata: Metadata = {
  metadataBase: new URL(c.site.url),
  title: {
    default: c.site.title,
    template: `%s — ${c.site.name}`,
  },
  description: c.site.description,
  openGraph: {
    type: 'website',
    locale: 'fr_CH',
    url: c.site.url,
    title: c.site.title,
    description: c.site.description,
    siteName: c.site.name,
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: `${c.site.name} — ${c.footer.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: c.site.title,
    description: c.site.description,
    images: ['/og.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={c.locale} className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-blanc text-noir antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
