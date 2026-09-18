"use client";

import { useSearchParams } from "next/navigation";
import { AffiliateBanner } from "@/components/AffiliateBanner";
import { AirlineLogos } from "@/components/AirlineLogos";
import { ExtraPartnerOffers } from "@/components/ExtraPartnerOffers";
import { PriceAlert } from "@/components/PriceAlert";
import { PriceCalendar } from "@/components/PriceCalendar";
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
  const from2 = sanitizeIata(params.get("from2") ?? "");
  const to2 = sanitizeIata(params.get("to2") ?? "");
  const depart2 = sanitizeDate(params.get("depart2") ?? "");
  const adults = String(sanitizeAdults(params.get("adults") ?? "1"));
  const trip = sanitizeTrip(params.get("trip")) as TripType;
  const cabin = sanitizeCabin(params.get("cabin"));
  const error = params.get("error") === "offre";
  const origin = getAirport(from);
  const dest = getAirport(to);
  const origin2 = getAirport(from2);
  const dest2 = getAirport(to2);
  const ready = Boolean(origin && dest && depart && from !== to);
  const multiReady = trip === "multicity" && Boolean(origin2 && dest2 && depart2 && from2 !== to2);

  const offers = ready
    ? searchFlights({
        from,
        to,
        departDate: depart,
        returnDate,
        adults: Number(adults),
        tripType: trip === "multicity" ? "oneway" : trip,
        cabin,
      })
    : [];

  const offers2 = multiReady
    ? searchFlights({
        from: from2,
        to: to2,
        departDate: depart2,
        adults: Number(adults),
        tripType: "oneway",
        cabin,
      })
    : [];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <Reveal>
        <h1 className="text-2xl font-semibold text-slate-900">{t("results.title")}</h1>
        <p className="mt-2 text-sm font-medium text-slate-800">{t("home.guarantee")}</p>
        <AirlineLogos />
        <p className="mt-1 text-sm text-slate-600">
          {ready
            ? `${origin?.city} — ${origin?.name} (${from}) → ${dest?.city} — ${dest?.name} (${to}) · ${depart}${
                trip === "roundtrip" && returnDate ? ` · ${t("results.return")} ${returnDate}` : ""
              }${
                multiReady
                  ? ` · ${t("results.leg2")} ${origin2?.city} (${from2}) → ${dest2?.city} (${to2}) · ${depart2}`
                  : ""
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
            from2,
            to2,
            depart2,
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
      {ready ? (
        <Reveal className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]" delayMs={110}>
          <PriceCalendar
            from={from}
            to={to}
            depart={depart}
            returnDate={returnDate}
            adults={Number(adults)}
            trip={trip === "multicity" ? "oneway" : trip}
            cabin={cabin}
          />
          <PriceAlert from={from} to={to} destination={`${origin?.city} → ${dest?.city}`} />
        </Reveal>
      ) : null}
      <Reveal className="mt-6" delayMs={120}>
        {ready ? (
          <>
            {trip === "multicity" ? (
              <h2 className="mb-3 text-lg font-semibold text-slate-900">{t("results.leg1")}</h2>
            ) : null}
            <ResultsList offers={offers} cabin={cabin} />
            {multiReady ? (
              <div className="mt-8">
                <h2 className="mb-3 text-lg font-semibold text-slate-900">{t("results.leg2")}</h2>
                <ResultsList offers={offers2} cabin={cabin} />
              </div>
            ) : null}
          </>
        ) : (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-slate-600">
            {t("results.empty")}
          </p>
        )}
      </Reveal>
      {ready ? (
        <Reveal className="mt-2" delayMs={150}>
          <ExtraPartnerOffers className="mt-8" />
          <StayCompare iata={to} checkin={depart} checkout={returnDate || depart} />
        </Reveal>
      ) : null}
    </main>
  );
}
