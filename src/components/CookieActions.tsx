"use client";

import { useI18n } from "@/components/I18nProvider";

type Props = {
  size?: "banner" | "page";
};

export function CookieActions({ size = "banner" }: Props) {
  const { t, setCookieChoice } = useI18n();
  const large = size === "page";

  return (
    <div className={`flex shrink-0 ${large ? "flex-col gap-3 sm:flex-row" : "gap-2"}`}>
      <button
        type="button"
        onClick={() => setCookieChoice("refused")}
        className={`font-display rounded-full border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 ${
          large ? "px-6 py-3 text-sm" : "px-4 py-2 text-sm"
        }`}
      >
        {t("cookies.refuse")}
      </button>
      <button
        type="button"
        onClick={() => setCookieChoice("accepted")}
        className={`font-display rounded-full bg-orange-500 font-bold text-white shadow-md shadow-orange-500/25 hover:bg-orange-600 ${
          large ? "px-6 py-3 text-sm" : "px-4 py-2 text-sm"
        }`}
      >
        {t("cookies.accept")}
      </button>
    </div>
  );
}
