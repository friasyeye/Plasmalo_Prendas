"use client";
import { useRef } from "react";

const DARK = "rgb(23, 28, 27)";
const MUTED = "rgb(69, 73, 73)";

const items = [
  { year: "Today", title: "The Movement Grows", desc: "Thousands walk lighter with Refeet. The mission grows with every step." },
  { year: "2023", title: "Expanded Line", desc: "Launched new styles with bamboo lining, cotton laces & added more unisex sneaker designs." },
  { year: "2022", title: "B-Corp Pending & Carbon Offsetting", desc: "Started B-Corp certification and introduced carbon-neutral shipping to reduce our footprint." },
  { year: "2021", title: "First Product Launched", desc: "EcoLite Trail sneaker debuts and sells out in 72 hours, proving strong demand for change." },
  { year: "2020", title: "R&D Begins", desc: "Partnered with eco-labs to create our first sneaker upper from 85% recycled plastic bottles." },
  { year: "2019", title: "The Spark", desc: "Our founder visits South Asia and sees the devastating impact of plastic waste firsthand." },
];

export function Timeline() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section style={{ padding: "80px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 80px", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 400, color: DARK }}>Our Journey</h2>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => trackRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
              style={{ width: "40px", height: "40px", border: "1px solid rgb(229,229,229)", backgroundColor: "white", fontSize: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: DARK }}
              aria-label="Previous"
            >‹</button>
            <button
              onClick={() => trackRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
              style={{ width: "40px", height: "40px", border: "1px solid rgb(229,229,229)", backgroundColor: "white", fontSize: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: DARK }}
              aria-label="Next"
            >›</button>
          </div>
        </div>
        <div
          ref={trackRef}
          style={{ display: "flex", gap: "24px", padding: "0 80px", overflowX: "auto", scrollbarWidth: "none" }}
        >
          {items.map((item) => (
            <div
              key={item.year}
              style={{ minWidth: "300px", flexShrink: 0, border: "1px solid rgb(229,229,229)", padding: "32px" }}
            >
              <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", color: MUTED }}>
                {item.year}
              </span>
              <h3 style={{ fontSize: "20px", fontWeight: 400, color: DARK, marginTop: "8px", marginBottom: "8px" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "16px", fontWeight: 400, color: MUTED, lineHeight: "1.6" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
