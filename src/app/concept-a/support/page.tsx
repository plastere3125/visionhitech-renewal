import type { Metadata } from "next";
import { SupportPageA } from "@/concepts/a/pages/PagesA";

export const metadata: Metadata = {
  title: "Support — Documents, Download, Warranty | VISION HITECH",
  description: "Technical documents, downloads, certificates, warranty and RMA process for VISION HITECH products.",
  alternates: { canonical: "/concept-a/support/" },
};

export default function Page() {
  return <SupportPageA />;
}
