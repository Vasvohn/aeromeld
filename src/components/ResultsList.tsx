"use client";

import { useEffect, useMemo, useState } from "react";
import { FlightCard } from "@/components/FlightCard";
import { useI18n } from "@/components/I18nProvider";
import { CABIN_CLASSES } from "@/lib/cabins";
import { formatPrice } from "@/lib/search";
import type { CabinClass, CabinFilter, FlightOffer } from "@/lib/types";

type SortKey = "price" | "duration" | "stops";

export function ResultsList({
  offers,
  cabin,
}: {
  offers: FlightOffer[];
  cabin: CabinFilter;
}) {
  const { t } = useI18n();
  const [sort, setSort] = useState<SortKey>("price");
  const [directOnly, setDirectOnly] = useState(false);
  const [cabinFilter, setCabinFilter] = useState<CabinFilter>(cabin);

  useEffect(() => {
    setCabinFilter(cabin);
  }, [cabin]);

  const cheapestByCabin = useMemo(() => {
    const map = new Map<CabinClass, FlightOffer>();
    for (const offer of offers) {
      const current = map.get(offer.cabin);
      if (!current || offer.price < current.price) map.set(offer.cabin, offer);
    }
    return CABIN_CLASSES.map((key) => ({ key, offer: map.get(key) }));
  }, [offers]);

  const filtered = useMemo(() => {
    const byCabin = cabinFilter === "all" ? offers : offers.filter((o) => o.cabin === cabinFilter);
    const list = directOnly ? byCabin.filter((o) => o.stops === 0) : byCabin;
    return [...list].sort((a, b) => {
      if (sort === "duration") return a.durationMinutes - b.durationMinutes;
      if (sort === "stops") return a.stops - b.stops || a.price - b.price;
      return a.price - b.price;
    });
  }, [offers, sort, directOnly, cabinFilter]);

  const sortLabel =
    sort === "price" ? t("results.price") : sort === "duration" ? t("results.duration") : t("results.stops");

  return (
    <div>
      <div className="mb-4">
        <p className="mb-2 text-sm font-medium text-slate-700">{t("results.compareCabins")}</p>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {cheapestByCabin.map(({ key, offer }) => (
            <button
              key={key}
              type="button"
              onClick={() => setCabinFilter(key)}
              className={`rounded-2xl border bg-white p-3 text-left shadow-sm transition ${
                cabinFilter === key
                  ? "border-orange-400 ring-2 ring-orange-200"
                  : "border-slate-200 hover:border-orange-200"
              }`}
            >
              <p className="font-display text-xs font-medium uppercase tracking-wide text-slate-500">
                {t(`cabin.${key}`)}
              </p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-slate-900">
                {offer ? formatPrice(offer.price, offer.currency) : "—"}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500">{t("results.fromPrice")}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          {filtered.length} {t("results.offers")} · {t("results.sortBy")} {sortLabel}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setCabinFilter("all")}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              cabinFilter === "all"
                ? "border-orange-400 bg-orange-50 font-medium text-orange-800"
                : "border-slate-200 bg-white text-slate-700"
            }`}
          >
            {t("search.cabinAll")}
          </button>
          <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={directOnly}
              onChange={(e) => setDirectOnly(e.target.checked)}
            />
            {t("results.directOnly")}
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm"
          >
            <option value="price">{t("results.sortPrice")}</option>
            <option value="duration">{t("results.sortDuration")}</option>
            <option value="stops">{t("results.sortStops")}</option>
          </select>
        </div>
      </div>
      <div className="space-y-3">
        {filtered.map((offer) => (
          <FlightCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
}
