import type { Metadata, Viewport } from "next";
import { archivo, plexMono, plexSans } from "@/lib/fonts";
import { JsFlag } from "@/components/shared/JsFlag";
import { SITE_URL } from "@/lib/paths";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: "VISION HITECH — Website Renewal Design Concepts",
    template: "%s",
  },
  description: "Design prototype for the VISION HITECH global website renewal. Two English design concepts for client review.",
  // Prototype: keep out of search results so it never competes with the official site.
  // Production: remove, and set canonical to https://visionhitechsecurity.com/en/...
  robots: { index: false, follow: false },
  icons: { icon: [{ url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/vision-logo_P-01.svg`, type: "image/svg+xml" }] },
  openGraph: { type: "website", siteName: "VISION HITECH", locale: "en_US" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <JsFlag />
      </head>
      <body>{children}</body>
    </html>
  );
}
