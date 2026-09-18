"use client";

import { useI18n } from "@/components/I18nProvider";
import { ContactEmailLink } from "@/components/ContactEmailLink";

export default function MentionsPage() {
  const { t } = useI18n();
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="animate-fade-up text-3xl font-semibold">{t("legal.title")}</h1>
      <div className="mt-6 space-y-8 leading-7 text-slate-700">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">{t("legal.hEditor")}</h2>
          <p className="mt-3">{t("legal.p1")}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900">{t("legal.hHost")}</h2>
          <p className="mt-3">{t("legal.p2")}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900">{t("legal.hContact")}</h2>
          <p className="mt-3">
            {t("legal.p3")} <ContactEmailLink />
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900">{t("legal.hActivity")}</h2>
          <p className="mt-3">{t("legal.p4")}</p>
        </section>
      </div>
    </main>
  );
}
