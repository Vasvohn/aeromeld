import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/GuideArticle";
import { GUIDES, getGuide } from "@/lib/guides";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide" };
  const url = `/guides/${guide.slug}/`;
  const images = guide.pinImage
    ? [{ url: guide.pinImage, width: 768, height: 1024, alt: guide.title }]
    : undefined;
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: [guide.query, "comparateur de vols", "billets d'avion", "vol pas cher"],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "fr_FR",
      url,
      title: guide.title,
      description: guide.metaDescription,
      images,
    },
    twitter: {
      card: guide.pinImage ? "summary_large_image" : "summary",
      title: guide.title,
      description: guide.metaDescription,
      images: guide.pinImage ? [guide.pinImage] : undefined,
    },
    other: {
      "pinterest-rich-pin": "true",
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: guide.published,
    dateModified: guide.published,
    inLanguage: "fr",
    mainEntityOfPage: `${siteUrl}/guides/${guide.slug}/`,
    author: { "@type": "Organization", name: "Aeromeld" },
    publisher: { "@type": "Organization", name: "Aeromeld", logo: { "@type": "ImageObject", url: `${siteUrl}/icon-192.png` } },
    keywords: guide.query,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <GuideArticle guide={guide} />
    </>
  );
}
