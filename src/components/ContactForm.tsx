"use client";

import { FormEvent, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { sanitizeEmail } from "@/lib/security";
import { CONTACT_EMAIL } from "@/lib/site";

function cleanName(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 80);
}

function cleanMessage(value: string) {
  return value.trim().slice(0, 2000);
}

const boxClass =
  "rounded-2xl border-4 border-blue-600 bg-white p-6 shadow-[0_18px_45px_rgba(37,99,235,0.4)] sm:p-8";

export function ContactForm() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "missing" | "invalid" | "sending" | "ok" | "error">(
    "idle",
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = cleanName(name);
    const nextEmail = sanitizeEmail(email);
    const nextMessage = cleanMessage(message);
    if (!nextName || !nextEmail || !nextMessage) {
      setStatus(!nextEmail && email.trim() ? "invalid" : "missing");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: nextName,
          email: nextEmail,
          message: nextMessage,
          _subject: `Contact Aeromeld — ${nextName}`,
          _replyto: nextEmail,
          _template: "table",
        }),
      });
      if (!response.ok) throw new Error("send-failed");
      setName("");
      setEmail("");
      setMessage("");
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "mt-1 w-full rounded-xl border border-sky-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-sky-500 focus:border-sky-500 focus:ring-2";

  if (status === "ok") {
    return (
      <div className={`${boxClass} text-center`} role="status" aria-live="polite">
        <p className="text-2xl font-bold text-sky-800">{t("contact.thanksTitle")}</p>
        <p className="mt-3 text-base leading-7 text-slate-700">{t("contact.thanks")}</p>
        <button
          type="button"
          className="mt-6 rounded-xl bg-sky-700 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-sky-700/25 hover:bg-sky-800"
          onClick={() => setStatus("idle")}
        >
          {t("contact.again")}
        </button>
      </div>
    );
  }

  return (
    <form id="contact-form" noValidate onSubmit={onSubmit} className={boxClass}>
      <div>
        <label htmlFor="contact-name" className="text-sm font-semibold text-slate-800">
          {t("contact.name")} <span className="text-red-600">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={80}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setStatus("idle");
          }}
          className={fieldClass}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="contact-email" className="text-sm font-semibold text-slate-800">
          {t("contact.email")} <span className="text-red-600">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={120}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus("idle");
          }}
          className={fieldClass}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="contact-message" className="text-sm font-semibold text-slate-800">
          {t("contact.message")} <span className="text-red-600">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          maxLength={2000}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setStatus("idle");
          }}
          className={`${fieldClass} min-h-[8rem] resize-y`}
        />
      </div>
      <p className="mt-3 text-xs text-slate-500">{t("contact.requiredHint")}</p>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 rounded-xl bg-sky-700 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-sky-700/25 hover:bg-sky-800 disabled:opacity-70"
      >
        {status === "sending" ? t("contact.sending") : t("contact.submit")}
      </button>
      {status === "missing" ? <p className="mt-3 text-sm font-medium text-red-700">{t("contact.missing")}</p> : null}
      {status === "invalid" ? <p className="mt-3 text-sm font-medium text-red-700">{t("contact.invalid")}</p> : null}
      {status === "error" ? (
        <p className="mt-3 text-sm font-medium text-red-700">
          {t("contact.error").replace("{email}", CONTACT_EMAIL)}
        </p>
      ) : null}
    </form>
  );
}
