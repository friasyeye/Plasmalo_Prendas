const DARK = "rgb(23, 28, 27)";
const MUTED = "rgb(69, 73, 73)";

const testimonials = [
  { quote: "Lightweight, breathable, and they go with everything. Already bought my second pair.", author: "Marco L." },
  { quote: "Ridiculously comfortable from day one and I love knowing they're made from recycled materials.", author: "Jasmine T." },
  { quote: "The closed-loop return program sealed the deal for me. Great shoes, greater mission.", author: "Priya D." },
];

export function Testimonials() {
  return (
    <section style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 80px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 400, color: DARK, marginBottom: "48px" }}>
          What People Are Saying
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {testimonials.map((t) => (
            <div key={t.author} style={{ backgroundColor: "rgb(246, 247, 247)", padding: "32px" }}>
              <p style={{ fontSize: "16px", fontWeight: 500, color: DARK, lineHeight: "1.6", marginBottom: "24px" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <p style={{ fontSize: "16px", fontWeight: 400, color: MUTED }}>
                — {t.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
