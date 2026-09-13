"use client";

import { useI18n } from "@/components/I18nProvider";

export function TrustBadges({ onDark = false }: { onDark?: boolean }) {
  const { t } = useI18n();
  const items = [
    { icon: "✈️", label: t("trust.airlines") },
    { icon: "🔒", label: t("trust.secure") },
    { icon: "💡", label: t("trust.realtime") },
  ];

  return (
    <ul
      className={`mt-5 grid gap-2 sm:grid-cols-3 ${onDark ? "text-white" : "text-slate-700"}`}
      aria-label={t("trust.aria")}
    >
      {items.map((item) => (
        <li
          key={item.icon}
          className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium ${
            onDark
              ? "bg-white/15 ring-1 ring-white/25 backdrop-blur-sm"
              : "bg-white ring-1 ring-slate-200 shadow-sm"
          }`}
        >
          <span aria-hidden className="text-base">
            {item.icon}
          </span>
          <span className="leading-snug">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
