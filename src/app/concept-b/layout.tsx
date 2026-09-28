import { InquiryProvider } from "@/components/shared/Inquiry";
import { FooterB } from "@/concepts/b/FooterB";
import { HeaderB } from "@/concepts/b/HeaderB";

export default function ConceptBLayout({ children }: LayoutProps<"/concept-b">) {
  return (
    <div className="theme-b min-h-dvh bg-bg font-sans text-fg">
      <InquiryProvider variant="b">
        <HeaderB />
        <main id="main">{children}</main>
        <FooterB />
      </InquiryProvider>
    </div>
  );
}
