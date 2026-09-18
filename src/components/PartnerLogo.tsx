import type { DisplayPartnerId } from "@/lib/partners";

const MARKS: Record<DisplayPartnerId, { bg: string; fg: string; label: string }> = {
  aviasales: { bg: "#F97316", fg: "#fff", label: "AS" },
  kiwi: { bg: "#00A991", fg: "#fff", label: "KI" },
  getrentacar: { bg: "#2563EB", fg: "#fff", label: "GR" },
  economybookings: { bg: "#0EA5E9", fg: "#fff", label: "EB" },
  autoeurope: { bg: "#1D4ED8", fg: "#fff", label: "AE" },
  airhelp: { bg: "#DC2626", fg: "#fff", label: "AH" },
  compensair: { bg: "#7C3AED", fg: "#fff", label: "CA" },
  airalo: { bg: "#111827", fg: "#fff", label: "AL" },
  gigsky: { bg: "#4338CA", fg: "#fff", label: "GS" },
  kkday: { bg: "#EA580C", fg: "#fff", label: "KK" },
};

export function PartnerLogo({ id, name }: { id: DisplayPartnerId; name: string }) {
  const mark = MARKS[id];

  return (
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-sm" aria-hidden="true">
      <svg viewBox="0 0 40 40" className="h-10 w-10" role="img">
        <title>{name}</title>
        <rect width="40" height="40" rx="10" fill={mark.bg} />
        {id === "aviasales" ? (
          <path d="M8 26 L20 10 L32 26 H26 L20 18 L14 26 Z" fill={mark.fg} />
        ) : id === "kiwi" ? (
          <ellipse cx="20" cy="21" rx="11" ry="10" fill={mark.fg} />
        ) : id === "getrentacar" || id === "autoeurope" || id === "economybookings" ? (
          <path
            d="M9 24h22l-2-6H12l-3 6zm4-3.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm14 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 18l2-4h12l2 4"
            fill={mark.fg}
          />
        ) : id === "airhelp" || id === "compensair" ? (
          <path d="M8 22h10l8-10 2 2-6 8h10v4H8z" fill={mark.fg} />
        ) : id === "airalo" || id === "gigsky" ? (
          <>
            <circle cx="20" cy="20" r="9" fill="none" stroke={mark.fg} strokeWidth="2.4" />
            <path d="M11 20h18M20 11c3 3 3 12 0 18M20 11c-3 3-3 12 0 18" fill="none" stroke={mark.fg} strokeWidth="1.8" />
          </>
        ) : (
          <text
            x="20"
            y="25"
            textAnchor="middle"
            fontSize="13"
            fontWeight="800"
            fill={mark.fg}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            {mark.label}
          </text>
        )}
      </svg>
    </span>
  );
}
