import type { Metadata } from "next";
import { SolutionsOverviewB } from "@/concepts/b/pages/PagesB";

export const metadata: Metadata = {
  title: "Solutions — Technology, AI Vision, Video Security, Transportation, Vision Marine | VISION HITECH",
  description: "VISION HITECH imaging technology and application areas.",
  alternates: { canonical: "/concept-b/solutions/" },
};

export default function Page() {
  return <SolutionsOverviewB />;
}
