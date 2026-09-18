"use client";

import { ContactForm } from "@/components/ContactForm";
import { useI18n } from "@/components/I18nProvider";
import { CONTACT_EMAIL } from "@/lib/site";

export function ContactPageClient() {
  const { t } = useI18n();
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="animate-fade-up text-3xl font-semibold">{t("contact.title")}</h1>
      <p className="mt-3 text-slate-600">{t("contact.lead").replace("{email}", CONTACT_EMAIL)}</p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </main>
  );
}
