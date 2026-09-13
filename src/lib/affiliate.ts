import { partnerCabinParam } from "./cabins";
import { affiliateMarker } from "./partners";
import { isSafePartnerUrl, sanitizeDate, sanitizeIata } from "./security";
import type { FlightOffer } from "./types";

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
  if (!from || !to || !depart) return "https://www.aviasales.com/";

  let url = "https://www.aviasales.com/";
  switch (offer.partner) {
    case "aviasales": {
      const code = `${from}${yymmdd(depart)}${to}${ret ? yymmdd(ret) : ""}1`;
      url = `https://www.aviasales.com/search/${code}?marker=${marker}&utm_source=flyus&${partnerCabinParam("aviasales", offer.cabin)}`;
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
    case "kiwi":
      url = `https://www.kiwi.com/fr/search/results/${from}/${to}/${depart}${ret ? `/${ret}` : ""}?affiliate=${marker}&${partnerCabinParam("kiwi", offer.cabin)}`;
      break;
    default:
      break;
  }
  return isSafePartnerUrl(url) ? url : "https://www.aviasales.com/";
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
    const json = JSON.parse(fromBase64Url(payload));
    if (!json?.id || !json?.partner || !json?.from || !json?.to) return null;
    return json as FlightOffer;
  } catch {
    return null;
  }
}

export function encodeOfferPayload(offer: FlightOffer) {
  return toBase64Url(JSON.stringify(offer));
}
