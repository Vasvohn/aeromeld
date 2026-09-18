import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationDetail } from "@/components/DestinationDetail";
import { DESTINATIONS } from "@/lib/destinations";
import { publicSiteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dest = DESTINATIONS.find((d) => d.slug === slug);
  if (!dest) return { title: "Destination" };
  const url = `/destinations/${dest.slug}/`;
  const title = dest.seoTitle;
  const description = dest.seoDescription;
  return {
    title,
    description,
    keywords: [
      `vols ${dest.title}`,
      `billets d'avion ${dest.from} ${dest.to}`,
      "comparateur de vols",
      "vols pas cher",
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: `${publicSiteUrl()}${url}`,
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const dest = DESTINATIONS.find((d) => d.slug === slug);
  if (!dest) notFound();
  return <DestinationDetail slug={slug} />;
}
