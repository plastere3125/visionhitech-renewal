import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const btnPrimary =
  "inline-flex items-center gap-2.5 bg-fg px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent hover:text-fg";
export const btnGhost =
  "inline-flex items-center gap-2.5 border border-fg/20 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-fg";
export const linkArrow = "group inline-flex items-center gap-2 text-sm font-semibold";

export function Container({ className, children, id }: { className?: string; children: ReactNode; id?: string }) {
  return (
    <div id={id} className={cn("mx-auto w-full max-w-[1440px] px-5 md:px-10", className)}>
      {children}
    </div>
  );
}

export function SectionHead({
  label,
  title,
  aside,
  className,
  as: H = "h2",
}: {
  label: string;
  title: ReactNode;
  aside?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div>
        <p className="a-label flex items-center gap-3 text-mute">
          <span aria-hidden className="h-px w-8 bg-accent" />
          {label}
        </p>
        <H className="a-display mt-5 max-w-[18ch] text-[2.25rem] md:text-[3.4rem]">{title}</H>
      </div>
      {aside}
    </div>
  );
}
