import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap'
});

const devanagari = Noto_Sans_Devanagari({
  variable: '--font-devanagari',
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Jivhala ❤️ — छोट्या छोट्या गोष्टींची काळजी',
  description: 'Someone who remembers the little things. Warm caring reminders for meals, water, rest, and your everyday well-being.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Jivhala'
  },
  icons: {
    icon: '/icons/icon-192.svg',
    apple: '/icons/icon-192.svg'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#FFF9F5'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr" className={`${jakarta.variable} ${devanagari.variable} h-full antialiased`}>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FFF9F5] dark:bg-[#1B1716] text-[#292525] dark:text-[#F5EFEB]">
        <AppProvider>
          <div className="mobile-frame flex flex-col bg-[#FFF9F5] dark:bg-[#1B1716]">
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
