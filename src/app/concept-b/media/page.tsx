import type { Metadata } from "next";
import { MediaPageB } from "@/concepts/b/pages/PagesB";

export const metadata: Metadata = {
  title: "Media Center — VISION HITECH",
  description: "VISION HITECH notices, events and channels.",
  alternates: { canonical: "/concept-b/media/" },
};

export default function Page() {
  return <MediaPageB />;
}
