import type { Metadata } from "next";
import { DestinationsList } from "@/components/DestinationsList";

export const metadata: Metadata = {
  title: "Destinations populaires | Billets d'avion pas cher · Aeromeld",
  description:
    "Comparateur de vols : billets d’avion pas cher vers New York, Marrakech, Dakar, Lisbonne, Tokyo et Londres. Comparez et réservez chez le partenaire.",
};

export default function DestinationsPage() {
  return <DestinationsList />;
}
