import type { Metadata } from "next";
import { CompanyPageB } from "@/concepts/b/pages/PagesB";

export const metadata: Metadata = {
  title: "Company — Visionhitech Co., Ltd.",
  description: "Mission, vision, history 1997–2020, quality management and locations of Visionhitech Co., Ltd.",
  alternates: { canonical: "/concept-b/company/" },
};

export default function Page() {
  return <CompanyPageB />;
}
