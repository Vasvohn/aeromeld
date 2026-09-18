"use client";

import { useI18n } from "@/components/I18nProvider";
import { ContactEmailLink } from "@/components/ContactEmailLink";

export default function PrivacyPage() {
  const { t } = useI18n();
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="animate-fade-up text-3xl font-semibold">{t("privacy.title")}</h1>
      <div className="mt-6 space-y-4 leading-7 text-slate-700">
        <p>{t("privacy.p1")}</p>
        <p>{t("privacy.p2")}</p>
        <p>{t("privacy.p3")}</p>
        <p>
          {t("privacy.p4")}{" "}
          <ContactEmailLink />
        </p>
      </div>
    </main>
  );
}
