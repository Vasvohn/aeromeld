import { publicSiteUrl } from "@/lib/site";

const siteUrl = publicSiteUrl();

export function SeoJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Aeromeld",
        alternateName: ["Aeromeld", "Aeromeld Compare. Book. Fly."],
        inLanguage: ["fr", "en", "es", "pt"],
        description:
          "Comparateur de vols et billets d’avion au meilleur prix, avec réservation chez le partenaire officiel.",
        publisher: { "@id": `${siteUrl}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/recherche/?from={from}&to={to}`,
          "query-input": "required name=from required name=to",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Aeromeld",
        alternateName: "Aeromeld Compare. Book. Fly.",
        slogan: "Compare. Book. Fly.",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.svg`,
        },
        image: `${siteUrl}/og.png`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
