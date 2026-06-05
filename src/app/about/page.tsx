import { AboutHero } from "@/components/AboutHero";
import { AboutFullPhoto } from "@/components/AboutFullPhoto";
import { StorySection } from "@/components/StorySection";
import { Timeline } from "@/components/Timeline";
import { MissionValues } from "@/components/MissionValues";
import { TeamSection } from "@/components/TeamSection";
import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";

export const metadata = {
  title: "About Us – Our Story & Mission",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutFullPhoto />
      <StorySection />
      <Timeline />
      <MissionValues />
      <TeamSection />
      <Testimonials />
      <CTASection />
    </main>
  );
}
