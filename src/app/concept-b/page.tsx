import type { Metadata } from "next";
import { getContent } from "@/content";
import { JsonLd } from "@/components/shared/JsonLd";
import { ChainB } from "@/concepts/b/home/ChainB";
import { HeroB } from "@/concepts/b/home/HeroB";
import { IndexB } from "@/concepts/b/home/IndexB";
import { AiB, ApplicationsB, ContactB, MediaB, MobilityB, SupportB } from "@/concepts/b/home/SectionsB";
import { EcosystemB, TechBentoB } from "@/concepts/b/home/SystemB";
import { organizationLd } from "@/lib/seo";

const { homeB } = getContent();

export const metadata: Metadata = {
  title: homeB.meta.title,
  description: homeB.meta.description,
  alternates: { canonical: "/concept-b/" },
  openGraph: { title: homeB.meta.title, description: homeB.meta.description, images: ["/images/cutouts/vnv15lu4ar.webp"] },
};

export default function HomeB() {
  return (
    <>
      <JsonLd data={organizationLd()} />
      <HeroB />
      <ChainB />
      <TechBentoB />
      <EcosystemB />
      <AiB />
      <ApplicationsB />
      <MobilityB />
      <IndexB />
      <SupportB />
      <MediaB />
      <ContactB />
    </>
  );
}
