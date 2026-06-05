"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

// Inline SVG social icons (lucide-react version installed does not export social icons)
function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l16 16M4 20L20 4" />
      <path d="M10.5 4H4l5.5 7L4 20h3l4.5-5.5L17 20h3l-6.5-8.5L20 4h-3l-4 5z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

const footerNav = [
  {
    heading: "SHOP",
    links: [
      ["Home", "/"],
      ["Shop", "/shop"],
      ["Product Details", "#"],
      ["Lookbook", "#"],
      ["Wishlist", "#"],
      ["Find A Store", "#"],
    ],
  },
  {
    heading: "COMPANY",
    links: [
      ["About", "/about"],
      ["Impact", "/impact"],
      ["Careers", "#"],
      ["Careers Details", "#"],
      ["Media Kit", "#"],
      ["Gift Cards", "#"],
    ],
  },
  {
    heading: "EXPLORE",
    links: [
      ["Journal", "#"],
      ["Journal Details", "#"],
      ["Review", "#"],
      ["Sizing", "#"],
      ["Contact Us", "#"],
      ["FAQ", "#"],
    ],
  },
  {
    heading: "LEGAL",
    links: [
      ["Privacy Policy", "#"],
      ["Terms of Service", "#"],
      ["Shipping & Returns", "#"],
      ["404", "/404"],
      ["Affilate", "#"],
      ["Collaborations", "#"],
    ],
  },
];

const socialIcons: { icon: () => React.ReactElement; label: string }[] = [
  { icon: FacebookIcon, label: "Facebook" },
  { icon: TwitterIcon, label: "X (Twitter)" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: LinkedinIcon, label: "LinkedIn" },
  { icon: YoutubeIcon, label: "YouTube" },
  { icon: TiktokIcon, label: "TikTok" },
];

const paymentMethods = ["Visa", "Apple Pay", "Google Pay", "MC"];

export function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(23, 28, 27)" }} className="text-white py-16">
      <div className="max-w-[1440px] mx-auto px-10 md:px-20">
        {/* Top row */}
        <div className="flex gap-20">
          {/* Brand section */}
          <div className="w-72 flex-shrink-0">
            <Image
              src="/images/logo.svg"
              alt="Refeet"
              width={36}
              height={36}
              className="invert"
            />
            <p
              className="text-sm mt-4 leading-6 max-w-[280px]"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Sustainable shoes made for everyday movement. Designed with recycled materials, built
              for comfort, and committed to leaving a lighter footprint.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-6">
              {socialIcons.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="transition-colors"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)";
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="flex-1 grid grid-cols-4 gap-10">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: "16px",
                  }}
                >
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-2">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm transition-colors"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            "rgba(255,255,255,1)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            "rgba(255,255,255,0.7)";
                        }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex justify-between items-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            Copyright &copy; 2025 Refeet. All rights reserved. Built In Framer By DiverseKit
          </p>
          <div className="flex gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="text-[10px] rounded px-1.5 py-0.5"
                style={{
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
