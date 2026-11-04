import { CLink } from "@/components/shared/CLink";
import { cn } from "@/lib/cn";

/**
 * YouTube / LinkedIn icons. No official VISION HITECH channel URL could be verified
 * (visionhitechsecurity.com, visionhitech.co.kr — checked 2026-11-04), so the icons open the
 * Media Center channel sections. Replace `href` with the official URLs once supplied.
 */
const CHANNELS = [
  {
    id: "youtube",
    label: "Youtube",
    href: "/media/#youtube",
    path: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "/media/#linkedin",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5c0-1.2-.02-2.73-1.66-2.73-1.66 0-1.92 1.3-1.92 2.64V21h-4V9.75Z",
  },
] as const;

export function SocialIcons({ className, iconClassName, size = 18 }: { className?: string; iconClassName?: string; size?: number }) {
  return (
    <ul className={cn("flex items-center gap-1", className)} aria-label="VISION HITECH channels">
      {CHANNELS.map((c) => (
        <li key={c.id}>
          <CLink
            concept="a"
            href={c.href}
            aria-label={c.label}
            title={c.label}
            className={cn("flex h-9 w-9 items-center justify-center transition-colors", iconClassName)}
          >
            <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="currentColor">
              <path d={c.path} />
            </svg>
          </CLink>
        </li>
      ))}
    </ul>
  );
}
