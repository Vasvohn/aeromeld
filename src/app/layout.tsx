import type { Metadata, Viewport } from "next";
import { FrameGuard } from "@/components/FrameGuard";
import { I18nProvider } from "@/components/I18nProvider";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { TravelpayoutsScript } from "@/components/TravelpayoutsScript";
import { Inter, Poppins } from "next/font/google";
import { contentSecurityPolicy } from "@/lib/security";
import { publicSiteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = publicSiteUrl();
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const markIcon = `${assetBase}/aeromeld-square.png`;
const title = "Aeromeld | Comparateur de vols & billets d'avion au meilleur prix";
const description =
  "Aeromeld est un comparateur de vols pas cher : comparez des billets d’avion au bon prix et finalisez votre réservation chez le partenaire officiel, sans frais cachés.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · Aeromeld",
  },
  description,
  applicationName: "Aeromeld",
  authors: [{ name: "Aeromeld" }],
  creator: "Aeromeld",
  publisher: "Aeromeld",
  category: "travel",
  keywords: [
    "comparateur de vols",
    "billets d'avion",
    "vols pas cher",
    "réservation de vols",
    "comparateur",
    "bon prix",
    "partenaire",
    "bagage cabine Volotea Paris Porto",
    "quand réserver vol Guadeloupe décembre",
    "aéroport Lisbonne centre-ville",
  ],
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
  referrer: "strict-origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [{ url: markIcon, type: "image/png", sizes: "32x32" }],
    shortcut: markIcon,
    apple: [{ url: `${assetBase}/apple-touch-icon.png`, sizes: "180x180" }],
  },
  manifest: `${assetBase}/site.webmanifest`,
  appleWebApp: {
    capable: true,
    title: "Aeromeld",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: "/",
    types: {
      "application/xml": "/sitemap.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US", "es_ES", "pt_PT"],
    url: siteUrl,
    siteName: "Aeromeld",
    title,
    description,
    images: [
      {
        url: "/og.png",
        width: 512,
        height: 512,
        alt: "Aeromeld — Comparer. Réserver. Voyager.",
      },
    ],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/og.png"],
  },
  other: {
    "msapplication-TileColor": "#0284c7",
    "msapplication-TileImage": `${assetBase}/icon-192.png`,
    "application-name": "Aeromeld",
    "apple-mobile-web-app-title": "Aeromeld",
    "pinterest-rich-pin": "true",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0284c7" },
    { media: "(prefers-color-scheme: dark)", color: "#0369a1" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.variable} ${poppins.variable} h-full antialiased`}>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta
          httpEquiv="Permissions-Policy"
          content="camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()"
        />
        <link rel="icon" href={markIcon} type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href={markIcon} />
        <link rel="apple-touch-icon" href={`${assetBase}/apple-touch-icon.png`} />
        <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy()} />
      </head>
      <body className="page-shell flex min-h-full flex-col font-sans text-slate-900">
        <I18nProvider>
          <FrameGuard />
          <SeoJsonLd />
          <Header />
          {children}
          <Footer />
          <CookieBanner />
          <TravelpayoutsScript />
        </I18nProvider>
      </body>
    </html>
  );
}
