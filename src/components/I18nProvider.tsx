"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  COOKIE_KEY,
  dictionaries,
  LANG_KEY,
  LOCALES,
  type Locale,
} from "@/lib/i18n";

type CookieChoice = "accepted" | "refused" | null;

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  cookieChoice: CookieChoice;
  setCookieChoice: (choice: Exclude<CookieChoice, null>) => void;
  reopenCookies: () => void;
  cookiesOpen: boolean;
  ready: boolean;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function detectLocale(): Locale {
  const saved = window.localStorage.getItem(LANG_KEY);
  if (saved && LOCALES.some((l) => l.code === saved)) return saved as Locale;
  const nav = navigator.language.slice(0, 2).toLowerCase();
  if (LOCALES.some((l) => l.code === nav)) return nav as Locale;
  return "fr";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");
  const [cookieChoice, setCookieChoiceState] = useState<CookieChoice>(null);
  const [cookiesOpen, setCookiesOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const nextLocale = detectLocale();
    setLocaleState(nextLocale);
    document.documentElement.lang = nextLocale;
    const saved = window.localStorage.getItem(COOKIE_KEY);
    if (saved === "accepted" || saved === "refused") {
      setCookieChoiceState(saved);
      setCookiesOpen(false);
    } else {
      setCookiesOpen(true);
    }
    setReady(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    document.documentElement.lang = next;
    window.localStorage.setItem(LANG_KEY, next);
  }, []);

  const setCookieChoice = useCallback((choice: Exclude<CookieChoice, null>) => {
    setCookieChoiceState(choice);
    window.localStorage.setItem(COOKIE_KEY, choice);
    setCookiesOpen(false);
  }, []);

  const reopenCookies = useCallback(() => {
    setCookiesOpen(true);
  }, []);

  const t = useCallback(
    (key: string) => dictionaries[locale][key] ?? dictionaries.fr[key] ?? key,
    [locale],
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      cookieChoice,
      setCookieChoice,
      reopenCookies,
      cookiesOpen,
      ready,
    }),
    [locale, setLocale, t, cookieChoice, setCookieChoice, reopenCookies, cookiesOpen, ready],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
