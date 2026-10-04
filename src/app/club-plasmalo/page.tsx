import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClubIntro } from "@/components/club/ClubIntro";
import { ClubTimeline } from "@/components/club/ClubTimeline";
import { ClubBenefits } from "@/components/club/ClubBenefits";
import { ClubClosing } from "@/components/club/ClubClosing";

export default function ClubPlasmaloPage() {
  return (
    <>
      <Navbar />
      <main>
        <ClubIntro />
        <ClubTimeline />
        <ClubBenefits />
        <ClubClosing />
      </main>
      <Footer />
    </>
  );
}
