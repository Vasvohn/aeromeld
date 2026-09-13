"use client";

import { useI18n } from "@/components/I18nProvider";

export default function AffiliationPage() {
  const { t } = useI18n();
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="animate-fade-up text-3xl font-semibold">{t("aff.title")}</h1>
      <div className="mt-6 space-y-4 leading-7 text-slate-700">
        <p>{t("aff.p1")}</p>
        <p>{t("aff.p2")}</p>
        <p>{t("aff.p3")}</p>
      </div>
    </main>
  );
}
