"use client";

import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { getContent } from "@/content";
import { COUNTRIES } from "@/data/countries";
import { CATEGORY_ORDER, CATALOG } from "@/data/catalog";
import { cn } from "@/lib/cn";

type Ctx = { open: (productModel?: string) => void };
const InquiryContext = createContext<Ctx | null>(null);

export function useInquiry(): Ctx {
  const ctx = useContext(InquiryContext);
  if (!ctx) throw new Error("useInquiry must be used inside <InquiryProvider>");
  return ctx;
}

/**
 * Provides a single inquiry drawer per concept. Any "CatalogItem Inquiry" button calls
 * open(model) and the drawer opens with that product pre-selected.
 */
export function InquiryProvider({ children, variant }: { children: ReactNode; variant: "a" | "b" }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [product, setProduct] = useState("");
  const [session, setSession] = useState(0);
  const { site } = getContent();

  const open = useCallback((model?: string) => {
    setProduct(model ?? "");
    setSession((s) => s + 1);
    dialogRef.current?.showModal();
  }, []);

  const close = () => dialogRef.current?.close();

  return (
    <InquiryContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="inquiry-title"
        className={cn(
          "fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-dvh w-full max-w-[34rem] overflow-y-auto border-0 p-0 text-fg shadow-2xl",
          "backdrop:bg-black/50 backdrop:backdrop-blur-[2px]",
          "open:animate-[drawer-in_.35s_cubic-bezier(.2,.7,.2,1)]",
          variant === "a" ? "bg-bg" : "border-l border-line bg-panel",
        )}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="flex min-h-full flex-col">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-inherit px-6 py-5 sm:px-8">
            <h2 id="inquiry-title" className={cn("text-xl", variant === "a" ? "a-display text-2xl" : "b-display")}>
              {site.inquiry.title}
            </h2>
            <button type="button" onClick={close} className="-mr-2 p-2 text-sm text-mute hover:text-fg" aria-label={site.ui.close}>
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
          <div className="px-6 py-6 sm:px-8">
            <p className="mb-6 text-sm text-mute">{site.inquiry.intro}</p>
            <InquiryForm key={session} defaultProduct={product} variant={variant} />
          </div>
        </div>
      </dialog>
      <style>{`@keyframes drawer-in{from{transform:translateX(40px);opacity:0}to{transform:none;opacity:1}}`}</style>
    </InquiryContext.Provider>
  );
}

/** Inquiry form — UI only. Submitting never pretends to send. */
export function InquiryForm({ defaultProduct = "", variant, compact }: { defaultProduct?: string; variant: "a" | "b"; compact?: boolean }) {
  const { site } = getContent();
  const f = site.inquiry.fields;
  const [submitted, setSubmitted] = useState(false);
  const noticeRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  useEffect(() => {
    if (submitted) noticeRef.current?.focus();
  }, [submitted]);

  const field = cn(
    "w-full rounded-[2px] border bg-transparent px-3 py-2.5 text-[0.95rem] outline-none transition-colors placeholder:text-mute/70",
    "border-line focus:border-fg",
    variant === "b" && "bg-bg/60",
  );
  const label = "mb-1.5 block text-xs font-medium text-mute";
  const req = <span className="text-accent-ink" aria-hidden> *</span>;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="grid gap-4"
      aria-describedby={submitted ? `${uid}-notice` : undefined}
    >
      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <div>
          <label htmlFor={`${uid}-name`} className={label}>
            {f.name}
            {req}
          </label>
          <input id={`${uid}-name`} name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor={`${uid}-company`} className={label}>
            {f.company}
            {req}
          </label>
          <input id={`${uid}-company`} name="company" required autoComplete="organization" className={field} />
        </div>
        <div>
          <label htmlFor={`${uid}-country`} className={label}>
            {f.country}
            {req}
          </label>
          <select id={`${uid}-country`} name="country" required defaultValue="" className={cn(field, "appearance-none")}>
            <option value="" disabled>
              {site.inquiry.countryPlaceholder}
            </option>
            {COUNTRIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className={label}>
            {f.email}
            {req}
          </label>
          <input id={`${uid}-email`} name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor={`${uid}-product`} className={label}>
          {f.product}
        </label>
        <select id={`${uid}-product`} name="product" defaultValue={defaultProduct} className={cn(field, "appearance-none")}>
          <option value="">{site.inquiry.generalOption}</option>
          {CATEGORY_ORDER.filter((cat) => CATALOG.some((p) => p.category === cat)).map((cat) => (
            <optgroup key={cat} label={site.categories[cat].label}>
              {CATALOG.filter((p) => p.category === cat).map((p) => (
                <option key={p.slug} value={p.model}>
                  {p.model} — {p.subtitle ?? p.title}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${uid}-message`} className={label}>
          {f.message}
          {req}
        </label>
        <textarea id={`${uid}-message`} name="message" required rows={compact ? 4 : 5} placeholder={site.inquiry.messagePlaceholder} className={field} />
      </div>
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          className={cn(
            "inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors",
            variant === "a" ? "bg-fg text-bg hover:bg-accent hover:text-[#16181b]" : "bg-accent text-[#10141c] hover:bg-[#ff9366]",
          )}
        >
          {site.inquiry.submit}
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </button>
        <span className="text-xs text-mute">* {site.inquiry.required}</span>
      </div>
      {submitted && (
        <div
          id={`${uid}-notice`}
          ref={noticeRef}
          tabIndex={-1}
          role="status"
          className="border-l-2 border-accent bg-accent/10 p-4 text-sm outline-none"
        >
          <p className="font-semibold">{site.inquiry.prototypeTitle}</p>
          <p className="mt-1 text-mute">{site.inquiry.prototypeBody}</p>
          <p className="mt-2 text-mute">
            {site.inquiry.directContact}{" "}
            <a className="font-medium text-fg underline underline-offset-2" href={`mailto:${site.contact.salesEmail}`}>
              {site.contact.salesEmail}
            </a>
            .
          </p>
        </div>
      )}
    </form>
  );
}

/** Button that opens the inquiry drawer with a product pre-selected. */
export function InquiryButton({ model, className, children }: { model?: string; className?: string; children: ReactNode }) {
  const { open } = useInquiry();
  return (
    <button type="button" className={className} onClick={() => open(model)} aria-haspopup="dialog">
      {children}
    </button>
  );
}
