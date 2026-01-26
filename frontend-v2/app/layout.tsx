import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Stellar Uzima - Healthcare Knowledge Sharing Platform',
  description: 'Share healthcare knowledge, earn XLM tokens. A platform where medical professionals and patients collaborate for better health outcomes.',
  generator: 'v0.app',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
