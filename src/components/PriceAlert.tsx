"use client";

import { FormEvent, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { sanitizeEmail } from "@/lib/security";

const ALERT_KEY = "flyus-price-alerts-v1";

export function PriceAlert({ from, to, destination }: { from?: string; to?: string; destination?: string }) {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "invalid">("idle");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const clean = sanitizeEmail(email);
    if (!clean) {
      setStatus("invalid");
      return;
    }
    const payload = {
      email: clean,
      from: from || "",
      to: to || "",
      destination: destination || `${from || ""}-${to || ""}`,
      createdAt: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem(ALERT_KEY) || "[]") as unknown[];
      const next = Array.isArray(existing) ? [...existing.slice(-49), payload] : [payload];
      localStorage.setItem(ALERT_KEY, JSON.stringify(next));
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("ok");
    }
  }

  return (
    <section className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
      <h2 className="text-lg font-semibold text-slate-900">{t("alert.title")}</h2>
      <p className="mt-1 text-sm text-slate-600">{t("alert.lead")}</p>
      <form className="mt-3 flex flex-col gap-2 sm:flex-row" onSubmit={onSubmit}>
        <label className="sr-only" htmlFor="price-alert-email">
          {t("alert.email")}
        </label>
        <input
          id="price-alert-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus("idle");
          }}
          placeholder={t("alert.placeholder")}
          className="w-full rounded-xl border border-orange-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-orange-400 focus:ring-2"
        />
        <button type="submit" className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-600">
          {t("alert.submit")}
        </button>
      </form>
      {status === "ok" ? <p className="mt-2 text-sm font-medium text-emerald-800">{t("alert.ok")}</p> : null}
      {status === "invalid" ? <p className="mt-2 text-sm font-medium text-red-700">{t("alert.invalid")}</p> : null}
    </section>
  );
}
