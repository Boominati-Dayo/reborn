import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import { BackToTop } from "@/components/layout/back-to-top";
import { CartProvider } from "@/lib/context/cart-context";
import { MainContent } from "@/components/layout/main-content";
import { Toaster } from "react-hot-toast";
import { OfflineIndicator } from "@/components/ui/offline-indicator";

import "./globals.css";

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const displayFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://baby-bloom-dolls.vercel.app"),
  title: {
    default: "Baby Bloom Dolls | Premium Handcrafted Silicone Reborn Baby Dolls",
    template: "%s | Baby Bloom Dolls",
  },
  description:
    "Discover premium handcrafted silicone reborn baby dolls at Baby Bloom Dolls. Our lifelike, weighted reborn babies bring comfort, healing, and joy. Free shipping on orders over $200. Medical-grade platinum silicone, artisan-crafted realism.",
  keywords: [
    "reborn baby dolls",
    "silicone reborn baby",
    "realistic reborn dolls",
    "lifelike silicone baby",
    "premium reborn dolls",
    "handcrafted reborn babies",
    "full body silicone baby",
    "weighted reborn baby",
    "collectible reborn dolls",
    "therapeutic reborn dolls",
    "silicone baby dolls",
    "reborn doll for grief",
    "reborn doll collector",
    "realistic baby doll",
    "silicone newborn doll",
    "platinum silicone baby",
    "baby reborn dolls",
    "real baby doll realistic",
    "reborn dolls for sale",
    "silicone doll baby",
  ],
  authors: [{ name: "Baby Bloom Dolls" }],
  creator: "Baby Bloom Dolls",
  publisher: "Baby Bloom Dolls",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://baby-bloom-dolls.vercel.app",
    title: "Baby Bloom Dolls | Premium Handcrafted Silicone Reborn Baby Dolls",
    description:
      "Discover premium handcrafted silicone reborn baby dolls. Medical-grade platinum silicone, artisan-crafted realism, weighted for authentic feel. Free shipping on orders over $200.",
    siteName: "Baby Bloom Dolls",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "Baby Bloom Dolls - Premium Handcrafted Silicone Reborn Baby Dolls",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Baby Bloom Dolls | Premium Handcrafted Silicone Reborn Baby Dolls",
    description: "Discover premium handcrafted silicone reborn baby dolls. Medical-grade platinum silicone, artisan-crafted realism, weighted for authentic feel.",
    images: ['/og-image.png'],
    creator: '@babybloomdolls',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || "https://baby-bloom-dolls.vercel.app",
    languages: {
      en: process.env.NEXT_PUBLIC_APP_URL || "https://baby-bloom-dolls.vercel.app",
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicons/web-app-manifest-512x512.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} bg-white text-black antialiased`}
      >
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <MainContent>
              {children}
            </MainContent>
            <SiteFooter />
          </div>
          <BackToTop />
          <Toaster position="bottom-right" />
          <OfflineIndicator />
        </CartProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{},Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/6a674f27bc55a11d4d710468/1juhoqdqu';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
