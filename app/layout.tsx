import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Footer from "../components/footer";
import { OfflineBanner } from "@/components/pwa/OfflineBanner";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { Providers } from "@/providers/providers";

export const metadata: Metadata = {
  title: "Stellar Uzima — Your Health. Your Wealth. Your Community.",
  description:
    "Earn, learn, and grow with Stellar Uzima. Transform your health, wealth, and community with blockchain-powered rewards.",
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Stellar Uzima",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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

        {/* --- #198: Anti-Flash Theme Script --- */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let theme = localStorage.getItem('theme');
                let supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                if (!theme && supportDarkMode) theme = 'dark';
                if (!theme) theme = 'light';
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      {/* 
          FIX: Added 'bg-background' and 'text-foreground'. 
          This ensures the body actually uses the colors defined in globals.css 
      */}
      <body className="min-h-screen bg-background text-foreground font-sans antialiased transition-colors duration-300 ease-in-out">
        <Providers>
          <OfflineBanner />
          <div className="offline-banner-offset">
            {children}
            <Footer/>
          </div>
          <InstallPrompt />
          <Analytics />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}