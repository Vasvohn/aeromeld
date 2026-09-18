"use client";

import { CookieActions } from "@/components/CookieActions";
import { useI18n } from "@/components/I18nProvider";

export default function CookiesPage() {
  const { t, cookieChoice } = useI18n();
  const status =
    cookieChoice === "accepted"
      ? t("cookies.statusAccepted")
      : cookieChoice === "refused"
        ? t("cookies.statusRefused")
        : t("cookies.statusNone");

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="animate-fade-up text-3xl font-extrabold">{t("cook.title")}</h1>
      <div className="mt-6 space-y-4 leading-7 text-slate-700">
        <p>{t("cook.p1")}</p>
        <p>{t("cook.p2")}</p>
        <p>{t("cook.p3")}</p>
      </div>
      <section className="mt-10 mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/10">
        <h2 className="font-display text-lg font-bold text-slate-900">{t("cookies.title")}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{t("cookies.banner")}</p>
        <p className="mt-3 text-sm font-medium text-slate-500">{status}</p>
        <div className="mt-5">
          <CookieActions size="page" />
        </div>
      </section>
    </main>
  );
}
