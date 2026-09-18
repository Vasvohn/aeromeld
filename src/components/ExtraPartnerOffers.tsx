"use client";

import { AiraloCta } from "@/components/AiraloCta";
import { AirHelpCta } from "@/components/AirHelpCta";
import { CompensairCta } from "@/components/CompensairCta";
import { GigskyCta } from "@/components/GigskyCta";
import { KkdayCta } from "@/components/KkdayCta";

export function ExtraPartnerOffers({ className }: { className?: string }) {
  return (
    <div className={`grid gap-4 md:grid-cols-2 ${className ?? ""}`}>
      <AirHelpCta />
      <CompensairCta />
      <AiraloCta />
      <GigskyCta />
      <KkdayCta />
    </div>
  );
}
