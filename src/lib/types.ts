export type TripType = "roundtrip" | "oneway" | "multicity";

export type CabinClass = "economy" | "premium" | "business" | "first";

export type CabinFilter = CabinClass | "all";

export type Airport = {
  iata: string;
  city: string;
  name: string;
  country: string;
};

export type PartnerId =
  | "aviasales"
  | "skyscanner"
  | "kayak"
  | "expedia"
  | "kiwi";

export type FlightOffer = {
  id: string;
  partner: PartnerId;
  partnerName: string;
  airline: string;
  airlineCode: string;
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  departTime: string;
  arriveTime: string;
  durationMinutes: number;
  stops: number;
  price: number;
  currency: string;
  cabin: CabinClass;
  baggage: "personal" | "cabin";
};

export type SearchQuery = {
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  adults: number;
  tripType: TripType;
  cabin: CabinFilter;
};
