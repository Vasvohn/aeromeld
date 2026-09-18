"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { AirportField } from "./AirportField";
import { useI18n } from "@/components/I18nProvider";
import { getAirport } from "@/lib/airports";
import { sanitizeAdults, sanitizeCabin, sanitizeDate, sanitizeIata, sanitizeTrip } from "@/lib/security";
import type { CabinFilter, TripType } from "@/lib/types";

function isoUtc(d: Date) {
  return d.toISOString().slice(0, 10);
}

function todayIso() {
  return isoUtc(new Date());
}

function plusDays(n: number) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + n);
  return isoUtc(d);
}

type Props = {
  defaults?: {
    from?: string;
    to?: string;
    depart?: string;
    returnDate?: string;
    adults?: string;
    trip?: TripType;
    cabin?: CabinFilter;
  };
  compact?: boolean;
};

export function SearchForm({ defaults, compact }: Props) {
  const { t } = useI18n();
  const router = useRouter();
  const [tripType, setTripType] = useState<TripType>(defaults?.trip ?? "roundtrip");
  const [from, setFrom] = useState(defaults?.from ?? "CDG");
  const [to, setTo] = useState(defaults?.to ?? "");
  const [depart, setDepart] = useState(defaults?.depart ?? "");
  const [returnDate, setReturnDate] = useState(defaults?.returnDate ?? "");
  const [adults, setAdults] = useState(defaults?.adults ?? "1");
  const [cabin, setCabin] = useState<CabinFilter>(defaults?.cabin ?? "all");
  const [error, setError] = useState("");

  const minDepart = useMemo(() => todayIso(), []);

  useEffect(() => {
    setDepart((current) => current || defaults?.depart || plusDays(21));
    setReturnDate((current) => current || defaults?.returnDate || plusDays(28));
  }, [defaults?.depart, defaults?.returnDate]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const origin = sanitizeIata(from);
    const dest = sanitizeIata(to);
    const goDate = sanitizeDate(depart);
    const backDate = sanitizeDate(returnDate);
    const pax = String(sanitizeAdults(adults));
    const trip = sanitizeTrip(tripType);
    const cabinClass = sanitizeCabin(cabin);
    if (!origin || !dest || !getAirport(origin) || !getAirport(dest)) {
      setError(t("search.errAirports"));
      return;
    }
    if (origin === dest) {
      setError(t("search.errSame"));
      return;
    }
    if (!goDate) {
      setError(t("search.errAirports"));
      return;
    }
    const params = new URLSearchParams({
      from: origin,
      to: dest,
      depart: goDate,
      adults: pax,
      trip,
      cabin: cabinClass,
    });
    if (trip === "roundtrip" && backDate) params.set("return", backDate);
    router.push(`/recherche?${params.toString()}`);
  }

  return (
    <form
      id="recherche"
      onSubmit={onSubmit}
      className={`rounded-3xl border border-white bg-white p-4 ring-1 ring-slate-200/80 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.45)] ${compact ? "" : "sm:p-7"}`}
    >
      <div className="mb-4 flex gap-2">
        {(
          [
            ["roundtrip", t("search.roundtrip")],
            ["oneway", t("search.oneway")],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setTripType(value)}
            className={`font-display rounded-full px-3 py-1.5 text-sm font-medium ${
              tripType === value
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label={t("search.cabin")}>
        {(
          [
            ["all", t("search.cabinAll")],
            ["economy", t("search.cabinEconomy")],
            ["premium", t("search.cabinPremium")],
            ["business", t("search.cabinBusiness")],
            ["first", t("search.cabinFirst")],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setCabin(value)}
            className={`font-display rounded-full px-3 py-1.5 text-sm font-medium ${
              cabin === value
                ? "bg-orange-500 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <AirportField
          id="from"
          label={t("search.from")}
          value={from}
          onChange={setFrom}
          placeholder={t("search.airportPlaceholder")}
        />
        <AirportField
          id="to"
          label={t("search.to")}
          value={to}
          onChange={setTo}
          placeholder={t("search.airportPlaceholder")}
        />
        <div>
          <label htmlFor="depart" className="font-display mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
            {t("search.depart")}
          </label>
          <input
            id="depart"
            type="date"
            min={minDepart}
            value={depart}
            onChange={(e) => setDepart(e.target.value)}
            required
            suppressHydrationWarning
            className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500"
          />
        </div>
        {tripType === "roundtrip" ? (
          <div>
            <label htmlFor="return" className="font-display mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
              {t("search.return")}
            </label>
            <input
              id="return"
              type="date"
              min={depart}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500"
            />
          </div>
        ) : null}
        <div>
          <label htmlFor="adults" className="font-display mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
            {t("search.passengers")}
          </label>
          <select
            id="adults"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500"
          >
            {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n > 1 ? t("search.adults") : t("search.adult")}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        className="btn-cta mt-5 w-full rounded-xl bg-orange-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/35 transition hover:bg-orange-600 sm:w-auto sm:px-12"
      >
        {t("search.submit")}
      </button>
      <p className="mt-3 text-xs leading-5 text-slate-500">{t("search.ctaTrust")}</p>
    </form>
  );
}
