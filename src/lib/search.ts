import { airlinesForCabin, CABIN_CLASSES, CABIN_PRICE_FACTOR } from "./cabins";
import { getAirport } from "./airports";
import { sanitizeDate, sanitizeIata } from "./security";
import { PARTNERS } from "./partners";
import type { FlightOffer, PartnerId, SearchQuery } from "./types";

const AIRLINES = [
  { code: "AF", name: "Air France" },
  { code: "TO", name: "Transavia" },
  { code: "U2", name: "easyJet" },
  { code: "FR", name: "Ryanair" },
  { code: "LH", name: "Lufthansa" },
  { code: "BA", name: "British Airways" },
  { code: "KL", name: "KLM" },
  { code: "TK", name: "Turkish Airlines" },
  { code: "EK", name: "Emirates" },
  { code: "AT", name: "Royal Air Maroc" },
  { code: "TP", name: "TAP Air Portugal" },
  { code: "IB", name: "Iberia" },
];

function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let s = seed || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function minutesToClock(total: number) {
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return `${pad(h)}:${pad(m)}`;
}

export function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h${m.toString().padStart(2, "0")}`;
}

export function formatPrice(price: number, currency = "EUR") {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function searchFlights(query: SearchQuery): FlightOffer[] {
  const departDate = sanitizeDate(query.departDate);
  if (!departDate) return [];
  const from = sanitizeIata(query.from);
  const to = sanitizeIata(query.to);
  if (!from || !to) return [];
  const origin = getAirport(from);
  const dest = getAirport(to);
  if (!origin || !dest) return [];
  const seed = hash(
    `${from}-${to}-${departDate}-${query.returnDate ?? ""}-${query.adults}`,
  );
  const random = rng(seed);
  const europe = new Set([
    "France",
    "Royaume-Uni",
    "Irlande",
    "Pays-Bas",
    "Belgique",
    "Luxembourg",
    "Allemagne",
    "Espagne",
    "Portugal",
    "Italie",
    "Grèce",
    "Suisse",
    "Autriche",
    "Danemark",
    "Norvège",
    "Suède",
    "Finlande",
    "Pologne",
    "Tchéquie",
    "Hongrie",
    "Roumanie",
    "Bulgarie",
    "Croatie",
    "Serbie",
    "Slovénie",
  ]);
  const longHaul = Boolean(
    origin &&
      dest &&
      origin.country !== dest.country &&
      !(europe.has(origin.country) && europe.has(dest.country)),
  );

  const basePrice = longHaul ? 480 + random() * 420 : 48 + random() * 180;
  const baseDuration = longHaul ? 420 + Math.floor(random() * 240) : 75 + Math.floor(random() * 150);
  const cabins = [...CABIN_CLASSES];
  const partnerIds = Object.keys(PARTNERS) as PartnerId[];

  const LOW_COST = new Set(["FR", "U2", "TO"]);
  const offers: FlightOffer[] = cabins.flatMap((cabin) => {
    const pool = airlinesForCabin(cabin, AIRLINES);
    const factor = CABIN_PRICE_FACTOR[cabin];
    return partnerIds.flatMap((partner, pIndex) => {
      const variants = 1;
      return Array.from({ length: variants }, (_, v) => {
        const airline = pool[Math.floor(random() * pool.length)] ?? AIRLINES[0];
        const premiumCabin = cabin === "business" || cabin === "first";
        const stops = premiumCabin
          ? random() > 0.78
            ? 1
            : 0
          : random() > 0.62
            ? random() > 0.7
              ? 2
              : 1
            : 0;
        const duration = baseDuration + stops * 85 + Math.floor(random() * 50);
        const departMinutes = 360 + Math.floor(random() * 780);
        const price = Math.round(
          (basePrice + pIndex * 12 + v * 18 + stops * 35 + query.adults * 4) *
            (0.88 + random() * 0.28) *
            factor,
        );
        const id = `${partner}-${cabin}-${from}${to}-${departDate}-${v}-${pIndex}`;
        const baggage: FlightOffer["baggage"] =
          premiumCabin || !LOW_COST.has(airline.code) ? "cabin" : "personal";
        return {
          id,
          partner,
          partnerName: PARTNERS[partner].name,
          airline: airline.name,
          airlineCode: airline.code,
          from,
          to,
          departDate,
          returnDate: query.tripType === "roundtrip" ? sanitizeDate(query.returnDate ?? "") || undefined : undefined,
          departTime: minutesToClock(departMinutes),
          arriveTime: minutesToClock(departMinutes + duration),
          durationMinutes: duration,
          stops,
          price,
          currency: "EUR",
          cabin,
          baggage,
        };
      });
    });
  });

  return offers.sort((a, b) => a.price - b.price);
}

export type DayFare = { date: string; price: number };

function addUtcDays(iso: string, days: number) {
  const [y, m, d] = iso.split("-").map((part) => Number.parseInt(part, 10));
  const next = new Date(Date.UTC(y, m - 1, d + days));
  return `${next.getUTCFullYear()}-${pad(next.getUTCMonth() + 1)}-${pad(next.getUTCDate())}`;
}

export function tripLengthDays(depart: string, returnDate?: string) {
  if (!returnDate) return 7;
  const start = Date.parse(`${depart}T00:00:00Z`);
  const end = Date.parse(`${returnDate}T00:00:00Z`);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return 7;
  return Math.min(28, Math.max(1, Math.round((end - start) / 86_400_000)));
}

export function monthFares(query: SearchQuery, year: number, month: number): DayFare[] {
  const from = sanitizeIata(query.from);
  const to = sanitizeIata(query.to);
  if (!from || !to) return [];
  const last = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const span = query.tripType === "roundtrip" ? tripLengthDays(query.departDate, query.returnDate) : 0;
  const days: DayFare[] = [];
  for (let day = 1; day <= last; day += 1) {
    const departDate = `${year}-${pad(month)}-${pad(day)}`;
    const returnDate = span ? addUtcDays(departDate, span) : undefined;
    const cheapest = searchFlights({
      ...query,
      from,
      to,
      departDate,
      returnDate,
    })[0];
    if (cheapest) days.push({ date: departDate, price: cheapest.price });
  }
  return days;
}
