import type { Metadata } from "next";
import { getContent } from "@/content";
import { JsonLd } from "@/components/shared/JsonLd";
import { HeroA } from "@/concepts/a/home/HeroA";
import {
  AnalogBandA,
  ApplicationBandA,
  NetworkBandA,
  NewsBandA,
  SolutionBandA,
  SpecialBandA,
  SupportBandA,
  WhyBandA,
} from "@/concepts/a/home/SectionsA";
import { organizationLd } from "@/lib/seo";

const { homeA } = getContent();

export const metadata: Metadata = {
  title: homeA.meta.title,
  description: homeA.meta.description,
  alternates: { canonical: "/concept-a/" },
  openGraph: { title: homeA.meta.title, description: homeA.meta.description, images: ["/images/env/env-logistics-dusk-1280.webp"] },
};

/** Revision 03 — section order from the client file (Webpage_Layout_대강.xlsx): 1 Head → 9 What's new → Foot. */
export default function HomeA() {
  return (
    <>
      <JsonLd data={organizationLd()} />
      <HeroA />
      <SolutionBandA />
      <WhyBandA />
      <NetworkBandA />
      <AnalogBandA />
      <SpecialBandA />
      <ApplicationBandA />
      <SupportBandA />
      <NewsBandA />
    </>
  );
}
