"use client";

import { useEffect } from "react";

function isProductionHost(hostname: string) {
  return hostname === "aeromeld.com" || hostname === "www.aeromeld.com" || hostname.endsWith(".github.io");
}

export function FrameGuard() {
  useEffect(() => {
    if (!isProductionHost(window.location.hostname)) return;
    if (window.location.protocol === "http:") {
      window.location.replace(`https:${window.location.href.slice(window.location.protocol.length)}`);
      return;
    }
    if (window.self === window.top) return;
    try {
      window.top?.location.replace(window.self.location.href);
    } catch {
      document.documentElement.classList.add("hidden");
    }
  }, []);
  return null;
}
