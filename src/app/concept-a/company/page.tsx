import type { Metadata } from "next";
import { CompanyPageA } from "@/concepts/a/pages/PagesA";

export const metadata: Metadata = {
  title: "Company — Visionhitech Co., Ltd.",
  description: "Mission, vision, history 1997–2020, quality management and locations of Visionhitech Co., Ltd.",
  alternates: { canonical: "/concept-a/company/" },
};

export default function Page() {
  return <CompanyPageA />;
}
