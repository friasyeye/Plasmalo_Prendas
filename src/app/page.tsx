import { FFTopBar } from "@/components/FFTopBar";
import FFNavbar from "@/components/FFNavbar";
import { FFHero } from "@/components/FFHero";
import { FFCategories } from "@/components/FFCategories";
import { FFTestimonials } from "@/components/FFTestimonials";
import { FFFooter } from "@/components/FFFooter";

export default function Home() {
  return (
    <>
      <FFTopBar />
      <FFNavbar />
      <main>
        <FFHero />
        <FFCategories />
        <FFTestimonials />
      </main>
      <FFFooter />
    </>
  );
}
