export function sanitizeIata(value: string) {
  const code = value.trim().toUpperCase().replace(/[^A-Z]/g, "");
  return /^[A-Z]{3}$/.test(code) ? code : "";
}

export function sanitizeDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";
  const time = Date.parse(`${value}T00:00:00Z`);
  if (!Number.isFinite(time)) return "";
  return value;
}

export function sanitizeAdults(value: string | number) {
  const n = typeof value === "number" ? value : Number.parseInt(value, 10);
  if (!Number.isFinite(n)) return 1;
  return Math.min(9, Math.max(1, Math.trunc(n)));
}

export function sanitizeTrip(value: string | null) {
  return value === "oneway" ? "oneway" : "roundtrip";
}

export function sanitizeCabin(value: string | null): "all" | "economy" | "premium" | "business" | "first" {
  if (value === "economy" || value === "premium" || value === "business" || value === "first" || value === "all") {
    return value;
  }
  return "all";
}

const PARTNER_HOSTS = [
  "www.aviasales.com",
  "www.skyscanner.fr",
  "www.kayak.fr",
  "www.expedia.fr",
  "www.kiwi.com",
  "www.booking.com",
  "www.rentalcars.com",
];

export function isSafePartnerUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && PARTNER_HOSTS.includes(parsed.hostname);
  } catch {
    return false;
  }
}
