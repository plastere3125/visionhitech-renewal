import { cn } from "@/lib/cn";
import { getContent } from "@/content";

/**
 * Development placeholder. Always visually distinct (dashed border + label)
 * so it can never be mistaken for real VISION HITECH information.
 */
export function Placeholder({ children, className, compact }: { children?: React.ReactNode; className?: string; compact?: boolean }) {
  const { site } = getContent();
  return (
    <div
      className={cn(
        "rounded-[2px] border border-dashed border-current/35 text-mute",
        compact ? "px-2.5 py-1.5 text-xs" : "p-4 text-sm",
        className,
      )}
      data-placeholder="true"
    >
      <span className="mr-2 inline-block font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-accent-ink">
        {site.ui.placeholder}
      </span>
      {children}
    </div>
  );
}

export function PendingTag({ className }: { className?: string }) {
  const { site } = getContent();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-dashed border-current/40 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-accent-ink",
        className,
      )}
    >
      {site.ui.placeholderShort}
    </span>
  );
}
