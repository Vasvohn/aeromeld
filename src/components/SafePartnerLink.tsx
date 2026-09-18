import { PARTNER_LINK_REL, safePartnerHref } from "@/lib/security";
import type { ReactNode } from "react";

type Props = {
  href: string;
  fallback?: string;
  className?: string;
  children: ReactNode;
};

export function SafePartnerLink({ href, fallback = "/", className, children }: Props) {
  const safe = safePartnerHref(href, fallback);
  const external = safe.startsWith("https://");
  return (
    <a
      href={safe}
      className={className}
      {...(external ? { target: "_blank", rel: PARTNER_LINK_REL } : {})}
    >
      {children}
    </a>
  );
}
