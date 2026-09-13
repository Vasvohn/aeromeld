import { Suspense } from "react";
import type { Metadata } from "next";
import { RechercheClient } from "./recherche-client";

export const metadata: Metadata = {
  title: "Recherche de billets d’avion pas cher",
  description:
    "Comparez les vols au bon prix et passez à la réservation chez le partenaire officiel avec Aeromeld, comparateur de billets d’avion.",
};

export default function RecherchePage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-6xl px-4 py-8">
          <p className="text-slate-600">Chargement des vols…</p>
        </main>
      }
    >
      <RechercheClient />
    </Suspense>
  );
}
