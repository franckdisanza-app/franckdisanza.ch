import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat } from 'next/font/google';

import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { getContent, resolveLocale } from '@/lib/content';
import { LANGUAGES, LOCALES } from '@/lib/i18n';

import '../globals.css';

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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Une version statique par langue ; toute autre valeur de `[locale]` est une 404.
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const c = getContent(locale);

  return {
    metadataBase: new URL(c.site.url),
    title: {
      default: c.site.title,
      template: `%s — ${c.site.name}`,
    },
    description: c.site.description,
    openGraph: {
      type: 'website',
      locale: LANGUAGES[locale].ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => LANGUAGES[l].ogLocale),
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
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
};

export default async function RootLayout({ children, params }: Props) {
  const locale = await resolveLocale(params);
  const c = getContent(locale);

  return (
    <html lang={locale} className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-noir text-noir antialiased">
        <Nav locale={locale} nav={c.nav} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
