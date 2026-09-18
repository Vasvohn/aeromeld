"use client";

import { useI18n } from "@/components/I18nProvider";
import { SafePartnerLink } from "@/components/SafePartnerLink";
import { AIRALO_SHORT_LINK } from "@/lib/partners";

export function AiraloCta({ className }: { className?: string }) {
  const { t } = useI18n();

  return (
    <article
      className={`rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white p-5 shadow-sm ${className ?? ""}`}
    >
      <p className="font-display text-xs font-medium uppercase tracking-wide text-cyan-800">
        {t("airalo.kicker")}
      </p>
      <h2 className="mt-1 text-xl font-bold text-slate-900">{t("airalo.title")}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{t("airalo.text")}</p>
      <SafePartnerLink
        href={AIRALO_SHORT_LINK}
        className="btn-cta mt-4 inline-flex rounded-xl bg-cyan-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-cyan-800"
      >
        {t("airalo.cta")}
      </SafePartnerLink>
    </article>
  );
}
