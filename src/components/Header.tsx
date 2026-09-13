"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/components/I18nProvider";

export function Header() {
  const { t } = useI18n();
  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/destinations", label: t("nav.destinations") },
    { href: "/comment-ca-marche", label: t("nav.how") },
    { href: "/guides", label: t("nav.guides") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Aeromeld home">
          <BrandLogo />
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-sky-700">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/guides" className="text-sm font-medium text-slate-600 hover:text-sky-700 md:hidden">
            {t("nav.guides")}
          </Link>
          <LanguageSwitcher />
          <Link
            href="/#recherche"
            className="font-display rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-orange-300 hover:text-orange-600 sm:px-4"
          >
            {t("nav.search")}
          </Link>
        </div>
      </div>
    </header>
  );
}
