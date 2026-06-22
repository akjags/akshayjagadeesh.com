"use client";

import { useEffect } from "react";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function VisitCounter() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const storageKey = `akshay-site-visit-counted:${todayKey()}`;
    try {
      if (window.localStorage.getItem(storageKey)) return;
      window.localStorage.setItem(storageKey, "yes");
    } catch {
      // If storage is blocked, still count the visit without breaking the page.
    }

    if (navigator.sendBeacon && navigator.sendBeacon("/api/visit")) {
      return;
    }

    void fetch("/api/visit", { method: "POST", keepalive: true });
  }, []);

  return null;
}
