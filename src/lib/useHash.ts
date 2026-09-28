"use client";

import { useCallback, useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}

/** URL hash as state (static-export friendly filter state: /products/#nvr). */
export function useHash(): [string, (next: string) => void] {
  const hash = useSyncExternalStore(
    subscribe,
    () => decodeURIComponent(window.location.hash.replace(/^#/, "")),
    () => "",
  );
  const set = useCallback((next: string) => {
    const url = next ? `#${next}` : window.location.pathname + window.location.search;
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }, []);
  return [hash, set];
}
