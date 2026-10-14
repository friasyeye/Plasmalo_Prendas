import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BrandSessionIntro } from "@/components/brand-session/BrandSessionIntro";
import { BrandSessionCalendly } from "@/components/brand-session/BrandSessionCalendly";
import { BrandSessionApproach } from "@/components/brand-session/BrandSessionApproach";
import { BrandSessionFaqs } from "@/components/brand-session/BrandSessionFaqs";

export default function BrandSessionPage() {
  return (
    <>
      <Navbar variant="overlay" />
      <main>
        <BrandSessionIntro />
        <BrandSessionCalendly />
        <BrandSessionApproach />
        <BrandSessionFaqs />
      </main>
      <Footer />
    </>
  );
}
