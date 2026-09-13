import { getAirport } from "./airports";
import { affiliateMarker } from "./partners";
import { isSafePartnerUrl, sanitizeDate, sanitizeIata } from "./security";

export type StayPartnerLink = {
  id: string;
  name: string;
  href: string;
  fromPrice: number;
};

function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function cityQuery(city: string) {
  return encodeURIComponent(city.trim());
}

function citySlug(city: string) {
  return encodeURIComponent(city.trim().replace(/\s+/g, "-"));
}

function safe(url: string) {
  return isSafePartnerUrl(url) ? url : "https://www.kayak.fr/";
}

export function destinationCity(iata: string) {
  return getAirport(sanitizeIata(iata))?.city ?? iata;
}

export function hotelPartners(iata: string, checkin: string, checkout: string): StayPartnerLink[] {
  const code = sanitizeIata(iata);
  const inDate = sanitizeDate(checkin);
  const outDate = sanitizeDate(checkout);
  const city = destinationCity(code);
  if (!code || !inDate || !outDate) return [];
  const marker = encodeURIComponent(affiliateMarker());
  const seed = hash(`hotel-${code}-${inDate}`);
  const base = 70 + (seed % 90);
  const q = cityQuery(city);
  const slug = citySlug(city);
  return [
    {
      id: "booking",
      name: "Booking.com",
      fromPrice: base,
      href: safe(
        `https://www.booking.com/searchresults.fr.html?ss=${q}&checkin=${inDate}&checkout=${outDate}&group_adults=1&aid=${marker}`,
      ),
    },
    {
      id: "kayak-hotels",
      name: "Kayak",
      fromPrice: base + 8,
      href: safe(
        `https://www.kayak.fr/hotels/${slug}/${inDate}/${outDate}/1adults?affiliate=${marker}`,
      ),
    },
    {
      id: "expedia-hotels",
      name: "Expedia",
      fromPrice: base + 14,
      href: safe(
        `https://www.expedia.fr/Hotel-Search?destination=${q}&startDate=${inDate}&endDate=${outDate}&adults=1&affcid=${marker}`,
      ),
    },
  ];
}

export function carPartners(iata: string, pickup: string, dropoff: string): StayPartnerLink[] {
  const code = sanitizeIata(iata);
  const inDate = sanitizeDate(pickup);
  const outDate = sanitizeDate(dropoff);
  const city = destinationCity(code);
  if (!code || !inDate || !outDate) return [];
  const marker = encodeURIComponent(affiliateMarker());
  const seed = hash(`car-${code}-${inDate}`);
  const base = 22 + (seed % 35);
  const q = cityQuery(city);
  return [
    {
      id: "kayak-cars",
      name: "Kayak",
      fromPrice: base,
      href: safe(`https://www.kayak.fr/cars/${code}-a/${inDate}/${outDate}?affiliate=${marker}`),
    },
    {
      id: "rentalcars",
      name: "Rentalcars",
      fromPrice: base + 4,
      href: safe(
        `https://www.rentalcars.com/search-results?locationName=${q}&pickupDate=${inDate}&dropoffDate=${outDate}&affiliate=${marker}`,
      ),
    },
    {
      id: "expedia-cars",
      name: "Expedia",
      fromPrice: base + 7,
      href: safe(
        `https://www.expedia.fr/carsearch?locn=${q}&date1=${inDate}&date2=${outDate}&affcid=${marker}`,
      ),
    },
  ];
}
