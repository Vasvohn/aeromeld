import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationDetail } from "@/components/DestinationDetail";
import { DESTINATIONS } from "@/lib/destinations";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dest = DESTINATIONS.find((d) => d.slug === slug);
  if (!dest) return { title: "Destination" };
  return {
    title: `${dest.title} : billets d’avion pas cher`,
    description: `${dest.blurb} Comparateur Aeromeld : comparez les vols, puis réservez au bon prix chez le partenaire.`,
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const dest = DESTINATIONS.find((d) => d.slug === slug);
  if (!dest) notFound();
  return <DestinationDetail slug={slug} />;
}
