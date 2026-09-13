"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { useI18n } from "@/components/I18nProvider";

export function Footer() {
  const { t, reopenCookies } = useI18n();

  return (
    <footer className="mt-auto border-t border-white/50 bg-white/70 backdrop-blur-md">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p>
            <BrandLogo className="h-10 w-auto" />
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{t("footer.tagline")}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{t("footer.explore")}</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/destinations" className="hover:text-sky-700">
                {t("nav.destinations")}
              </Link>
            </li>
            <li>
              <Link href="/comment-ca-marche" className="hover:text-sky-700">
                {t("nav.how")}
              </Link>
            </li>
            <li>
              <Link href="/guides" className="hover:text-sky-700">
                {t("nav.guides")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{t("footer.legal")}</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/affiliation" className="hover:text-sky-700">
                {t("footer.affiliation")}
              </Link>
            </li>
            <li>
              <Link href="/mentions-legales" className="hover:text-sky-700">
                {t("footer.legalNotice")}
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="hover:text-sky-700">
                {t("footer.privacy")}
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-sky-700">
                {t("footer.cookies")}
              </Link>
            </li>
            <li>
              <button type="button" onClick={reopenCookies} className="hover:text-sky-700">
                {t("footer.cookieSettings")}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <p className="border-t border-sky-100 py-4 text-center text-xs text-slate-500">{t("footer.copy")}</p>
    </footer>
  );
}
