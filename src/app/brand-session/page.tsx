import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BrandSessionIntro } from "@/components/brand-session/BrandSessionIntro";
import { BrandSessionCalendly } from "@/components/brand-session/BrandSessionCalendly";

export default function BrandSessionPage() {
  return (
    <>
      <Navbar />
      <main>
        <BrandSessionIntro />
        <BrandSessionCalendly />
      </main>
      <Footer />
    </>
  );
}
