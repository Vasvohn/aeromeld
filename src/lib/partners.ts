import type { PartnerId } from "./types";

export const PARTNERS: Record<
  PartnerId,
  { id: PartnerId; name: string; network: string; color: string }
> = {
  aviasales: {
    id: "aviasales",
    name: "Aviasales",
    network: "Travelpayouts",
    color: "#F97316",
  },
  skyscanner: {
    id: "skyscanner",
    name: "Skyscanner",
    network: "Skyscanner Affiliate",
    color: "#0770E3",
  },
  kayak: {
    id: "kayak",
    name: "Kayak",
    network: "Kayak Affiliate Network",
    color: "#FF690F",
  },
  expedia: {
    id: "expedia",
    name: "Expedia",
    network: "Expedia Partner Solutions",
    color: "#FBC41D",
  },
  kiwi: {
    id: "kiwi",
    name: "Kiwi.com",
    network: "Travelpayouts",
    color: "#00A991",
  },
};

/** Lien Travelpayouts Aviasales (https://aviasales.tpo.mx/QpOhsvt3). */
export const AVIASALES_SHORT_LINK = "https://aviasales.tpo.mx/QpOhsvt3";
export const AVIASALES_MARKER = "778034";
export const AVIASALES_PROGRAM_ID = "4114";
export const TRAVELPAYOUTS_TRS = "574345";

/** Lien Travelpayouts AirHelp (https://airhelp.tpo.mx/ugHxv2Zw). */
export const AIRHELP_SHORT_LINK = "https://airhelp.tpo.mx/ugHxv2Zw";

/** Lien Travelpayouts Compensair (https://compensair.tpo.mx/88UdrSKn). */
export const COMPENSAIR_SHORT_LINK = "https://compensair.tpo.mx/88UdrSKn";

/** Lien Travelpayouts Airalo (https://airalo.tpo.mx/HlnYQkLC). */
export const AIRALO_SHORT_LINK = "https://airalo.tpo.mx/HlnYQkLC";

/** Lien Travelpayouts GigSky (https://gigsky.tpo.mx/5OA3v8ew). */
export const GIGSKY_SHORT_LINK = "https://gigsky.tpo.mx/5OA3v8ew";

/** Lien Travelpayouts Kiwi (https://kiwi.tpo.mx/pd9rUgDa). */
export const KIWI_SHORT_LINK = "https://kiwi.tpo.mx/pd9rUgDa";
export const KIWI_CAMPAIGN_ID = "111";
export const KIWI_AFFIL_ID = "travelpayoutsdeeplink";

/** Lien Travelpayouts GetRentacar (https://getrentacar.tpo.mx/4JTlC0fB). */
export const GETRENTACAR_SHORT_LINK = "https://getrentacar.tpo.mx/4JTlC0fB";
export const GETRENTACAR_PROGRAM_ID = "5996";
export const GETRENTACAR_CAMPAIGN_ID = "222";

/** Lien Travelpayouts KKday (https://kkday.tpo.mx/juUUZObY). */
export const KKDAY_SHORT_LINK = "https://kkday.tpo.mx/juUUZObY";
export const KKDAY_PROGRAM_ID = "9074";
export const KKDAY_CAMPAIGN_ID = "633";

/** Lien Travelpayouts AutoEurope (https://autoeurope.tpo.mx/O17Wihbj). */
export const AUTOEUROPE_SHORT_LINK = "https://autoeurope.tpo.mx/O17Wihbj";
export const AUTOEUROPE_CAMPAIGN_ID = "143";

/** Lien Travelpayouts Economybookings (https://economybookings.tpo.mx/NMSpdCJy). */
export const ECONOMYBOOKINGS_SHORT_LINK = "https://economybookings.tpo.mx/NMSpdCJy";
export const ECONOMYBOOKINGS_PROGRAM_ID = "2018";
export const ECONOMYBOOKINGS_CAMPAIGN_ID = "10";

export const DISPLAY_PARTNERS = [
  { id: "aviasales", name: "Aviasales", href: AVIASALES_SHORT_LINK },
  { id: "kiwi", name: "Kiwi.com", href: KIWI_SHORT_LINK },
  { id: "getrentacar", name: "GetRentacar", href: GETRENTACAR_SHORT_LINK },
  { id: "economybookings", name: "Economybookings", href: ECONOMYBOOKINGS_SHORT_LINK },
  { id: "autoeurope", name: "AutoEurope", href: AUTOEUROPE_SHORT_LINK },
  { id: "airhelp", name: "AirHelp", href: AIRHELP_SHORT_LINK },
  { id: "compensair", name: "Compensair", href: COMPENSAIR_SHORT_LINK },
  { id: "airalo", name: "Airalo", href: AIRALO_SHORT_LINK },
  { id: "gigsky", name: "GigSky", href: GIGSKY_SHORT_LINK },
  { id: "kkday", name: "KKday", href: KKDAY_SHORT_LINK },
] as const;

export type DisplayPartnerId = (typeof DISPLAY_PARTNERS)[number]["id"];

export function affiliateMarker() {
  return (
    process.env.NEXT_PUBLIC_FLYUS_AFFILIATE_MARKER ||
    process.env.FLYUS_AFFILIATE_MARKER ||
    AVIASALES_MARKER
  );
}

export function aviasalesTrackedUrl(destinationUrl: string) {
  const tracked = new URL("https://tp.media/r");
  tracked.searchParams.set("campaign_id", "100");
  tracked.searchParams.set("marker", AVIASALES_MARKER);
  tracked.searchParams.set("p", AVIASALES_PROGRAM_ID);
  tracked.searchParams.set("trs", TRAVELPAYOUTS_TRS);
  tracked.searchParams.set("u", destinationUrl);
  return tracked.toString();
}

export function kiwiTrackedUrl(destinationUrl: string) {
  const tracked = new URL("https://tp.media/r");
  tracked.searchParams.set("campaign_id", KIWI_CAMPAIGN_ID);
  tracked.searchParams.set("marker", AVIASALES_MARKER);
  tracked.searchParams.set("trs", TRAVELPAYOUTS_TRS);
  tracked.searchParams.set("u", destinationUrl);
  return tracked.toString();
}

export function getrentacarTrackedUrl(destinationUrl: string) {
  const tracked = new URL("https://tp.media/r");
  tracked.searchParams.set("campaign_id", GETRENTACAR_CAMPAIGN_ID);
  tracked.searchParams.set("marker", AVIASALES_MARKER);
  tracked.searchParams.set("p", GETRENTACAR_PROGRAM_ID);
  tracked.searchParams.set("trs", TRAVELPAYOUTS_TRS);
  tracked.searchParams.set("u", destinationUrl);
  return tracked.toString();
}

export function kkdayTrackedUrl(destinationUrl: string) {
  const tracked = new URL("https://tp.media/r");
  tracked.searchParams.set("campaign_id", KKDAY_CAMPAIGN_ID);
  tracked.searchParams.set("marker", AVIASALES_MARKER);
  tracked.searchParams.set("p", KKDAY_PROGRAM_ID);
  tracked.searchParams.set("trs", TRAVELPAYOUTS_TRS);
  tracked.searchParams.set("u", destinationUrl);
  return tracked.toString();
}

export function autoeuropeTrackedUrl(destinationUrl: string) {
  const tracked = new URL("https://tp.media/r");
  tracked.searchParams.set("campaign_id", AUTOEUROPE_CAMPAIGN_ID);
  tracked.searchParams.set("marker", AVIASALES_MARKER);
  tracked.searchParams.set("trs", TRAVELPAYOUTS_TRS);
  tracked.searchParams.set("u", destinationUrl);
  return tracked.toString();
}

export function economybookingsTrackedUrl(destinationUrl: string) {
  const tracked = new URL("https://tp.media/r");
  tracked.searchParams.set("campaign_id", ECONOMYBOOKINGS_CAMPAIGN_ID);
  tracked.searchParams.set("marker", AVIASALES_MARKER);
  tracked.searchParams.set("p", ECONOMYBOOKINGS_PROGRAM_ID);
  tracked.searchParams.set("trs", TRAVELPAYOUTS_TRS);
  tracked.searchParams.set("u", destinationUrl);
  return tracked.toString();
}
