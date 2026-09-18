import type { Metadata } from "next";
import { DestinationsList } from "@/components/DestinationsList";

export const metadata: Metadata = {
  title: "Destinations populaires | Billets d'avion pas cher",
  description:
    "Comparateur de vols : billets d’avion pas cher vers New York, Marrakech, Dakar, Lisbonne, Tokyo et Londres. Comparez et réservez chez le partenaire.",
  alternates: { canonical: "/destinations/" },
};

export default function DestinationsPage() {
  return <DestinationsList />;
}
