import { LOCALES } from "@/lib/i18n";
import { getContent } from "@/content";
import { cn } from "@/lib/cn";

/** EN is live. JP is shown as a disabled "coming soon" state — no Japanese pages exist yet. */
export function LanguageSwitch({ className }: { className?: string }) {
  const { site } = getContent();
  return (
    <div className={cn("flex items-center gap-1 text-xs font-medium", className)} role="group" aria-label="Language">
      {LOCALES.map((l) =>
        l.status === "live" ? (
          <span key={l.code} aria-current="true" className="px-1.5 py-1">
            {l.label}
          </span>
        ) : (
          <span
            key={l.code}
            aria-disabled="true"
            title={site.ui.languageComingSoon}
            className="group relative cursor-not-allowed px-1.5 py-1 text-mute/70"
          >
            {l.label}
            <span className="sr-only"> — {site.ui.languageComingSoon}</span>
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded-sm bg-fg px-2 py-1 text-[0.65rem] text-bg opacity-0 transition-opacity group-hover:opacity-100"
            >
              {site.ui.comingSoon}
            </span>
          </span>
        ),
      )}
    </div>
  );
}
