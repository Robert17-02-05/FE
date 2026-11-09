import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Import CSS — order matters!
import '@/assets/styles/variables.css';
import '@/assets/styles/animations.css';
import '@/assets/styles/global.css';

import { Providers } from './providers';

// ── Google Font via next/font ─────────────────────────────────
const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

// ── Default SEO Metadata ──────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'Internery — Part-time Jobs for Students',
    template: '%s | Internery',
  },
  description: 'Internery is a part-time job marketplace connecting students and employers.',
  keywords: ['internery', 'part-time', 'jobs', 'students', 'employer'],
  authors: [{ name: 'Internery Team' }],
  creator: 'Internery',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Internery',
    title: 'Internery',
    description: 'Part-time job marketplace for students.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Internery',
    description: 'Part-time job marketplace for students.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ── Root Layout ───────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
