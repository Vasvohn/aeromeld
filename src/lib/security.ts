export function sanitizeEmail(value: string) {
  const email = value.trim().toLowerCase();
  if (email.length > 120) return "";
  return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email) ? email : "";
}

export function sanitizeIata(value: string) {
  const code = value.trim().toUpperCase().replace(/[^A-Z]/g, "");
  return /^[A-Z]{3}$/.test(code) ? code : "";
}

export function sanitizeDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";
  const [year, month, day] = value.split("-").map((part) => Number.parseInt(part, 10));
  const time = Date.UTC(year, month - 1, day);
  const parsed = new Date(time);
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return "";
  }
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
  "aviasales.com",
  "aviasales.tpo.mx",
  "airhelp.tpo.mx",
  "airhelp.com",
  "www.airhelp.com",
  "compensair.tpo.mx",
  "compensair.com",
  "www.compensair.com",
  "airalo.tpo.mx",
  "airalo.com",
  "www.airalo.com",
  "gigsky.tpo.mx",
  "gigsky.com",
  "www.gigsky.com",
  "app.gigsky.com",
  "kiwi.tpo.mx",
  "kiwi.com",
  "www.kiwi.com",
  "tp.media",
  "www.skyscanner.fr",
  "www.kayak.fr",
  "www.expedia.fr",
  "www.booking.com",
  "www.rentalcars.com",
  "getrentacar.tpo.mx",
  "getrentacar.com",
  "www.getrentacar.com",
  "kkday.tpo.mx",
  "kkday.com",
  "www.kkday.com",
  "autoeurope.tpo.mx",
  "www.autoeurope.eu",
  "autoeurope.eu",
  "www.autoeurope.fr",
  "economybookings.tpo.mx",
  "www.economybookings.com",
  "economybookings.com",
  "emrldtp.com",
  "www.emrldtp.com",
];

const TRACKED_DEST_HOSTS = new Set([
  "www.aviasales.com",
  "aviasales.com",
  "www.airhelp.com",
  "airhelp.com",
  "www.compensair.com",
  "compensair.com",
  "www.airalo.com",
  "airalo.com",
  "www.gigsky.com",
  "gigsky.com",
  "app.gigsky.com",
  "www.kiwi.com",
  "kiwi.com",
  "getrentacar.com",
  "www.getrentacar.com",
  "kkday.com",
  "www.kkday.com",
  "www.autoeurope.eu",
  "autoeurope.eu",
  "www.autoeurope.fr",
  "www.economybookings.com",
  "economybookings.com",
  "www.booking.com",
  "www.kayak.fr",
  "www.expedia.fr",
  "www.skyscanner.fr",
  "www.rentalcars.com",
]);

const TRACKER_HOSTS = new Set(["tp.media", "emrldtp.com", "www.emrldtp.com"]);
const TRACKER_PATHS = new Set(["/r", "/re", "/click"]);

export const PARTNER_LINK_REL = "nofollow sponsored noopener noreferrer";

function isHttpsOrigin(parsed: URL) {
  return parsed.protocol === "https:" && !parsed.username && !parsed.password;
}

export function isSafePartnerUrl(url: string) {
  try {
    if (typeof url !== "string" || url.length === 0 || url.length > 2048) return false;
    if (/[\u0000-\u001F\u007F]/.test(url)) return false;
    const parsed = new URL(url);
    if (!isHttpsOrigin(parsed) || !PARTNER_HOSTS.includes(parsed.hostname)) return false;
    if (TRACKER_HOSTS.has(parsed.hostname)) {
      const path = parsed.pathname.replace(/\/+$/, "") || "/";
      if (!TRACKER_PATHS.has(path)) return false;
      const dest = parsed.searchParams.get("u");
      if (!dest) return path === "/click" || path === "/re";
      const target = new URL(dest);
      return isHttpsOrigin(target) && TRACKED_DEST_HOSTS.has(target.hostname);
    }
    return true;
  } catch {
    return false;
  }
}

export function safePartnerHref(url: string, fallback = "/") {
  if (isSafePartnerUrl(url)) return url;
  if (fallback !== "/" && isSafePartnerUrl(fallback)) return fallback;
  return fallback.startsWith("/") && !fallback.startsWith("//") ? fallback : "/";
}

export function contentSecurityPolicy() {
  const scriptEval = process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "frame-src 'self' https://emrldtp.com https://tp.media https://www.travelpayouts.com https://c.travelpayouts.com",
    "worker-src 'none'",
    "manifest-src 'self'",
    "media-src 'none'",
    "img-src 'self' data: blob: https://emrldtp.com https://www.travelpayouts.com https://c.travelpayouts.com https://tp.media",
    "style-src 'self' 'unsafe-inline'",
    `script-src 'self' 'unsafe-inline' https://emrldtp.com${scriptEval}`,
    "font-src 'self' data:",
    "connect-src 'self' ws: wss: https://emrldtp.com https://www.travelpayouts.com https://c.travelpayouts.com https://tp.media https://formsubmit.co",
    "upgrade-insecure-requests",
  ].join("; ");
}
