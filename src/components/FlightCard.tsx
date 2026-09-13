"use client";

import { useI18n } from "@/components/I18nProvider";
import { buildPartnerUrl } from "@/lib/affiliate";
import { formatDuration, formatPrice } from "@/lib/search";
import type { FlightOffer } from "@/lib/types";

export function FlightCard({ offer }: { offer: FlightOffer }) {
  const { t } = useI18n();
  const href = buildPartnerUrl(offer);
  const stopsLabel =
    offer.stops === 0
      ? t("flight.direct")
      : offer.stops === 1
        ? `1 ${t("flight.stop")}`
        : `${offer.stops} ${t("flight.stops")}`;

  return (
    <article className="card-lift flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-700">
            {offer.airline}
          </span>
          <span className="text-slate-400">
            {t("flight.via")} {offer.partnerName}
          </span>
          <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-700">
            {t(`cabin.${offer.cabin}`)}
          </span>
        </div>
        <div className="mt-3 flex items-center gap-4">
          <div>
            <p className="text-xl font-semibold text-slate-900">{offer.departTime}</p>
            <p className="text-xs font-medium text-slate-500">{offer.from}</p>
          </div>
          <div className="min-w-24 flex-1 text-center">
            <p className="text-xs text-slate-500">{formatDuration(offer.durationMinutes)}</p>
            <div className="my-1 h-px bg-slate-200" />
            <p className="text-xs font-medium text-sky-700">{stopsLabel}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-semibold text-slate-900">{offer.arriveTime}</p>
            <p className="text-xs font-medium text-slate-500">{offer.to}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <p className="text-2xl font-semibold tabular-nums text-slate-900">
          {formatPrice(offer.price, offer.currency)}
        </p>
        <div className="flex max-w-[16rem] flex-col items-end gap-1.5">
          <a
            href={href}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="btn-cta inline-flex rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition hover:bg-orange-600 hover:scale-[1.02]"
          >
            {t("flight.book")}
          </a>
          <p className="text-right text-[11px] font-medium leading-4 text-slate-500">
            {t("flight.noFees")}
          </p>
          <p className="text-right text-[11px] leading-4 text-slate-400">{t("flight.secureRedirect")}</p>
        </div>
      </div>
    </article>
  );
}
