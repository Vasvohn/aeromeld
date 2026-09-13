"use client";

import { AffiliateBanner } from "@/components/AffiliateBanner";
import { Reveal } from "@/components/Reveal";
import { SearchForm } from "@/components/SearchForm";
import { TrustBadges } from "@/components/TrustBadges";
import { useI18n } from "@/components/I18nProvider";
import { DESTINATIONS } from "@/lib/destinations";
import { GUIDES } from "@/lib/guides";
import Link from "next/link";

const HOME_GUIDES = [
  "aeroport-lisbonne-centre-ville",
  "prix-bagage-cabine-volotea-paris-porto",
  "quand-reserver-vol-guadeloupe-decembre",
  "10-astuces-payer-billet-avion-moins-cher",
  "bagage-cabine-transavia-paris-marrakech",
  "guide-vol-sejour-lisbonne",
];

export function HomePage() {
  const { t } = useI18n();
  const reasons = [
    { title: t("home.why1"), text: t("home.why1text") },
    { title: t("home.why2"), text: t("home.why2text") },
    { title: t("home.why3"), text: t("home.why3text") },
  ];
  const steps = [
    { title: t("home.step1"), text: t("home.step1text") },
    { title: t("home.step2"), text: t("home.step2text") },
    { title: t("home.step3"), text: t("home.step3text") },
  ];

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-800 via-sky-600 to-cyan-400 text-white">
        <div className="clouds pointer-events-none absolute inset-0 opacity-25" aria-hidden />
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:pt-20">
          <Reveal>
            <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-sky-100">
              {t("home.kicker")}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              {t("home.title")}
            </h1>
            <h2 className="mt-4 max-w-2xl text-lg font-medium leading-7 text-sky-50 sm:text-xl">
              {t("home.subtitle")}
            </h2>
          </Reveal>
          <Reveal className="mt-8 text-slate-900" delayMs={80}>
            <SearchForm />
            <TrustBadges onDark />
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-4 text-xs text-sky-100">{t("home.demo")}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <Reveal>
          <AffiliateBanner />
        </Reveal>
        <Reveal className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">{t("home.whyTitle")}</h2>
          <p className="mt-2 max-w-3xl text-slate-600">{t("home.whyLead")}</p>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {reasons.map((reason, i) => (
            <Reveal key={reason.title} delayMs={i * 70}>
              <article className="h-full rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-slate-900">{reason.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{reason.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">{t("home.popular")}</h2>
          <p className="mt-2 text-slate-600">{t("home.popularLead")}</p>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((d, i) => (
            <Reveal key={d.slug} delayMs={i * 70}>
              <Link
                href={`/destinations/${d.slug}`}
                className="card-lift block rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur-sm"
              >
                <p className="text-sm font-medium text-sky-700">
                  {d.from} → {d.to}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{d.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{t(`dest.${d.slug}.blurb`)}</p>
                <p className="mt-3 text-xs font-medium text-orange-700">{t("stay.included")}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">{t("home.guides")}</h2>
          <p className="mt-2 max-w-3xl text-slate-600">{t("home.guidesLead")}</p>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_GUIDES.map((slug, i) => {
            const g = GUIDES.find((item) => item.slug === slug);
            if (!g) return null;
            return (
              <Reveal key={g.slug} delayMs={i * 70}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="card-lift block h-full rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur-sm"
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-orange-600">{g.query}</p>
                  <h3 className="mt-1 text-lg font-semibold">{g.title}</h3>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-4 text-sm">
          <Link href="/guides" className="font-medium text-sky-800 hover:underline">
            {t("nav.guides")} →
          </Link>
        </p>
      </section>

      <section className="border-t border-sky-200/60 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delayMs={i * 90}>
              <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
