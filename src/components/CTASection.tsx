"use client";
import Link from "next/link";
import { useState } from "react";

const DARK = "rgb(23, 28, 27)";
const MUTED = "rgb(69, 73, 73)";

export function CTASection() {
  const [email, setEmail] = useState("");

  return (
    <>
      {/* 2-col CTA: text left + photo right */}
      <section style={{ padding: "0 80px", backgroundColor: "rgb(246, 247, 247)" }}>
        <div style={{ display: "flex", alignItems: "stretch", minHeight: "380px" }}>
          {/* Left: text + button */}
          <div style={{ flex: "0 0 50%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 60px 60px 0" }}>
            <h2 style={{ fontSize: "40px", fontWeight: 400, color: DARK, lineHeight: "1.15", marginBottom: "20px" }}>
              Step Into the Future,<br />Sustainably.
            </h2>
            <p style={{ fontSize: "16px", fontWeight: 400, color: MUTED, lineHeight: "1.6", marginBottom: "32px" }}>
              Join the movement toward lighter footprints and better choices.
            </p>
            <div>
              <Link
                href="/shop"
                style={{
                  display: "inline-block",
                  backgroundColor: DARK,
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "14px 32px",
                  borderRadius: "999px",
                  textDecoration: "none",
                }}
              >
                Shop The Collection
              </Link>
            </div>
          </div>
          {/* Right: photo */}
          <div style={{ flex: "0 0 50%", overflow: "hidden" }}>
            <img
              src="/images/about-cta-photo.png"
              alt="Refeet Collection"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
      </section>

      {/* Email subscribe strip */}
      <section style={{ padding: "64px 80px", backgroundColor: "white", textAlign: "center" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 400, color: DARK, marginBottom: "12px" }}>
          Join the Refeet Movement
        </h2>
        <p style={{ fontSize: "16px", fontWeight: 400, color: MUTED, marginBottom: "24px" }}>
          Get exclusive offers, product launches &amp; sustainable living tips.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: "flex", maxWidth: "440px", margin: "0 auto" }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            style={{
              flex: 1,
              padding: "12px 16px",
              fontSize: "16px",
              border: "1px solid rgb(229,229,229)",
              outline: "none",
              color: DARK,
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: DARK,
              color: "white",
              fontSize: "16px",
              fontWeight: 400,
              padding: "12px 24px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Subscribe
          </button>
        </form>
      </section>
    </>
  );
}
