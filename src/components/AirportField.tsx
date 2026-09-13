"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { formatAirportLabel, getAirport, searchAirports } from "@/lib/airports";
import type { Airport } from "@/lib/types";

function labelFor(iata: string) {
  const airport = getAirport(iata);
  return airport ? formatAirportLabel(airport) : iata;
}

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (iata: string) => void;
  placeholder?: string;
};

export function AirportField({ id, label, value, onChange, placeholder }: Props) {
  const [query, setQuery] = useState(() => (value ? labelFor(value) : ""));
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const options = useMemo(() => searchAirports(query, 14), [query]);

  useEffect(() => {
    if (value) setQuery(labelFor(value));
  }, [value]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <label htmlFor={id} className="font-display mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </label>
      <input
        id={id}
        autoComplete="off"
        spellCheck={false}
        maxLength={80}
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value.slice(0, 80));
          onChange("");
          setOpen(true);
        }}
        placeholder={placeholder ?? "Ville, aéroport ou code IATA"}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none ring-sky-500 placeholder:text-slate-400 focus:border-sky-400 focus:ring-2"
      />
      {open && options.length > 0 && (
        <ul className="absolute z-20 mt-1 max-h-72 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
          {options.map((airport: Airport) => (
            <li key={airport.iata}>
              <button
                type="button"
                className="flex w-full items-start justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-sky-50"
                onClick={() => {
                  onChange(airport.iata);
                  setQuery(formatAirportLabel(airport));
                  setOpen(false);
                }}
              >
                <span>
                  <span className="font-medium text-slate-900">{airport.city}</span>
                  <span className="block text-xs text-slate-500">
                    {airport.name} · {airport.country}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-xs text-sky-700">{airport.iata}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
