"use client";

import { useId, useState } from "react";
import { Img } from "./Img";
import { cn } from "@/lib/cn";
import type { TechCompare } from "@/content/en/technology";

/**
 * Before/after comparison of VISION HITECH demonstration images.
 * Keyboard accessible: the divider is a native range input.
 */
export function CompareSlider({
  compare,
  className,
  labelClassName,
  aspect = "aspect-[3/2]",
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: {
  compare: TechCompare;
  className?: string;
  labelClassName?: string;
  aspect?: string;
  sizes?: string;
}) {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <div className={cn("relative select-none overflow-hidden", aspect, className)}>
      <Img src={compare.before.src} alt={compare.before.label} fill sizes={sizes} className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Img src={compare.after.src} alt={compare.after.label} fill sizes={sizes} className="object-cover" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,.15)]" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#16181b] shadow-md">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M5.5 4 2 8l3.5 4M10.5 4 14 8l-3.5 4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </div>
      <span className={cn("absolute bottom-3 left-3 rounded-sm bg-black/65 px-2 py-1 text-[0.7rem] text-white", labelClassName)}>{compare.before.label}</span>
      <span className={cn("absolute right-3 bottom-3 rounded-sm bg-black/65 px-2 py-1 text-[0.7rem] text-white", labelClassName)}>{compare.after.label}</span>
      <label htmlFor={id} className="sr-only">
        Compare {compare.before.label} and {compare.after.label}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
