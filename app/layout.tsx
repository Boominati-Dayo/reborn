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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://babybloomdolls.com"),
  title: {
    default: "Baby Bloom Dolls | Premium Handcrafted Silicone Reborn Baby Dolls",
    template: "%s | Baby Bloom Dolls",
  },
  description:
    "Discover premium handcrafted silicone reborn baby dolls at Baby Bloom Dolls. Lifelike, weighted reborn babies for sale — medical-grade platinum silicone, artisan-crafted for collectors, therapy, and gifting. Free shipping on orders over $200. Shop the most realistic reborn baby dolls online.",
  keywords: [
    "reborn baby dolls",
    "reborn baby dolls for sale",
    "lifelike reborn baby dolls",
    "silicone reborn baby",
    "realistic reborn dolls",
    "premium reborn dolls",
    "handcrafted reborn babies",
    "full body silicone baby",
    "weighted reborn baby",
    "collectible reborn dolls",
    "therapeutic reborn dolls",
    "reborn doll for grief",
    "reborn doll therapy",
    "most realistic reborn baby dolls",
    "silicone newborn doll",
    "platinum silicone baby",
    "reborn dolls online",
    "real baby doll realistic",
    "reborn dolls for sale",
    "custom reborn baby dolls",
    "reborn baby girl dolls",
    "reborn baby boy dolls",
    "affordable reborn dolls",
    "premium reborn baby dolls",
    "best reborn baby sites",
    "authentic reborn babies",
    "newborn reborn doll",
    "realistic baby doll silicone",
    "hand painted reborn dolls",
    "lifelike reborn baby",
    "realistic baby doll",
    "full silicone reborn baby",
    "silicone vs vinyl reborn dolls",
    "reborn doll gift",
    "handmade reborn dolls",
    "realistic newborn doll",
    "premium silicone reborn babies",
    "silicone baby dolls for sale",
    "reborn baby artist",
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
    url: process.env.NEXT_PUBLIC_APP_URL || "https://babybloomdolls.com",
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
    canonical: process.env.NEXT_PUBLIC_APP_URL || "https://babybloomdolls.com",
    languages: {
      en: process.env.NEXT_PUBLIC_APP_URL || "https://babybloomdolls.com",
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "OnlineStore",
              "name": "Baby Bloom Dolls",
              "url": process.env.NEXT_PUBLIC_APP_URL || "https://babybloomdolls.com",
              "logo": "https://babybloomdolls.com/assets/owners-logo/BabyBloomDollsLogo.png",
              "image": "https://babybloomdolls.com/og-image.png",
              "description": "Premium handcrafted silicone reborn baby dolls. Medical-grade platinum silicone, weighted for authentic feel. Free shipping available.",
              "email": "babybloomdolls0@gmail.com",
              "foundingDate": "2023",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "United States"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "babybloomdolls0@gmail.com",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://facebook.com/babybloomdolls",
                "https://instagram.com/babybloomdolls",
                "https://pinterest.com/babybloomdolls"
              ],
              "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "applicableCountry": "US",
                "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                "merchantReturnDays": 14,
                "returnMethod": "https://schema.org/ReturnByMail",
                "returnFees": "https://schema.org/FreeReturn"
              },
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "value": "0",
                  "currency": "USD"
                },
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": "US"
                },
                "deliveryTime": {
                  "@type": "ShippingDeliveryTime",
                  "handlingTime": {
                    "@type": "QuantitativeValue",
                    "minValue": "1",
                    "maxValue": "3",
                    "unitCode": "DAY"
                  },
                  "transitTime": {
                    "@type": "QuantitativeValue",
                    "minValue": "3",
                    "maxValue": "7",
                    "unitCode": "DAY"
                  }
                }
              },
              "makesOffer": {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Handcrafted Silicone Reborn Baby Dolls",
                  "category": "Dolls & Accessories"
                }
              }
            })
          }}
        />
      </body>
    </html>
  );
}
