import { cn } from "@/lib/cn";
import { getContent } from "@/content";

/**
 * Client-facing design placeholder for areas whose official content is not yet available.
 * Shows only a generic heading and a quiet "Coming soon" — never internal review wording.
 * (Open items are tracked in VISIONHITECH_CONTENT_INVENTORY.md / FACT_CHECK.md.)
 */
export function Placeholder({ children, className, compact }: { children?: React.ReactNode; className?: string; compact?: boolean }) {
  const { site } = getContent();
  return (
    <div
      className={cn("flex items-center justify-between gap-4 border border-dashed border-current/20 text-mute", compact ? "px-3 py-2 text-xs" : "p-5 text-sm", className)}
      data-placeholder="true"
    >
      <span>{children}</span>
      <span className="shrink-0 text-[0.7rem] tracking-[0.08em] uppercase opacity-70">{site.ui.placeholder}</span>
    </div>
  );
}
