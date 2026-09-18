import type { Metadata } from "next";
import { ContactPageClient } from "@/components/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Formulaire de contact Aeromeld : nom, adresse mail et message.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
