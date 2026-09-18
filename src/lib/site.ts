export const CONTACT_EMAIL = "contact@aeromeld.com";
export function publicSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  if (raw.startsWith("http://localhost") || raw.startsWith("http://127.0.0.1")) return raw;
  return raw.replace(/^http:\/\//i, "https://");
}
