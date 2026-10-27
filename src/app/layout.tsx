import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import { Footer } from "@/components/Footer";
import { GoatCounter } from "@/components/GoatCounter";
import { Header } from "@/components/Header";
import { ogImage } from "@/lib/seo";
import { appStoreUrl, iphoneListingLive } from "@/lib/iphone";
import { siteConfig } from "@/lib/site";
import "./fonts.css";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#050B14",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | IronBuddy",
  },
  description: siteConfig.description,
  applicationName: siteConfig.fullName,
  authors: [{ name: "IronBuddy", url: siteConfig.url }],
  creator: "IronBuddy",
  publisher: "IronBuddy",
  // No `alternates` here on purpose: a canonical set at the layout level is inherited by every page that
  // does not override it, which would point those pages at the home page. Each page sets its own via pageMetadata().
  // Fallback social card for routes without their own metadata (for example the 404 page).
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.fullName,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: ogImage.url, alt: ogImage.alt }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "fitness",
  ...(siteConfig.playListingLive
    ? {
        appLinks: {
          android: {
            package: siteConfig.playStoreId,
            app_name: siteConfig.fullName,
            url: siteConfig.playStoreUrl,
          },
          ...(iphoneListingLive && appStoreUrl
            ? { ios: { app_store_id: "6827257978", app_name: siteConfig.fullName, url: appStoreUrl } }
            : {}),
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Same as next/font's preload: fetch the Latin font file early, since every page uses it.
  preload("/fonts/plus-jakarta-sans/latin.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans text-white antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <GoatCounter />
      </body>
    </html>
  );
}
