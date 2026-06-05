"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const DARK = "rgb(23, 28, 27)";
const MUTED = "rgb(69, 73, 73)";

const CATEGORIES = ["Men's", "Women's", "Unisex"];
const MATERIALS = [
  "Recycled Plastic Bottles",
  "Organic Cotton",
  "Natural Rubber",
  "Sugarcane EVA",
  "Vegan Leather",
  "Recycled Foam Insoles",
];
const SUSTAINABILITY = ["Vegan", "Recycled", "Carbon Neutral", "Non-toxic Dyes", "Organic"];
const SIZES = ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"];
const COLORS = [
  { label: "Pink",   hex: "#F4A8B8" },
  { label: "Purple", hex: "#9B59B6" },
  { label: "Red",    hex: "#E74C3C" },
  { label: "Yellow", hex: "#F1C40F" },
  { label: "Green",  hex: "#2ECC71" },
  { label: "Blue",   hex: "#3498DB" },
];

type SectionKey = "category" | "material" | "sustainability" | "size" | "color";

function SectionHeader({
  label,
  sectionKey,
  expanded,
  onToggle,
}: {
  label: string;
  sectionKey: SectionKey;
  expanded: Record<SectionKey, boolean>;
  onToggle: (key: SectionKey) => void;
}) {
  return (
    <button
      onClick={() => onToggle(sectionKey)}
      className="flex justify-between items-center w-full cursor-pointer"
      style={{ paddingTop: "16px", paddingBottom: expanded[sectionKey] ? "8px" : "16px" }}
    >
      <span style={{ fontSize: "18px", fontWeight: 400, color: DARK, lineHeight: "28.8px" }}>
        {label}
      </span>
      {expanded[sectionKey]
        ? <ChevronUp size={16} style={{ color: DARK, flexShrink: 0 }} />
        : <ChevronDown size={16} style={{ color: DARK, flexShrink: 0 }} />}
    </button>
  );
}

function CheckRow({
  id,
  label,
  checked,
  onToggle,
}: {
  id: string;
  label: string;
  checked: Set<string>;
  onToggle: (id: string) => void;
}) {
  const on = checked.has(id);
  return (
    <div
      onClick={() => onToggle(id)}
      className="flex items-center cursor-pointer"
      style={{ gap: "7px", paddingTop: "7px", paddingBottom: "7px", paddingLeft: "7px", height: "34px" }}
    >
      <span
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: "16px", height: "16px",
          border: `1px solid ${on ? DARK : "rgb(200,200,200)"}`,
          borderRadius: "2px",
          backgroundColor: on ? DARK : "white",
        }}
      >
        {on && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span style={{ fontSize: "16px", fontWeight: 400, color: MUTED, lineHeight: "16px" }}>
        {label}
      </span>
    </div>
  );
}

export function FilterSidebar() {
  const [expanded, setExpanded] = useState<Record<SectionKey, boolean>>({
    category: true, material: true, sustainability: true, size: true, color: true,
  });
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [sizes, setSizes] = useState<Set<string>>(new Set());
  const [colors, setColors] = useState<Set<string>>(new Set());
  const [sort] = useState("Relevance");

  const toggle = (key: SectionKey) => setExpanded(p => ({ ...p, [key]: !p[key] }));
  const toggleCheck = (id: string) => setChecked(p => { const n = new Set(p); if (n.has(id)) { n.delete(id); } else { n.add(id); } return n; });
  const toggleSize = (s: string) => setSizes(p => { const n = new Set(p); if (n.has(s)) { n.delete(s); } else { n.add(s); } return n; });
  const toggleColor = (c: string) => setColors(p => { const n = new Set(p); if (n.has(c)) { n.delete(c); } else { n.add(c); } return n; });

  return (
    <aside style={{ width: "250px", flexShrink: 0 }}>
      {/* Shop + sort row */}
      <div className="flex justify-between items-center" style={{ paddingBottom: "16px", borderBottom: "1px solid rgb(229,229,229)" }}>
        <span style={{ fontSize: "14px", fontWeight: 400, color: DARK }}>Shop</span>
        <div className="flex items-center gap-1" style={{ cursor: "pointer" }}>
          <span style={{ fontSize: "14px", color: MUTED }}>{sort}</span>
          <ChevronDown size={12} style={{ color: MUTED }} />
        </div>
      </div>

      {/* Category */}
      <div style={{ borderBottom: "1px solid rgb(229,229,229)", paddingBottom: expanded.category ? "16px" : "0" }}>
        <SectionHeader label="Category" sectionKey="category" expanded={expanded} onToggle={toggle} />
        {expanded.category && CATEGORIES.map(c => <CheckRow key={c} id={`cat-${c}`} label={c} checked={checked} onToggle={toggleCheck} />)}
      </div>

      {/* Material */}
      <div style={{ borderBottom: "1px solid rgb(229,229,229)", paddingBottom: expanded.material ? "16px" : "0" }}>
        <SectionHeader label="Material" sectionKey="material" expanded={expanded} onToggle={toggle} />
        {expanded.material && MATERIALS.map(m => <CheckRow key={m} id={`mat-${m}`} label={m} checked={checked} onToggle={toggleCheck} />)}
      </div>

      {/* Sustainability */}
      <div style={{ borderBottom: "1px solid rgb(229,229,229)", paddingBottom: expanded.sustainability ? "16px" : "0" }}>
        <SectionHeader label="Sustainability" sectionKey="sustainability" expanded={expanded} onToggle={toggle} />
        {expanded.sustainability && SUSTAINABILITY.map(s => <CheckRow key={s} id={`sus-${s}`} label={s} checked={checked} onToggle={toggleCheck} />)}
      </div>

      {/* Size */}
      <div style={{ borderBottom: "1px solid rgb(229,229,229)", paddingBottom: expanded.size ? "16px" : "0" }}>
        <SectionHeader label="Size" sectionKey="size" expanded={expanded} onToggle={toggle} />
        {expanded.size && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "4px", paddingLeft: "7px" }}>
            {SIZES.map(s => {
              const on = sizes.has(s);
              return (
                <button
                  key={s}
                  onClick={() => toggleSize(s)}
                  style={{
                    fontSize: "12px",
                    color: on ? "white" : DARK,
                    backgroundColor: on ? DARK : "white",
                    border: `1px solid ${on ? DARK : "rgb(229,229,229)"}`,
                    height: "36px",
                    cursor: "pointer",
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Color */}
      <div style={{ borderBottom: "1px solid rgb(229,229,229)", paddingBottom: expanded.color ? "16px" : "0" }}>
        <SectionHeader label="Color" sectionKey="color" expanded={expanded} onToggle={toggle} />
        {expanded.color && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingLeft: "7px" }}>
            {COLORS.map(c => {
              const on = colors.has(c.label);
              return (
                <button
                  key={c.label}
                  onClick={() => toggleColor(c.label)}
                  title={c.label}
                  style={{
                    width: "24px", height: "24px", borderRadius: "50%",
                    backgroundColor: c.hex, cursor: "pointer",
                    border: `2px solid ${on ? DARK : "transparent"}`,
                    outline: on ? `1px solid ${DARK}` : "none",
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
