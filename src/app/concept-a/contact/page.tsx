import type { Metadata } from "next";
import { ContactPageA } from "@/concepts/a/pages/PagesA";

export const metadata: Metadata = {
  title: "Contact — VISION HITECH",
  description: "Contact the VISION HITECH sales team in Bucheon, Korea.",
  alternates: { canonical: "/concept-a/contact/" },
};

export default function Page() {
  return <ContactPageA />;
}
