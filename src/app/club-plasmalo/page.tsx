import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClubIntro } from "@/components/club/ClubIntro";
import { ClubTimeline } from "@/components/club/ClubTimeline";
import { ClubBenefits } from "@/components/club/ClubBenefits";

export default function ClubPlasmaloPage() {
  return (
    <>
      <Navbar variant="overlay" />
      <main>
        <ClubIntro />
        <ClubTimeline />
        <ClubBenefits />
      </main>
      <Footer />
    </>
  );
}
