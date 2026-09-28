import type { Metadata } from "next";
import { SupportPageB } from "@/concepts/b/pages/PagesB";

export const metadata: Metadata = {
  title: "Support — Documents, Download, Warranty | VISION HITECH",
  description: "Technical documents, downloads, certificates, warranty and RMA process for VISION HITECH products.",
  alternates: { canonical: "/concept-b/support/" },
};

export default function Page() {
  return <SupportPageB />;
}
