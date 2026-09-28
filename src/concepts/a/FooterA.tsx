import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Logo } from "@/components/shared/Logo";
import { LanguageSwitch } from "@/components/shared/LanguageSwitch";
import { Container } from "./ui";

export function FooterA() {
  const { site } = getContent();
  return (
    <footer className="border-t border-line bg-panel">
      <Container className="grid gap-12 pt-16 pb-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo variant="primary" height={28} />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-mute">{site.footer.statement}</p>
          <address className="mt-8 space-y-1 text-sm not-italic">
            <p className="font-semibold">{site.brand.legalName}</p>
            <p className="text-mute">{site.contact.address}</p>
            <p className="pt-2">
              <span className="text-mute">T </span>
              <a href={`tel:${site.contact.tel.replace(/-/g, "")}`} className="hover:underline">
                {site.contact.tel}
              </a>
              <span className="ml-4 text-mute">F </span>
              {site.contact.fax}
            </p>
            <p>
              <a href={`mailto:${site.contact.salesEmail}`} className="hover:underline">
                {site.contact.salesEmail}
              </a>
            </p>
          </address>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
          {site.nav.map((g) => (
            <div key={g.id}>
              <CLink concept="a" href={g.href} className="a-label text-fg hover:text-accent-ink">
                {g.label}
              </CLink>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <CLink concept="a" href={l.href} className="text-sm text-mute hover:text-fg">
                      {l.label}
                    </CLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>
      <Container className="flex flex-col gap-4 border-t border-line py-6 text-xs text-mute md:flex-row md:items-center md:justify-between">
        <p>{site.footer.copyright}</p>
        <p className="md:text-center">{site.footer.prototypeNote}</p>
        <LanguageSwitch />
      </Container>
    </footer>
  );
}
