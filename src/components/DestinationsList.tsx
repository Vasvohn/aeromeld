"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/components/I18nProvider";
import { DESTINATIONS } from "@/lib/destinations";

export function DestinationsList() {
  const { t } = useI18n();
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <Reveal>
        <h1 className="text-3xl font-semibold">{t("dest.title")}</h1>
        <p className="mt-3 max-w-2xl text-slate-600">{t("dest.lead")}</p>
      </Reveal>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {DESTINATIONS.map((d, i) => (
          <li key={d.slug}>
            <Reveal delayMs={i * 70}>
              <Link
                href={`/destinations/${d.slug}`}
                className="card-lift block rounded-2xl border border-white/70 bg-white/85 p-6 backdrop-blur-sm"
              >
                <h2 className="text-xl font-semibold">{d.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{t(`dest.${d.slug}.blurb`)}</p>
                <p className="mt-3 text-xs font-medium text-orange-700">{t("stay.included")}</p>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </main>
  );
}
