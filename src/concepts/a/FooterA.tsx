import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { InquiryButton } from "@/components/shared/Inquiry";
import { Logo } from "@/components/shared/Logo";
import { LanguageSwitch } from "@/components/shared/LanguageSwitch";
import { SocialIcons } from "@/components/shared/Social";
import { Arrow } from "./HeaderA";
import { Container } from "./ui";

/**
 * Revision 03 footer — white and compact (client: "하얀색 바탕 / 높이를 낮추고 Compact하게").
 * The former dark inquiry band is folded into the first row. The detailed footer structure will be
 * supplied by the client later, so the three rows below are kept simple and independent.
 */
export function FooterA() {
  const { site, homeA } = getContent();
  const f = homeA.r3.footer;
  return (
    <footer className="border-t border-line bg-white">
      {/* row 1 — product inquiry + channels */}
      <Container className="flex flex-col gap-4 border-b border-line py-6 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="text-[1.05rem] font-semibold tracking-[-0.015em]">{f.inquiryTitle}</p>
          <p className="mt-0.5 text-sm text-mute">{f.inquiryBody}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <InquiryButton className="group inline-flex h-11 items-center gap-2.5 bg-fg px-5 text-sm font-semibold text-white transition-colors hover:bg-accent hover:text-fg">
            {f.inquiry} <Arrow className="transition-transform group-hover:translate-x-1" />
          </InquiryButton>
          <CLink concept="a" href="/contact/" className="inline-flex h-11 items-center border border-fg/20 px-5 text-sm font-semibold transition-colors hover:border-fg">
            {f.contact}
          </CLink>
          <span className="ml-1 hidden h-6 w-px bg-line sm:block" aria-hidden />
          <SocialIcons iconClassName="text-fg/60 hover:text-fg" />
        </div>
      </Container>

      {/* row 2 — logo + contact · key navigation */}
      <Container className="grid gap-6 py-7 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <Logo variant="primary" height={22} />
          <address className="mt-4 space-y-0.5 text-[0.82rem] leading-relaxed text-mute not-italic">
            <p>
              <span className="font-semibold text-fg">{site.brand.legalName}</span> · {site.contact.address}
            </p>
            <p>
              T{" "}
              <a href={`tel:${site.contact.tel.replace(/-/g, "")}`} className="hover:text-fg">
                {site.contact.tel}
              </a>
              <span className="mx-2">·</span>F {site.contact.fax}
              <span className="mx-2">·</span>
              <a href={`mailto:${site.contact.salesEmail}`} className="hover:text-fg">
                {site.contact.salesEmail}
              </a>
            </p>
          </address>
        </div>
        <nav aria-label="Footer" className="lg:col-span-7">
          <ul className="flex flex-wrap gap-x-7 gap-y-2 lg:justify-end">
            {site.nav.map((g) => (
              <li key={g.id}>
                <CLink concept="a" href={g.href} className="a-label text-fg/80 hover:text-accent-ink">
                  {g.label}
                </CLink>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      {/* row 3 — legal */}
      <Container className="flex flex-col gap-2 border-t border-line py-4 text-xs text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>{site.footer.copyright}</p>
        <div className="flex items-center gap-4">
          <span>{site.footer.prototypeNote}</span>
          <LanguageSwitch />
        </div>
      </Container>
    </footer>
  );
}
