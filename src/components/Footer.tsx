"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { useI18n } from "@/components/I18nProvider";
import { AIRALO_SHORT_LINK, AIRHELP_SHORT_LINK, AUTOEUROPE_SHORT_LINK, AVIASALES_SHORT_LINK, COMPENSAIR_SHORT_LINK, ECONOMYBOOKINGS_SHORT_LINK, GETRENTACAR_SHORT_LINK, GIGSKY_SHORT_LINK, KIWI_SHORT_LINK, KKDAY_SHORT_LINK } from "@/lib/partners";
import { PARTNER_LINK_REL } from "@/lib/security";
import { ContactEmailLink } from "@/components/ContactEmailLink";

export function Footer() {
  const { t, reopenCookies } = useI18n();

  return (
    <footer className="mt-auto border-t border-white/50 bg-white/70 backdrop-blur-md">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p>
            <BrandLogo className="h-10 w-auto" />
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{t("footer.tagline")}</p>
          <p className="mt-3 text-sm text-slate-600">
            {t("footer.contact")} <ContactEmailLink />
          </p>
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
          <p className="text-sm font-semibold text-slate-900">{t("footer.partners")}</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <a
                href={AVIASALES_SHORT_LINK}
                target="_blank"
                rel={PARTNER_LINK_REL}
                className="hover:text-sky-700"
              >
                Aviasales
              </a>
            </li>
            <li>
              <a
                href={KIWI_SHORT_LINK}
                target="_blank"
                rel={PARTNER_LINK_REL}
                className="hover:text-sky-700"
              >
                Kiwi.com
              </a>
            </li>
            <li>
              <a
                href={GETRENTACAR_SHORT_LINK}
                target="_blank"
                rel={PARTNER_LINK_REL}
                className="hover:text-sky-700"
              >
                GetRentacar
              </a>
            </li>
            <li>
              <a
                href={ECONOMYBOOKINGS_SHORT_LINK}
                target="_blank"
                rel={PARTNER_LINK_REL}
                className="hover:text-sky-700"
              >
                Economybookings
              </a>
            </li>
            <li>
              <a
                href={AUTOEUROPE_SHORT_LINK}
                target="_blank"
                rel={PARTNER_LINK_REL}
                className="hover:text-sky-700"
              >
                AutoEurope
              </a>
            </li>
            <li>
              <a
                href={AIRHELP_SHORT_LINK}
                target="_blank"
                rel={PARTNER_LINK_REL}
                className="hover:text-sky-700"
              >
                AirHelp
              </a>
            </li>
            <li>
              <a
                href={COMPENSAIR_SHORT_LINK}
                target="_blank"
                rel={PARTNER_LINK_REL}
                className="hover:text-sky-700"
              >
                Compensair
              </a>
            </li>
            <li>
              <a
                href={AIRALO_SHORT_LINK}
                target="_blank"
                rel={PARTNER_LINK_REL}
                className="hover:text-sky-700"
              >
                Airalo
              </a>
            </li>
            <li>
              <a
                href={GIGSKY_SHORT_LINK}
                target="_blank"
                rel={PARTNER_LINK_REL}
                className="hover:text-sky-700"
              >
                GigSky
              </a>
            </li>
            <li>
              <a
                href={KKDAY_SHORT_LINK}
                target="_blank"
                rel={PARTNER_LINK_REL}
                className="hover:text-sky-700"
              >
                KKday
              </a>
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
