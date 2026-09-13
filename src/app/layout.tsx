import type { Metadata, Viewport } from "next";
import { I18nProvider } from "@/components/I18nProvider";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { Inter, Poppins } from "next/font/google";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
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
        alt: "Aeromeld — Compare. Book. Fly.",
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
        <link rel="icon" href={markIcon} type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href={markIcon} />
        <link rel="apple-touch-icon" href={`${assetBase}/apple-touch-icon.png`} />
        <meta
          httpEquiv="Content-Security-Policy"
          content={`default-src 'self'; base-uri 'self'; form-action 'self'; object-src 'none'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}; font-src 'self' data:; connect-src 'self' ws: wss:; upgrade-insecure-requests`}
        />
      </head>
      <body className="page-shell flex min-h-full flex-col font-sans text-slate-900">
        <I18nProvider>
          <SeoJsonLd />
          <Header />
          {children}
          <Footer />
          <CookieBanner />
        </I18nProvider>
      </body>
    </html>
  );
}
