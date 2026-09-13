"use client";

import { useI18n } from "@/components/I18nProvider";

export function AffiliateBanner() {
  const { t } = useI18n();
  return (
    <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
      <strong>{t("affiliate.title")}</strong> {t("affiliate.text")}
    </p>
  );
}
