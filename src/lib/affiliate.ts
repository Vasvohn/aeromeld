import { partnerCabinParam } from "./cabins";
import { AVIASALES_MARKER, AVIASALES_SHORT_LINK, KIWI_AFFIL_ID, affiliateMarker, aviasalesTrackedUrl, kiwiTrackedUrl } from "./partners";
import { isSafePartnerUrl, sanitizeDate, sanitizeIata } from "./security";
import type { CabinClass, FlightOffer, PartnerId } from "./types";

const PARTNER_IDS: PartnerId[] = ["aviasales", "skyscanner", "kayak", "expedia", "kiwi"];
const CABINS: CabinClass[] = ["economy", "premium", "business", "first"];

function yymmdd(isoDate: string) {
  const [y, m, d] = isoDate.split("-");
  return `${y?.slice(2) ?? ""}${m ?? ""}${d ?? ""}`;
}

export function buildPartnerUrl(offer: FlightOffer) {
  const marker = encodeURIComponent(affiliateMarker());
  const from = sanitizeIata(offer.from);
  const to = sanitizeIata(offer.to);
  const depart = sanitizeDate(offer.departDate);
  const ret = offer.returnDate ? sanitizeDate(offer.returnDate) : "";
  if (!from || !to || !depart) return AVIASALES_SHORT_LINK;

  let url = AVIASALES_SHORT_LINK;
  switch (offer.partner) {
    case "aviasales": {
      const code = `${from}${yymmdd(depart)}${to}${ret ? yymmdd(ret) : ""}1`;
      const search = `https://www.aviasales.com/search/${code}?marker=${AVIASALES_MARKER}&utm_source=flyus&${partnerCabinParam("aviasales", offer.cabin)}`;
      url = aviasalesTrackedUrl(search);
      break;
    }
    case "skyscanner":
      url = `https://www.skyscanner.fr/transport/vols/${from}/${to}/${depart.replaceAll("-", "")}/${ret ? ret.replaceAll("-", "") + "/" : ""}?adultsv2=1&affiliate=${marker}&${partnerCabinParam("skyscanner", offer.cabin)}`;
      break;
    case "kayak":
      url = `https://www.kayak.fr/flights/${from}-${to}/${depart}${ret ? `/${ret}` : ""}?sort=bestflight_a&affiliate=${marker}&${partnerCabinParam("kayak", offer.cabin)}`;
      break;
    case "expedia":
      url = `https://www.expedia.fr/Flights-Search?leg1=from:${from},to:${to},departure:${depart}TANYT&mode=search&passengers=adults:1&affcid=${marker}&${partnerCabinParam("expedia", offer.cabin)}`;
      break;
    case "kiwi": {
      const search = `https://www.kiwi.com/fr/search/results/${from}/${to}/${depart}${ret ? `/${ret}` : ""}?affilid=${KIWI_AFFIL_ID}&${partnerCabinParam("kiwi", offer.cabin)}`;
      url = kiwiTrackedUrl(search);
      break;
    }
    default:
      break;
  }
  return isSafePartnerUrl(url) ? url : AVIASALES_SHORT_LINK;
}

function toBase64Url(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(payload: string) {
  const padded = payload.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((payload.length + 3) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function parseOfferPayload(payload: string): FlightOffer | null {
  try {
    if (typeof payload !== "string" || payload.length > 4000) return null;
    const json = JSON.parse(fromBase64Url(payload)) as Partial<FlightOffer>;
    const from = sanitizeIata(String(json.from ?? ""));
    const to = sanitizeIata(String(json.to ?? ""));
    const departDate = sanitizeDate(String(json.departDate ?? ""));
    if (!from || !to || !departDate) return null;
    if (!PARTNER_IDS.includes(json.partner as PartnerId)) return null;
    if (!CABINS.includes(json.cabin as CabinClass)) return null;
    if (typeof json.id !== "string" || json.id.length > 80) return null;
    return {
      ...json,
      from,
      to,
      departDate,
      returnDate: json.returnDate ? sanitizeDate(json.returnDate) || undefined : undefined,
      baggage: json.baggage === "personal" || json.baggage === "cabin" ? json.baggage : "cabin",
    } as FlightOffer;
  } catch {
    return null;
  }
}

export function encodeOfferPayload(offer: FlightOffer) {
  return toBase64Url(JSON.stringify(offer));
}
