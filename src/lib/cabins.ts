import type { CabinClass, CabinFilter } from "./types";

export const CABIN_CLASSES: CabinClass[] = ["economy", "premium", "business", "first"];

export const CABIN_FILTERS: CabinFilter[] = ["all", ...CABIN_CLASSES];

export const CABIN_PRICE_FACTOR: Record<CabinClass, number> = {
  economy: 1,
  premium: 1.58,
  business: 2.85,
  first: 4.45,
};

const LOW_COST = new Set(["FR", "U2", "TO"]);

export function airlinesForCabin(cabin: CabinClass, airlines: { code: string; name: string }[]) {
  if (cabin === "economy" || cabin === "premium") return airlines;
  return airlines.filter((a) => !LOW_COST.has(a.code));
}

export function partnerCabinParam(partner: string, cabin: CabinClass) {
  const kayak = { economy: "e", premium: "p", business: "b", first: "f" }[cabin];
  const sky = {
    economy: "economy",
    premium: "premiumeconomy",
    business: "business",
    first: "first",
  }[cabin];
  const kiwi = {
    economy: "ECONOMY",
    premium: "PREMIUM_ECONOMY",
    business: "BUSINESS",
    first: "FIRST_CLASS",
  }[cabin];
  const avia = { economy: "Y", premium: "W", business: "C", first: "F" }[cabin];
  if (partner === "kayak") return `cabin=${kayak}`;
  if (partner === "skyscanner") return `cabinclass=${sky}`;
  if (partner === "expedia") return `cabinclass=${sky}`;
  if (partner === "kiwi") return `cabinClass=${kiwi}`;
  return `cabin=${avia}`;
}
