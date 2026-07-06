import { TopBar } from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
