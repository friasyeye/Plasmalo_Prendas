const DARK = "rgb(23, 28, 27)";
const MUTED = "rgb(69, 73, 73)";

function RecycleIcon() {
  return (
    <img src="/images/icon-recycle.svg" alt="" width={40} height={40} style={{ marginBottom: "24px", display: "block" }} />
  );
}
function GlobeIcon() {
  return (
    <img src="/images/icon-globe.svg" alt="" width={40} height={40} style={{ marginBottom: "24px", display: "block" }} />
  );
}
function ShoeIcon() {
  return (
    <img src="/images/icon-shoe.svg" alt="" width={40} height={40} style={{ marginBottom: "24px", display: "block" }} />
  );
}
function PeopleIcon() {
  return (
    <img src="/images/icon-people.svg" alt="" width={40} height={40} style={{ marginBottom: "24px", display: "block" }} />
  );
}

const values = [
  {
    Icon: RecycleIcon,
    title: "We believe every step counts.",
    desc: "From recycled materials to carbon-neutral shipping, sustainability isn't a feature — it's our foundation. Every product we design is a small step toward a cleaner planet.",
  },
  {
    Icon: GlobeIcon,
    title: "People matter as much as the planet.",
    desc: "We partner only with manufacturers who ensure safe working conditions, fair wages, and ethical labor practices across every step of production.",
  },
  {
    Icon: ShoeIcon,
    title: "Looks good. Feels better.",
    desc: "Our shoes are engineered for comfort and performance, but never at the cost of style. Sustainability should look as good as it feels.",
  },
  {
    Icon: PeopleIcon,
    title: "Built with you, not just for you.",
    desc: "We listen. From co-creating new styles with our customers to reinvesting in local communities, Refeet is a movement, not just a brand.",
  },
];

export function MissionValues() {
  return (
    <section style={{ padding: "80px 0", backgroundColor: "rgb(246, 247, 247)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 400, color: DARK, marginBottom: "48px" }}>
          Our Mission &amp; Values
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {values.map((v) => (
            <div key={v.title} style={{ backgroundColor: "white", padding: "40px" }}>
              <v.Icon />
              <h3 style={{ fontSize: "20px", fontWeight: 400, color: DARK, marginBottom: "12px" }}>
                {v.title}
              </h3>
              <p style={{ fontSize: "16px", fontWeight: 400, color: MUTED, lineHeight: "1.6" }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
