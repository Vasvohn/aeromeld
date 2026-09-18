"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/components/I18nProvider";

export function Header() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = "site-mobile-menu";

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/destinations", label: t("nav.destinations") },
    { href: "/comment-ca-marche", label: t("nav.how") },
    { href: "/guides", label: t("nav.guides") },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onResize() {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(false);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Aeromeld home" onClick={() => setOpen(false)}>
          <BrandLogo />
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 md:flex" aria-label={t("nav.menu")}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-sky-700">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <Link
            href="/#recherche"
            className="hidden font-display rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-orange-300 hover:text-orange-600 md:inline-flex"
          >
            {t("nav.search")}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm md:hidden"
            aria-controls={menuId}
            aria-expanded={open}
            aria-label={open ? t("nav.close") : t("nav.menu")}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {open ? (
        <div className="md:hidden">
          <div
            className="fixed inset-0 top-16 z-40 bg-slate-900/40"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <nav
            id={menuId}
            aria-label={t("nav.menu")}
            className="relative z-50 border-t border-slate-200 bg-white px-4 py-4 shadow-lg"
          >
            <div className="flex flex-col gap-1 text-base font-medium text-slate-700">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-3 hover:bg-sky-50 hover:text-sky-800"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-3 border-t border-slate-100 pt-3">
              <LanguageSwitcher />
              <Link
                href="/#recherche"
                className="font-display rounded-full border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-800 shadow-sm hover:border-orange-300 hover:text-orange-600"
                onClick={() => setOpen(false)}
              >
                {t("nav.search")}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
