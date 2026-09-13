"use client";

import { useI18n } from "@/components/I18nProvider";
import Link from "next/link";

export default function HowPage() {
  const { t } = useI18n();
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="animate-fade-up text-3xl font-semibold">{t("how.title")}</h1>
      <div className="mt-6 space-y-4 leading-7 text-slate-700">
        <p>{t("how.p1")}</p>
        <ol className="list-decimal space-y-3 pl-5">
          <li>{t("how.li1")}</li>
          <li>{t("how.li2")}</li>
          <li>{t("how.li3")}</li>
        </ol>
        <p>{t("how.p2")}</p>
        <p>
          <Link href="/affiliation" className="text-sky-700 underline">
            {t("how.p3")}
          </Link>
        </p>
      </div>
    </main>
  );
}
