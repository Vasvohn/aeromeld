"use client";

import Link from "next/link";
import { SearchForm } from "@/components/SearchForm";
import { StayCompare } from "@/components/StayCompare";
import { GUIDE_CLUSTERS, relatedGuides, type Guide } from "@/lib/guides";

function isoUtc(d: Date) {
  return d.toISOString().slice(0, 10);
}

function plusDays(n: number) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + n);
  return isoUtc(d);
}

export function GuideArticle({ guide }: { guide: Guide }) {
  const checkin = plusDays(21);
  const checkout = plusDays(28);
  const cluster = GUIDE_CLUSTERS[guide.cluster];
  const related = relatedGuides(guide);
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
        <Link href="/guides" className="hover:underline">
          Guides
        </Link>
        {" · "}
        <Link href={`/guides/#${guide.cluster}`} className="hover:underline">
          {cluster.name}
        </Link>
      </p>
      <p className="mt-3 text-sm text-sky-800">Requête visée : {guide.query}</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {guide.title}
      </h1>
      <div className="mt-5 space-y-3 text-base leading-7 text-slate-700">
        {guide.intro.map((p) => (
          <p key={p.slice(0, 48)}>{p}</p>
        ))}
      </div>

      {guide.pinImage ? (
        <figure className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <img
            src={`${base}${guide.pinImage}`}
            alt="10 astuces pour payer son billet d’avion moins cher — visuel Pinterest Aeromeld"
            width={768}
            height={1024}
            className="h-auto w-full"
          />
          <figcaption className="px-4 py-3 text-xs text-slate-500">
            Visuel à épingler sur Pinterest Pro (lien vers cette page dans la description).
          </figcaption>
        </figure>
      ) : null}

      {guide.showFlight ? (
        <section id="vol" className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">{guide.flightHeading}</h2>
          <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <SearchForm compact defaults={{ from: guide.from, to: guide.to }} />
          </div>
        </section>
      ) : null}

      {guide.body.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">{section.heading}</h2>
          <div className="mt-3 space-y-3 text-base leading-7 text-slate-700">
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        </section>
      ))}

      {guide.showHotels ? (
        <section id="hotel" className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">{guide.hotelHeading}</h2>
          <StayCompare
            iata={guide.to}
            checkin={checkin}
            checkout={checkout}
            variant="hotels"
            heading="h3"
            className="mt-4"
          />
        </section>
      ) : null}

      {guide.showCars ? (
        <section id="voiture" className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">{guide.carHeading}</h2>
          <StayCompare
            iata={guide.to}
            checkin={checkin}
            checkout={checkout}
            variant="cars"
            heading="h3"
            className="mt-4"
          />
        </section>
      ) : null}

      {guide.showBudget ? (
        <section id="budget" className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">{guide.budgetHeading}</h2>
          <ul className="mt-4 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {guide.budget.map((row) => (
              <li key={row.label} className="flex items-baseline justify-between gap-4 px-4 py-3">
                <span className="text-sm text-slate-700">{row.label}</span>
                <span className="shrink-0 text-sm font-semibold text-slate-900">{row.amount}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm leading-6 text-slate-600">{guide.budgetNote}</p>
        </section>
      ) : null}

      {related.length > 0 ? (
        <nav className="mt-12 rounded-3xl border border-sky-100 bg-sky-50/80 p-5" aria-label="Cocon sémantique">
          <p className="text-sm font-semibold text-slate-900">À lire dans le même cocon ({cluster.name})</p>
          <ul className="mt-3 space-y-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/guides/${item.slug}`} className="text-sm font-medium text-sky-800 hover:underline">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      <p className="mt-8 text-xs text-slate-500">
        Aeromeld est un comparateur affilié. La réservation se termine chez le partenaire (vol, hôtel ou voiture).
      </p>
    </article>
  );
}
