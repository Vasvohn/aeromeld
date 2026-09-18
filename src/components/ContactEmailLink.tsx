import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";

export function ContactEmailLink({ className }: { className?: string }) {
  return (
    <Link href="/contact" className={className ?? "font-medium text-sky-700 hover:underline"}>
      {CONTACT_EMAIL}
    </Link>
  );
}
