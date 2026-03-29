import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, Fraunces } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Footer from '../components/footer';
import { OfflineBanner } from '@/components/pwa/OfflineBanner';
import { InstallPrompt } from '@/components/pwa/InstallPrompt';
import { UpdateBanner } from '@/components/ui/UpdateBanner';
import ServiceWorkerProvider from '@/components/ServiceWorkerProvider';
import { Providers } from '@/providers/providers';

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "700"],
});

export const metadata: Metadata = {
  title: 'Stellar Uzima — Your Health. Your Wealth. Your Community.',
  description: 'Earn, learn, and grow with Stellar Uzima. Transform your health, wealth, and community with blockchain-powered rewards.',
  generator: 'v0.app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Stellar Uzima',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#B84E20" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Stellar Uzima" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body
        className={`${playfair.variable} ${dmSans.variable} ${fraunces.variable} font-sans antialiased`}
      >
        <UpdateBanner />
        <ServiceWorkerProvider />
        <Providers>
          <OfflineBanner />
          {children}
          <InstallPrompt />
          <Analytics />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
