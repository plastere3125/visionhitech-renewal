import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { getSolution } from "@/content/en/solutions";
import { SolutionDetailA } from "@/concepts/a/pages/PagesA";

export const dynamicParams = false;

export function generateStaticParams() {
  return getContent().solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/concept-a/solutions/[slug]">): Promise<Metadata> {
  const s = getSolution((await params).slug);
  if (!s) return {};
  return { title: `${s.name} — Solutions | VISION HITECH`, description: s.summary, alternates: { canonical: `/concept-a/solutions/${s.slug}/` } };
}

export default async function Page({ params }: PageProps<"/concept-a/solutions/[slug]">) {
  const s = getSolution((await params).slug);
  if (!s) notFound();
  return <SolutionDetailA solution={s} />;
}
