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
    network: "Tequila / Kiwi",
    color: "#00A991",
  },
};

export function affiliateMarker() {
  return process.env.FLYUS_AFFILIATE_MARKER || "flyus-demo";
}
