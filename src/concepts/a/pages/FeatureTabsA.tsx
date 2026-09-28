"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function FeatureTabsA({ groups }: { groups: Array<{ id: string; label: string; items: string[] }> }) {
  const tabs = groups.filter((g) => g.items.length);
  const [active, setActive] = useState(tabs[0]?.id);
  if (!tabs.length) return null;
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  return (
    <div>
      <div role="tablist" aria-label="Features" className="flex gap-1 border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`ft-${t.id}`}
            aria-selected={t.id === current.id}
            aria-controls="ft-panel"
            onClick={() => setActive(t.id)}
            className={cn("relative px-4 py-3 text-sm font-medium", t.id === current.id ? "text-fg" : "text-mute hover:text-fg")}
          >
            {t.label} <span className="font-mono text-[0.7rem] text-mute">{t.items.length}</span>
            <span className={cn("absolute inset-x-4 -bottom-px h-[2px] bg-fg transition-transform", t.id === current.id ? "scale-x-100" : "scale-x-0")} />
          </button>
        ))}
      </div>
      <ul id="ft-panel" role="tabpanel" aria-labelledby={`ft-${current.id}`} className="grid gap-x-10 sm:grid-cols-2">
        {current.items.map((f) => (
          <li key={f} className="flex gap-3 border-b border-line py-3.5 text-[0.93rem]">
            <span aria-hidden className="mt-2 h-1 w-3 shrink-0 bg-accent" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
