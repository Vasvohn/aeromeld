"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { CookieActions } from "@/components/CookieActions";
import { useI18n } from "@/components/I18nProvider";

export function CookieBanner() {
  const { t, cookiesOpen, ready } = useI18n();
  const pathname = usePathname();
  const onCookiesPage = pathname.replace(/\/$/, "") === "/cookies";
  const visible = ready && cookiesOpen && !onCookiesPage;

  useEffect(() => {
    if (!visible) {
      document.body.style.paddingBottom = "";
      return;
    }
    document.body.style.paddingBottom = "9rem";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-labelledby="cookie-banner-title"
      className="cookie-banner fixed inset-x-0 bottom-0 z-[100] border-t border-slate-200 bg-white px-4 py-3 shadow-[0_-12px_40px_-16px_rgba(15,23,42,0.35)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p id="cookie-banner-title" className="font-display text-sm font-bold text-slate-900">
            {t("cookies.title")}
          </p>
          <p className="mt-0.5 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
            {t("cookies.banner")}{" "}
            <Link href="/cookies" className="font-semibold text-sky-700 underline-offset-2 hover:underline">
              {t("cookies.more")}
            </Link>
          </p>
        </div>
        <CookieActions />
      </div>
    </div>
  );
}
