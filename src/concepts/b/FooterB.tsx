import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { LanguageSwitch } from "@/components/shared/LanguageSwitch";
import { Logo } from "@/components/shared/Logo";
import { Wrap } from "./ui";

export function FooterB() {
  const { site } = getContent();
  return (
    <footer className="border-t border-line bg-bg">
      <Wrap className="grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo variant="white" height={24} />
          <p className="b-code mt-6 text-mute">Capture → Video data → Analysis → Response</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mute">{site.footer.statement}</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
          {site.nav.map((g, i) => (
            <div key={g.id}>
              <CLink concept="b" href={g.href} className="b-code text-fg hover:text-accent">
                0{i + 1} {g.label}
              </CLink>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <CLink concept="b" href={l.href} className="text-sm text-mute hover:text-fg">
                      {l.label}
                    </CLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Wrap>
      <Wrap className="grid gap-6 border-t border-line py-8 text-sm md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="b-code text-mute">{site.contact.hqLabel}</p>
          <p className="mt-2 text-fg/80">{site.contact.address}</p>
        </div>
        <div>
          <p className="b-code text-mute">Tel / Fax</p>
          <p className="mt-2 text-fg/80">
            {site.contact.tel}
            <br />
            {site.contact.fax}
          </p>
        </div>
        <div>
          <p className="b-code text-mute">Email</p>
          <p className="mt-2">
            <a href={`mailto:${site.contact.salesEmail}`} className="text-fg/80 hover:text-accent">
              {site.contact.salesEmail}
            </a>
          </p>
        </div>
      </Wrap>
      <Wrap className="flex flex-col gap-3 border-t border-line py-6 text-xs text-mute md:flex-row md:items-center md:justify-between">
        <p>{site.footer.copyright}</p>
        <p>{site.footer.prototypeNote}</p>
        <LanguageSwitch />
      </Wrap>
    </footer>
  );
}
