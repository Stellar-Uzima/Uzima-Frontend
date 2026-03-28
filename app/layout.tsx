import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Footer from '../components/footer';
import { PwaShell } from '@/components/pwa/PwaShell';
import { Providers } from '@/providers/providers';


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
        url: '/icon-192x192.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-192x192.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/icon-192x192.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#B84E20" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Stellar Uzima" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <PwaShell />
          <div className="offline-banner-offset">
            {children}
            <Footer/>
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
