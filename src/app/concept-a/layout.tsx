import { InquiryProvider } from "@/components/shared/Inquiry";
import { FooterA } from "@/concepts/a/FooterA";
import { HeaderA } from "@/concepts/a/HeaderA";

export default function ConceptALayout({ children }: LayoutProps<"/concept-a">) {
  return (
    <div className="theme-a min-h-dvh bg-bg font-sans text-fg">
      <InquiryProvider variant="a">
        <HeaderA />
        <main id="main">{children}</main>
        <FooterA />
      </InquiryProvider>
    </div>
  );
}
