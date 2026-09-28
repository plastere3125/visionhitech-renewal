import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { route, type ConceptId } from "@/lib/paths";

/** Link scoped to a concept: <CLink concept="a" href="/products/"> → /concept-a/products/ */
export function CLink({
  concept,
  href,
  children,
  ...rest
}: { concept: ConceptId; href: string; children: ReactNode } & Omit<LinkProps, "href"> & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <Link href={route(concept, href)} {...rest}>
      {children}
    </Link>
  );
}
