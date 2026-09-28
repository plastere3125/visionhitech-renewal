import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-white px-5 text-center text-[#16181b]">
      <Logo variant="primary" height={28} />
      <h1 className="a-display text-[2.4rem]">Page not found</h1>
      <p className="text-[#5f646c]">This page is not part of the design prototype.</p>
      <div className="flex gap-3 text-sm font-semibold">
        <Link href="/" className="bg-[#16181b] px-5 py-3 text-white">
          Concept overview
        </Link>
      </div>
    </main>
  );
}
