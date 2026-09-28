import type { Metadata } from "next";
import Link from "next/link";
import { Img } from "@/components/shared/Img";
import { Logo } from "@/components/shared/Logo";

export const metadata: Metadata = {
  title: "VISION HITECH — Website Renewal Design Concepts",
  alternates: { canonical: "/" },
};

const CONCEPTS = [
  {
    id: "a",
    code: "Concept A",
    name: "Global Vision Technology",
    keywords: ["Global", "Professional", "Premium", "Precision", "Enterprise", "Minimal"],
    body: "Hardware-first. White, editorial and product-led: VISION HITECH cameras and recorders are the heroes, presented at the scale of a global B2B security brand.",
    refs: "Hanwha Vision + Milesight",
    image: "/images/products/vnn64lu4ar.webp",
    alt: "VNN64LU4AR UHD 4K bullet camera",
  },
  {
    id: "b",
    code: "Concept B",
    name: "Intelligent Vision System",
    keywords: ["Intelligent", "Vision", "Data", "Connected", "Detection", "Dynamic"],
    body: "System-first. Deep navy and charcoal: the camera is the start of a chain — capture, video data, analysis, response — told with restrained technical motion.",
    refs: "DEEPX + EdgeDX + Milesight",
    image: "/images/cutouts/vnv15lu4ar.webp",
    alt: "VNV15LU4AR UHD 4K dome camera",
  },
] as const;

export default function ConceptIndex() {
  return (
    <main className="min-h-dvh bg-white text-[#16181b]" style={{ fontFamily: "var(--font-archivo), system-ui, sans-serif" }}>
      <header className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-6 md:px-10">
        <Logo variant="primary" height={26} />
        <p className="text-xs text-[#5f646c]">Design prototype · English · 2026-09</p>
      </header>
      <section className="mx-auto max-w-[1440px] px-5 pt-10 pb-12 md:px-10 md:pt-16">
        <p className="a-label text-[#5f646c]">VISION HITECH</p>
        <h1 className="a-display mt-4 text-[2.6rem] md:text-[4.6rem]">
          Website Renewal
          <br />
          Design Concepts
        </h1>
        <p className="mt-6 max-w-xl text-[#5f646c]">
          Two English design directions for review. Both share the same VISION HITECH content, products and navigation — the design system, composition and interaction differ.
        </p>
      </section>
      <section className="mx-auto grid max-w-[1440px] gap-4 px-5 pb-20 md:grid-cols-2 md:px-10">
        {CONCEPTS.map((c) => {
          const dark = c.id === "b";
          return (
            <Link
              key={c.id}
              href={`/concept-${c.id}/`}
              className={`group relative flex min-h-[560px] flex-col overflow-hidden p-7 md:min-h-[640px] md:p-10 ${dark ? "bg-[#080c14] text-[#e9edf3]" : "bg-[#f1f2f3]"}`}
            >
              <p className="font-mono text-xs tracking-[0.12em] uppercase opacity-60">{c.code}</p>
              <h2 className="a-display mt-3 text-[2.2rem] md:text-[3rem]">{c.name}</h2>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {c.keywords.map((k) => (
                  <li key={k} className={`border px-2 py-0.5 text-[0.7rem] ${dark ? "border-white/15" : "border-black/15"}`}>
                    {k}
                  </li>
                ))}
              </ul>
              <p className="relative z-10 mt-5 max-w-sm text-sm leading-relaxed opacity-75 md:max-w-[52%]">{c.body}</p>
              <p className="relative z-10 mt-3 text-xs opacity-50">References: {c.refs}</p>
              <div className="pointer-events-none absolute right-[-6%] bottom-[-4%] w-[62%] md:w-[50%] transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03]">
                <Img src={c.image} alt={c.alt} width={800} height={800} sizes="35vw" priority className={dark ? "drop-shadow-[0_30px_60px_rgba(244,123,66,.18)]" : "mix-blend-multiply"} />
              </div>
              <span className={`relative mt-auto inline-flex w-fit items-center gap-3 px-5 py-3 text-sm font-semibold ${dark ? "bg-[#f47b42] text-[#10141c]" : "bg-[#16181b] text-white"}`}>
                View Concept
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                  <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </span>
            </Link>
          );
        })}
      </section>
      <footer className="mx-auto max-w-[1440px] border-t border-[#e3e4e6] px-5 py-6 text-xs text-[#5f646c] md:px-10">
        VISION HITECH website renewal · English design concepts · Japanese site to follow.
      </footer>
    </main>
  );
}
