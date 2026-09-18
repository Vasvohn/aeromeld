import { DISPLAY_PARTNERS } from "@/lib/partners";
import { SafePartnerLink } from "@/components/SafePartnerLink";
import { PartnerLogo } from "@/components/PartnerLogo";

function PartnerItems({ duplicate }: { duplicate?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-3 px-1.5" aria-hidden={duplicate || undefined}>
      {DISPLAY_PARTNERS.map((partner) => (
        <li key={`${duplicate ? "dup-" : ""}${partner.id}`} className="shrink-0">
          {duplicate ? (
            <span className="flex items-center gap-2 px-1">
              <PartnerLogo id={partner.id} name={partner.name} />
              <span className="text-sm font-semibold text-slate-700">{partner.name}</span>
            </span>
          ) : (
            <SafePartnerLink
              href={partner.href}
              className="flex items-center gap-2 px-1 transition hover:text-sky-800"
            >
              <PartnerLogo id={partner.id} name={partner.name} />
              <span className="text-sm font-semibold text-slate-700">{partner.name}</span>
            </SafePartnerLink>
          )}
        </li>
      ))}
    </ul>
  );
}

export function PartnerLogoRow({ labelledBy }: { labelledBy?: string }) {
  return (
    <div className="partner-marquee-mask overflow-hidden" {...(labelledBy ? { "aria-labelledby": labelledBy } : {})}>
      <div className="partner-marquee flex w-max items-center">
        <PartnerItems />
        <PartnerItems duplicate />
      </div>
    </div>
  );
}
