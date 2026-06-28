"use client";

import { useState, useEffect } from "react";
import { Search, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FFNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["All", "JERSEYS", "ACCESSORIES", "ABOUT US"];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white flex justify-between items-center px-8 py-4 h-16 transition-shadow duration-200",
        scrolled ? "border-b border-gray-200 shadow-sm" : ""
      )}
    >
      {/* Logo */}
      <span
        className="font-bold text-xl tracking-tight"
        style={{ fontFamily: "var(--font-spline-sans)" }}
      >
        FABFIT<span style={{ color: "rgb(251, 126, 36)" }}>.</span>
      </span>

      {/* Right side: nav links + icons */}
      <div className="flex items-center gap-6">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="text-sm uppercase tracking-wider text-black hover:opacity-70 transition-opacity"
            style={{ fontFamily: "var(--font-spline-sans)" }}
          >
            {link}
          </a>
        ))}

        <button
          aria-label="Search"
          className="text-black hover:opacity-70 transition-opacity"
        >
          <Search size={20} />
        </button>

        <button
          aria-label="Shopping bag"
          className="flex items-center text-black hover:opacity-70 transition-opacity"
        >
          <ShoppingBag size={20} />
          <span className="text-sm ml-0.5">0</span>
        </button>
      </div>
    </nav>
  );
}
