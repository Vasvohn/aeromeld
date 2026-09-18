"use client";

import { LOCALES } from "@/lib/i18n";
import { useI18n } from "@/components/I18nProvider";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <label className="flex items-center gap-1.5 text-sm text-slate-600">
      <span className="sr-only">{t("lang.label")}</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as typeof locale)}
        suppressHydrationWarning
        className="cursor-pointer rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold tracking-wide text-slate-700 outline-none hover:border-sky-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-500"
      >
        {LOCALES.map((item) => (
          <option key={item.code} value={item.code}>
            {item.label} · {item.name}
          </option>
        ))}
      </select>
    </label>
  );
}
