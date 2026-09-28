import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const bBtn =
  "inline-flex items-center gap-3 bg-accent px-5 py-3 text-[0.85rem] font-semibold text-[#10141c] transition-colors hover:bg-[#ff9366]";
export const bBtnLine =
  "inline-flex items-center gap-3 border border-fg/25 px-5 py-3 text-[0.85rem] font-semibold transition-colors hover:border-fg";

export function Wrap({ className, children, id }: { className?: string; children: ReactNode; id?: string }) {
  return (
    <div id={id} className={cn("mx-auto w-full max-w-[1400px] px-5 md:px-10", className)}>
      {children}
    </div>
  );
}

/** Technical section label: [ 03 ] ANALYSIS */
export function Code({ n, children, className }: { n?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("b-code flex items-center gap-2 text-mute", className)}>
      {n && <span className="text-accent">[{n}]</span>}
      {children}
    </p>
  );
}

export function HeadB({ n, label, title, aside, className }: { n?: string; label: string; title: ReactNode; aside?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div>
        <Code n={n}>{label}</Code>
        <h2 className="b-display mt-6 max-w-[18ch] text-[2.3rem] md:text-[3.6rem] xl:text-[4rem]">{title}</h2>
      </div>
      {aside}
    </div>
  );
}

export function ArrowB({ className }: { className?: string }) {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden className={className}>
      <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" fill="none" />
    </svg>
  );
}

/** Corner-bracket frame — a camera-viewfinder motif used sparingly. */
export function Brackets({ className, color = "currentColor" }: { className?: string; color?: string }) {
  const s = { borderColor: color } as const;
  return (
    <span aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <span className="absolute top-0 left-0 h-3 w-3 border-t border-l" style={s} />
      <span className="absolute top-0 right-0 h-3 w-3 border-t border-r" style={s} />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l" style={s} />
      <span className="absolute right-0 bottom-0 h-3 w-3 border-r border-b" style={s} />
    </span>
  );
}
