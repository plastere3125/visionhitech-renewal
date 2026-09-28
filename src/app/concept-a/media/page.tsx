import type { Metadata } from "next";
import { MediaPageA } from "@/concepts/a/pages/PagesA";

export const metadata: Metadata = {
  title: "Media Center — VISION HITECH",
  description: "VISION HITECH notices, events and channels.",
  alternates: { canonical: "/concept-a/media/" },
};

export default function Page() {
  return <MediaPageA />;
}
