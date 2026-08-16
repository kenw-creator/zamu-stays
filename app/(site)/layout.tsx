import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { StickyBookBar } from "@/components/StickyBookBar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-20 lg:pb-0">
      <Nav />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
      <StickyBookBar />
    </div>
  );
}
