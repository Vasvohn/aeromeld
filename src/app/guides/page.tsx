import type { Metadata } from "next";
import Link from "next/link";
import { SearchForm } from "@/components/SearchForm";
import { GUIDE_CLUSTERS, GUIDES, type GuideClusterId } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides vols : requêtes précises, Lisbonne, Porto, Guadeloupe, Marrakech",
  description:
    "Articles longue traîne : bagage cabine, aéroport → centre-ville, quand réserver en décembre. Widgets vol, hôtel et voiture dans chaque guide.",
  alternates: { canonical: "/guides/" },
};

const order: GuideClusterId[] = ["lisbonne", "porto", "guadeloupe", "marrakech", "astuces"];

export default function GuidesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Guides pour réserver juste avant l’achat
      </h1>
      <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
        Aeromeld ne vise pas « billet d’avion Maroc ». Chaque article répond à une question précise (compagnie +
        bagage, période, aéroport) puis place le comparateur de vols, les hôtels et la location auto.
      </p>
      <div className="mt-8">
        <SearchForm compact />
      </div>
      <div className="mt-10 space-y-12">
        {order.map((id) => {
          const cluster = GUIDE_CLUSTERS[id];
          const articles = GUIDES.filter((g) => g.cluster === id);
          return (
            <section key={id} id={id}>
              <h2 className="text-2xl font-bold text-slate-900">{cluster.name}</h2>
              <p className="mt-1 text-sm text-slate-600">{cluster.blurb}</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {articles.map((g) => (
                  <li key={g.slug}>
                    <Link
                      href={`/guides/${g.slug}`}
                      className="block h-full rounded-2xl border border-white/70 bg-white/85 p-4 shadow-sm hover:border-sky-200"
                    >
                      <p className="text-xs font-medium uppercase tracking-wide text-orange-600">{g.query}</p>
                      <p className="mt-1 font-semibold text-slate-900">{g.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
