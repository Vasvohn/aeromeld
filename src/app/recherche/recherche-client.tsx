"use client";

import { useSearchParams } from "next/navigation";
import { AffiliateBanner } from "@/components/AffiliateBanner";
import { Reveal } from "@/components/Reveal";
import { ResultsList } from "@/components/ResultsList";
import { SearchForm } from "@/components/SearchForm";
import { StayCompare } from "@/components/StayCompare";
import { TrustBadges } from "@/components/TrustBadges";
import { useI18n } from "@/components/I18nProvider";
import { getAirport } from "@/lib/airports";
import { searchFlights } from "@/lib/search";
import { sanitizeAdults, sanitizeCabin, sanitizeDate, sanitizeIata, sanitizeTrip } from "@/lib/security";
import type { TripType } from "@/lib/types";

export function RechercheClient() {
  const { t } = useI18n();
  const params = useSearchParams();
  const from = sanitizeIata(params.get("from") ?? "");
  const to = sanitizeIata(params.get("to") ?? "");
  const depart = sanitizeDate(params.get("depart") ?? "");
  const returnDate = sanitizeDate(params.get("return") ?? "") || undefined;
  const adults = String(sanitizeAdults(params.get("adults") ?? "1"));
  const trip = sanitizeTrip(params.get("trip")) as TripType;
  const cabin = sanitizeCabin(params.get("cabin"));
  const error = params.get("error") === "offre";
  const origin = getAirport(from);
  const dest = getAirport(to);
  const ready = Boolean(origin && dest && depart && from !== to);

  const offers = ready
    ? searchFlights({
        from,
        to,
        departDate: depart,
        returnDate,
        adults: Number(adults),
        tripType: trip,
        cabin,
      })
    : [];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <Reveal>
        <h1 className="text-2xl font-semibold text-slate-900">{t("results.title")}</h1>
        <p className="mt-1 text-sm text-slate-600">
          {ready
            ? `${origin?.city} — ${origin?.name} (${from}) → ${dest?.city} — ${dest?.name} (${to}) · ${depart}${
                trip === "roundtrip" && returnDate ? ` · ${t("results.return")} ${returnDate}` : ""
              } · ${cabin === "all" ? t("cabin.all") : t(`cabin.${cabin}`)}`
            : t("results.complete")}
        </p>
      </Reveal>
      <Reveal className="mt-6" delayMs={60}>
        <SearchForm
          compact
          defaults={{
            from,
            to,
            depart,
            returnDate,
            adults,
            trip,
            cabin,
          }}
        />
        <TrustBadges />
      </Reveal>
      <Reveal className="mt-6" delayMs={90}>
        <AffiliateBanner />
      </Reveal>
      {error && <p className="mt-4 text-sm text-red-600">{t("results.missing")}</p>}
      <Reveal className="mt-6" delayMs={120}>
        {ready ? (
          <ResultsList offers={offers} cabin={cabin} />
        ) : (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-slate-600">
            {t("results.empty")}
          </p>
        )}
      </Reveal>
      {ready ? (
        <Reveal className="mt-2" delayMs={150}>
          <StayCompare iata={to} checkin={depart} checkout={returnDate || depart} />
        </Reveal>
      ) : null}
    </main>
  );
}
