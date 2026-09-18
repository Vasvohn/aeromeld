"use client";

import Link from "next/link";
import { AffiliateBanner } from "@/components/AffiliateBanner";
import { ExtraPartnerOffers } from "@/components/ExtraPartnerOffers";
import { PriceAlert } from "@/components/PriceAlert";
import { Reveal } from "@/components/Reveal";
import { SearchForm } from "@/components/SearchForm";
import { StayCompare } from "@/components/StayCompare";
import { useI18n } from "@/components/I18nProvider";
import { DESTINATIONS } from "@/lib/destinations";
import { guidesForRoute } from "@/lib/guides";
import { formatPrice } from "@/lib/search";

function plusDays(n: number) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function DestinationDetail({ slug }: { slug: string }) {
  const { t } = useI18n();
  const dest = DESTINATIONS.find((d) => d.slug === slug);
  if (!dest) return null;
  const checkin = plusDays(21);
  const checkout = plusDays(28);
  const guides = guidesForRoute(dest.from, dest.to);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <Reveal>
        <p className="text-sm font-medium text-sky-700">
          {dest.from} → {dest.to}
        </p>
        <h1 className="mt-2 text-3xl font-semibold">{dest.title}</h1>
        <p className="mt-3 text-lg text-slate-600">{t(`dest.${dest.slug}.blurb`)}</p>
        <p className="mt-2 text-sm font-medium text-slate-800">{t(`dest.${dest.slug}.highlight`)}</p>
        <p className="mt-3 text-lg font-semibold text-sky-800">
          {t("dest.avgFare")} {formatPrice(dest.avgFare)}
        </p>
        <p className="mt-2 text-sm font-medium text-slate-800">{t("home.guarantee")}</p>
        <p className="mt-3 text-sm font-medium text-orange-700">{t("stay.included")}</p>
      </Reveal>
      <Reveal className="mt-8" delayMs={80}>
        <AffiliateBanner />
      </Reveal>
      <Reveal className="mt-6" delayMs={120}>
        <SearchForm
          defaults={{
            from: dest.from,
            to: dest.to,
            depart: checkin,
            returnDate: checkout,
            adults: "1",
            trip: "roundtrip",
          }}
        />
      </Reveal>
      {guides.length > 0 ? (
        <Reveal className="mt-8" delayMs={130}>
          <section className="rounded-3xl border border-sky-100 bg-sky-50/80 p-5">
            <h2 className="text-lg font-semibold text-slate-900">{t("dest.guides")}</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {guides.map((guide) => (
                <li key={guide.slug}>
                  <Link href={`/guides/${guide.slug}`} className="text-sm font-medium text-sky-800 hover:underline">
                    {guide.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      ) : null}
      <Reveal className="mt-6" delayMs={140}>
        <PriceAlert from={dest.from} to={dest.to} destination={dest.title} />
      </Reveal>
      <Reveal className="mt-2" delayMs={160}>
        <ExtraPartnerOffers className="mt-6" />
        <StayCompare iata={dest.to} checkin={checkin} checkout={checkout} />
      </Reveal>
    </main>
  );
}
