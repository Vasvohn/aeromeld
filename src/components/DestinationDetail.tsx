"use client";

import { AffiliateBanner } from "@/components/AffiliateBanner";
import { ExtraPartnerOffers } from "@/components/ExtraPartnerOffers";
import { PriceAlert } from "@/components/PriceAlert";
import { Reveal } from "@/components/Reveal";
import { SearchForm } from "@/components/SearchForm";
import { StayCompare } from "@/components/StayCompare";
import { useI18n } from "@/components/I18nProvider";
import { DESTINATIONS } from "@/lib/destinations";
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
