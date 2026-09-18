"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/I18nProvider";
import { formatPrice, monthFares, tripLengthDays } from "@/lib/search";
import type { CabinFilter, SearchQuery, TripType } from "@/lib/types";

const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];

function monthLabel(year: number, month: number, locale: string) {
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function PriceCalendar({
  from,
  to,
  depart,
  returnDate,
  adults,
  trip,
  cabin,
}: {
  from: string;
  to: string;
  depart: string;
  returnDate?: string;
  adults: number;
  trip: TripType;
  cabin: CabinFilter;
}) {
  const { t, locale } = useI18n();
  const router = useRouter();
  const start = depart ? new Date(`${depart}T00:00:00Z`) : new Date();
  const [cursor, setCursor] = useState({ y: start.getUTCFullYear(), m: start.getUTCMonth() + 1 });
  const [view, setView] = useState<"month" | "graph">("month");

  const query: SearchQuery = {
    from,
    to,
    departDate: depart,
    returnDate,
    adults,
    tripType: trip,
    cabin,
  };

  const days = useMemo(
    () => monthFares(query, cursor.y, cursor.m),
    [from, to, adults, trip, cabin, depart, returnDate, cursor.y, cursor.m],
  );
  const min = days.reduce((acc, d) => Math.min(acc, d.price), Number.POSITIVE_INFINITY);
  const max = days.reduce((acc, d) => Math.max(acc, d.price), 0);
  const firstWeekday = new Date(Date.UTC(cursor.y, cursor.m - 1, 1)).getUTCDay();
  const mondayOffset = (firstWeekday + 6) % 7;
  const span = trip === "roundtrip" ? tripLengthDays(depart, returnDate) : 0;
  const localeTag = locale === "en" ? "en-GB" : locale === "es" ? "es" : locale === "pt" ? "pt" : "fr-FR";

  function shift(delta: number) {
    const next = new Date(Date.UTC(cursor.y, cursor.m - 1 + delta, 1));
    setCursor({ y: next.getUTCFullYear(), m: next.getUTCMonth() + 1 });
  }

  function pick(iso: string) {
    const params = new URLSearchParams({
      from,
      to,
      depart: iso,
      adults: String(adults),
      trip,
      cabin,
    });
    if (trip === "roundtrip") {
      const [y, m, d] = iso.split("-").map((part) => Number.parseInt(part, 10));
      const back = new Date(Date.UTC(y, m - 1, d + span));
      const ret = `${back.getUTCFullYear()}-${String(back.getUTCMonth() + 1).padStart(2, "0")}-${String(back.getUTCDate()).padStart(2, "0")}`;
      params.set("return", ret);
    }
    router.push(`/recherche?${params.toString()}`);
  }

  return (
    <section className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{t("calendar.title")}</h2>
          <p className="text-sm text-slate-500">{t("calendar.lead")}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${view === "month" ? "bg-sky-700 text-white" : "bg-slate-100 text-slate-700"}`}
            onClick={() => setView("month")}
          >
            {t("calendar.month")}
          </button>
          <button
            type="button"
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${view === "graph" ? "bg-sky-700 text-white" : "bg-slate-100 text-slate-700"}`}
            onClick={() => setView("graph")}
          >
            {t("calendar.graph")}
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button type="button" className="rounded-lg px-2 py-1 text-sm font-medium text-sky-800 hover:bg-sky-50" onClick={() => shift(-1)}>
          ← {t("calendar.prev")}
        </button>
        <p className="text-sm font-semibold capitalize text-slate-800">{monthLabel(cursor.y, cursor.m, localeTag)}</p>
        <button type="button" className="rounded-lg px-2 py-1 text-sm font-medium text-sky-800 hover:bg-sky-50" onClick={() => shift(1)}>
          {t("calendar.next")} →
        </button>
      </div>
      {view === "month" ? (
        <div className="mt-3 grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((day, i) => (
            <div key={`${day}-${i}`} className="pb-1 text-[11px] font-semibold text-slate-400">
              {day}
            </div>
          ))}
          {Array.from({ length: mondayOffset }).map((_, i) => (
            <div key={`pad-${i}`} />
          ))}
          {days.map((day) => {
            const cheapest = day.price === min;
            const selected = day.date === depart;
            const n = Number.parseInt(day.date.slice(8), 10);
            return (
              <button
                key={day.date}
                type="button"
                onClick={() => pick(day.date)}
                className={`rounded-lg px-1 py-1.5 text-left transition ${
                  selected
                    ? "bg-sky-700 text-white"
                    : cheapest
                      ? "bg-emerald-50 ring-1 ring-emerald-300"
                      : "hover:bg-slate-50"
                }`}
              >
                <span className={`block text-[11px] ${selected ? "text-sky-100" : "text-slate-500"}`}>{n}</span>
                <span className={`block text-[10px] font-semibold tabular-nums ${selected ? "text-white" : cheapest ? "text-emerald-800" : "text-slate-800"}`}>
                  {formatPrice(day.price)}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <ul className="mt-4 flex h-40 items-end gap-0.5 overflow-x-auto">
          {days.map((day) => {
            const height = max ? Math.max(8, Math.round((day.price / max) * 140)) : 8;
            const cheapest = day.price === min;
            return (
              <li key={day.date} className="flex min-w-[1.4rem] flex-1 flex-col items-center justify-end">
                <button
                  type="button"
                  title={`${day.date} · ${formatPrice(day.price)}`}
                  onClick={() => pick(day.date)}
                  className={`w-full rounded-t ${cheapest ? "bg-emerald-500" : "bg-sky-500"} hover:opacity-90`}
                  style={{ height }}
                />
                <span className="mt-1 text-[9px] text-slate-500">{day.date.slice(8)}</span>
              </li>
            );
          })}
        </ul>
      )}
      <p className="mt-3 text-xs text-slate-500">{t("calendar.legend")}</p>
    </section>
  );
}
