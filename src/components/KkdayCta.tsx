"use client";

import { useI18n } from "@/components/I18nProvider";
import { SafePartnerLink } from "@/components/SafePartnerLink";
import { KKDAY_SHORT_LINK } from "@/lib/partners";

export function KkdayCta({ className }: { className?: string }) {
  const { t } = useI18n();

  return (
    <article
      className={`rounded-3xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm ${className ?? ""}`}
    >
      <p className="font-display text-xs font-medium uppercase tracking-wide text-amber-800">
        {t("kkday.kicker")}
      </p>
      <h2 className="mt-1 text-xl font-bold text-slate-900">{t("kkday.title")}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{t("kkday.text")}</p>
      <SafePartnerLink
        href={KKDAY_SHORT_LINK}
        className="btn-cta mt-4 inline-flex rounded-xl bg-amber-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-amber-800"
      >
        {t("kkday.cta")}
      </SafePartnerLink>
    </article>
  );
}
