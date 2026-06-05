const DARK = "rgb(23, 28, 27)";
const MUTED = "rgb(69, 73, 73)";

export function StorySection() {
  return (
    <>
      {/* Full-width editorial photo */}
      <div className="w-full overflow-hidden" style={{ height: "480px" }}>
        <img
          src="/images/about-full-photo.png"
          alt="About Refeet"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Story text */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "730px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 400, color: DARK, marginBottom: "24px" }}>
            A Journey with Purpose
          </h2>
          <p style={{ fontSize: "16px", fontWeight: 500, color: MUTED, lineHeight: "1.7", marginBottom: "16px" }}>
            In a world overflowing with plastic waste and fast fashion, Refeet was born from a simple yet powerful question:
          </p>
          <p style={{ fontSize: "16px", fontWeight: 500, color: DARK, lineHeight: "1.7", marginBottom: "24px" }}>
            &ldquo;What if your next favorite pair of sneakers could help clean the planet?&rdquo;
          </p>
          <p style={{ fontSize: "16px", fontWeight: 400, color: MUTED, lineHeight: "1.7", marginBottom: "16px" }}>
            Our founder, a lifelong outdoor enthusiast and sustainability advocate, saw the staggering effects of plastic pollution during a trip to coastal South Asia. The beaches were littered with bottles, the ocean choked with waste — and it struck a nerve. That moment became the catalyst for change.
          </p>
          <p style={{ fontSize: "16px", fontWeight: 400, color: MUTED, lineHeight: "1.7", marginBottom: "16px" }}>
            With a mission to create a shoe that treads lightly on the Earth while delivering maximum comfort and style, Refeet was founded — turning discarded plastic bottles into premium sneakers designed for everyday movement.
          </p>
          <p style={{ fontSize: "16px", fontWeight: 400, color: MUTED, lineHeight: "1.7", marginBottom: "16px" }}>
            We believe sustainability doesn&apos;t have to sacrifice performance or aesthetics.
          </p>
          <p style={{ fontSize: "16px", fontWeight: 400, color: MUTED, lineHeight: "1.7" }}>
            That&apos;s why every pair of Refeet shoes is ethically made, environmentally driven, and thoughtfully designed — from the materials to the message.
          </p>
        </div>
      </section>
    </>
  );
}
