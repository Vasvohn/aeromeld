"use client";

import { useI18n } from "@/components/I18nProvider";
import { SafePartnerLink } from "@/components/SafePartnerLink";
import { COMPENSAIR_SHORT_LINK } from "@/lib/partners";

export function CompensairCta({ className }: { className?: string }) {
  const { t } = useI18n();

  return (
    <article
      className={`rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-5 shadow-sm ${className ?? ""}`}
    >
      <p className="font-display text-xs font-medium uppercase tracking-wide text-indigo-800">
        {t("compensair.kicker")}
      </p>
      <h2 className="mt-1 text-xl font-bold text-slate-900">{t("compensair.title")}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{t("compensair.text")}</p>
      <SafePartnerLink
        href={COMPENSAIR_SHORT_LINK}
        className="btn-cta mt-4 inline-flex rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-800"
      >
        {t("compensair.cta")}
      </SafePartnerLink>
    </article>
  );
}
