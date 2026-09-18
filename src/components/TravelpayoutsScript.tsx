"use client";

import { useEffect } from "react";
import { useI18n } from "@/components/I18nProvider";

const TRAVELPAYOUTS_SRC = "https://emrldtp.com/NTc0MzQ1.js?t=574345";

export function TravelpayoutsScript() {
  const { cookieChoice, ready } = useI18n();

  useEffect(() => {
    if (!ready || cookieChoice !== "accepted") return;
    if (document.querySelector(`script[src="${TRAVELPAYOUTS_SRC}"]`)) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = TRAVELPAYOUTS_SRC;
    script.referrerPolicy = "strict-origin-when-cross-origin";
    script.setAttribute("data-cmp-ab", "2");
    document.head.appendChild(script);
  }, [cookieChoice, ready]);

  return null;
}
