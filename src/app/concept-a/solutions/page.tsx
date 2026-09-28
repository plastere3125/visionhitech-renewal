import type { Metadata } from "next";
import { SolutionsOverviewA } from "@/concepts/a/pages/PagesA";

export const metadata: Metadata = {
  title: "Solutions — Technology, AI Vision, Video Security, Transportation, Vision Marine | VISION HITECH",
  description: "VISION HITECH imaging technology and application areas.",
  alternates: { canonical: "/concept-a/solutions/" },
};

export default function Page() {
  return <SolutionsOverviewA />;
}
