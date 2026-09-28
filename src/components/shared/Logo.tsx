import { asset } from "@/lib/paths";

const FILES = {
  primary: "/brand/vision-logo_P-01.svg",
  black: "/brand/vision-logo_B-02.svg",
  white: "/brand/vision-logo_W-03.svg",
} as const;

/**
 * Official VISION HITECH logo — the supplied SVG files, rendered unmodified.
 * viewBox 508.5 × 161 → aspect ratio preserved by width/height attributes.
 */
export function Logo({ variant = "primary", className, height = 26 }: { variant?: keyof typeof FILES; className?: string; height?: number }) {
  const width = Math.round((height * 508.5) / 161);
  // eslint-disable-next-line @next/next/no-img-element -- SVG brand asset must be served byte-for-byte
  return <img src={asset(FILES[variant])} alt="VISION HITECH" width={width} height={height} className={className} />;
}
