import type { Metadata } from "next";
import { ContactPageB } from "@/concepts/b/pages/PagesB";

export const metadata: Metadata = {
  title: "Contact — VISION HITECH",
  description: "Contact the VISION HITECH sales team in Bucheon, Korea.",
  alternates: { canonical: "/concept-b/contact/" },
};

export default function Page() {
  return <ContactPageB />;
}
