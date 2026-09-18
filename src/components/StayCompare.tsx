"use client";

import { useI18n } from "@/components/I18nProvider";
import { SafePartnerLink } from "@/components/SafePartnerLink";
import { formatPrice } from "@/lib/search";
import { activityPartners, carPartners, destinationCity, hotelPartners } from "@/lib/stay";

type Props = {
  iata: string;
  checkin: string;
  checkout: string;
  variant?: "all" | "hotels" | "cars";
  heading?: "h2" | "h3";
  className?: string;
};

export function StayCompare({ iata, checkin, checkout, variant = "all", heading = "h2", className }: Props) {
  const { t } = useI18n();
  const city = destinationCity(iata);
  const hotels = hotelPartners(iata, checkin, checkout);
  const cars = carPartners(iata, checkin, checkout);
  const activities = activityPartners(iata);
  const Title = heading;
  const showHotels = variant !== "cars";
  const showCars = variant !== "hotels";
  const showActivities = variant === "all";
  const colCount = [showHotels, showCars, showActivities].filter(Boolean).length;
  const cols = colCount === 3 ? "lg:grid-cols-3" : colCount === 2 ? "lg:grid-cols-2" : "lg:grid-cols-1";

  return (
    <section className={`grid gap-6 ${cols} ${className ?? "mt-10"}`}>
      {showHotels ? (
      <article id="hotels" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="font-display text-xs font-medium uppercase tracking-wide text-orange-600">
          {t("stay.hotelsKicker")}
        </p>
        <Title className="mt-1 text-xl font-bold text-slate-900">
          {t("stay.hotelsTitle")} {city}
        </Title>
        <p className="mt-2 text-sm leading-6 text-slate-600">{t("stay.hotelsLead")}</p>
        <ul className="mt-4 space-y-3">
          {hotels.map((partner) => (
            <li
              key={partner.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-3 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800">{partner.name}</p>
                <p className="text-xs text-slate-500">
                  {t("results.fromPrice")} {formatPrice(partner.fromPrice)}
                </p>
              </div>
              <SafePartnerLink
                href={partner.href}
                className="btn-cta rounded-xl bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600"
              >
                {t("stay.bookHotel")}
              </SafePartnerLink>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[11px] text-slate-400">{t("flight.secureRedirect")}</p>
      </article>
      ) : null}
      {showCars ? (
      <article id="cars" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="font-display text-xs font-medium uppercase tracking-wide text-sky-700">
          {t("stay.carsKicker")}
        </p>
        <Title className="mt-1 text-xl font-bold text-slate-900">
          {t("stay.carsTitle")} {city}
        </Title>
        <p className="mt-2 text-sm leading-6 text-slate-600">{t("stay.carsLead")}</p>
        <ul className="mt-4 space-y-3">
          {cars.map((partner) => (
            <li
              key={partner.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-3 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800">{partner.name}</p>
                <p className="text-xs text-slate-500">
                  {t("results.fromPrice")} {formatPrice(partner.fromPrice)}
                </p>
              </div>
              <SafePartnerLink
                href={partner.href}
                className="btn-cta rounded-xl bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600"
              >
                {t("stay.rentCar")}
              </SafePartnerLink>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[11px] text-slate-400">{t("flight.secureRedirect")}</p>
      </article>
      ) : null}
      {showActivities ? (
      <article id="activities" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="font-display text-xs font-medium uppercase tracking-wide text-amber-700">
          {t("stay.activitiesKicker")}
        </p>
        <Title className="mt-1 text-xl font-bold text-slate-900">
          {t("stay.activitiesTitle")} {city}
        </Title>
        <p className="mt-2 text-sm leading-6 text-slate-600">{t("stay.activitiesLead")}</p>
        <ul className="mt-4 space-y-3">
          {activities.map((partner) => (
            <li
              key={partner.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-3 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800">{partner.name}</p>
                <p className="text-xs text-slate-500">
                  {t("results.fromPrice")} {formatPrice(partner.fromPrice)}
                </p>
              </div>
              <SafePartnerLink
                href={partner.href}
                className="btn-cta rounded-xl bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600"
              >
                {t("stay.bookActivity")}
              </SafePartnerLink>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[11px] text-slate-400">{t("flight.secureRedirect")}</p>
      </article>
      ) : null}
    </section>
  );
}
