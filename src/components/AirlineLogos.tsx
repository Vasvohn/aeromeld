"use client";

import { useI18n } from "@/components/I18nProvider";

const CARRIERS = [
  { name: "Air France", color: "#002157" },
  { name: "easyJet", color: "#FF6600" },
  { name: "Emirates", color: "#D71921" },
  { name: "Transavia", color: "#00D66C" },
  { name: "Ryanair", color: "#073590" },
  { name: "KLM", color: "#00A1DE" },
  { name: "Lufthansa", color: "#05164D" },
  { name: "Royal Air Maroc", color: "#C8102E" },
] as const;

export function AirlineLogos({ onDark = false }: { onDark?: boolean }) {
  const { t } = useI18n();
  return (
    <div className="mt-5" aria-label={t("airlines.aria")}>
      <p className={`mb-2 text-xs font-medium uppercase tracking-wide ${onDark ? "text-sky-100" : "text-slate-500"}`}>
        {t("airlines.caption")}
      </p>
      <ul className="flex flex-wrap gap-2">
        {CARRIERS.map((carrier) => (
          <li
            key={carrier.name}
            className={`rounded-lg px-3 py-1.5 text-sm font-extrabold tracking-tight shadow-sm ${
              onDark ? "bg-white" : "bg-white ring-1 ring-slate-200"
            }`}
            style={{ color: carrier.color }}
          >
            {carrier.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
