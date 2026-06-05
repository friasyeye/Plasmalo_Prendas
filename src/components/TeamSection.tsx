const DARK = "rgb(23, 28, 27)";
const MUTED = "rgb(69, 73, 73)";

const team = [
  { name: "Samir Rahman", role: "Co-Founder & CEO",       image: "/images/team-samir-rahman.png" },
  { name: "Nina Patel",   role: "Supply Chain Manager",   image: "/images/team-nina-patel.png" },
  { name: "Leo Kim",      role: "Design Director",        image: "/images/team-leo-kim.png" },
  { name: "Jada Thompson", role: "Community Lead",        image: "/images/team-jada-thompson.png" },
];

export function TeamSection() {
  return (
    <section style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 400, color: DARK, marginBottom: "48px" }}>
          Meet the Team
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px" }}>
          {team.map((member) => (
            <div key={member.name}>
              <div style={{ aspectRatio: "274/380", overflow: "hidden", marginBottom: "16px" }}>
                <img
                  src={member.image}
                  alt={member.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                />
              </div>
              <p style={{ fontSize: "20px", fontWeight: 400, color: DARK, marginBottom: "4px" }}>
                {member.name}
              </p>
              <p style={{ fontSize: "16px", fontWeight: 400, color: MUTED }}>
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
