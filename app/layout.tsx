import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost, Noto_Serif_Gurmukhi, Pinyon_Script, Tiro_Devanagari_Hindi } from 'next/font/google';
import './globals.css';
import { wedding } from '@/content/wedding';

// Google Fonts via next/font: self-hosted at build, subset, font-display: swap (PRD §4.2).
const display = Cormorant_Garamond({ subsets: ['latin'], weight: ['500', '600'], style: ['normal', 'italic'], variable: '--font-display', display: 'swap' });
const script = Pinyon_Script({ subsets: ['latin'], weight: '400', variable: '--font-script', display: 'swap' });
const body = Jost({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-body', display: 'swap' });
const gurmukhi = Noto_Serif_Gurmukhi({ subsets: ['gurmukhi'], weight: ['400', '500'], variable: '--font-gurmukhi', display: 'swap' });
const devanagari = Tiro_Devanagari_Hindi({ subsets: ['devanagari'], weight: '400', variable: '--font-devanagari', display: 'swap' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: wedding.share.title,
  description: wedding.share.description,
  // A private invite, not a public page (PRD §8).
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: wedding.share.title,
    description: wedding.share.description,
    type: 'website',
    siteName: wedding.siteName,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: wedding.share.title }],
  },
  twitter: { card: 'summary_large_image', title: wedding.share.title, description: wedding.share.description, images: ['/og.png'] },
};

export const viewport: Viewport = {
  themeColor: '#F7F2E8',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${script.variable} ${body.variable} ${gurmukhi.variable} ${devanagari.variable}`}>
      <body>{children}</body>
    </html>
  );
}
