"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const productCategories = ["Camisetas", "Sudaderas", "Polos", "Merchandising"];

function CartIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="17.5" cy="20" r="1.4" />
      <path d="M2.5 3.5h3l2.6 12h10.4l2.4-8.5H6.4" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200",
        scrolled ? "border-b border-gray-200 shadow-sm" : ""
      )}
    >
      <div className="flex items-center justify-between px-4 md:px-8 py-4 h-16">
        {/* Mobile: hamburger button */}
        <button
          aria-label="Abrir menú"
          className="md:hidden text-black"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/images/logo_plasmalo.png"
            alt="Plásmalo"
            width={512}
            height={512}
            priority
            className="h-12 w-12 md:h-14 md:w-14 object-contain"
          />
        </Link>

        {/* Desktop: category links */}
        <div className="hidden md:flex items-center gap-8">
          {productCategories.map((category) => (
            <a
              key={category}
              href="#"
              className="text-[15px] font-medium capitalize text-black hover:opacity-70 transition-opacity"
              style={{ fontFamily: "var(--font-satoshi)" }}
            >
              {category}
            </a>
          ))}
        </div>

        {/* Right side: cart */}
        <div className="flex items-center gap-4 md:gap-6">
          <button
            aria-label="Carrito"
            className="flex items-center text-black hover:opacity-70 transition-opacity"
          >
            <CartIcon size={20} />
            <span className="text-sm ml-0.5">0</span>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="flex items-center justify-between px-4 py-4 h-16 border-b border-gray-200">
            <Image
              src="/images/logo_plasmalo.png"
              alt="Plásmalo"
              width={512}
              height={512}
              className="h-12 w-12 object-contain"
            />
            <button
              aria-label="Cerrar menú"
              className="text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col px-4 py-6">
            <p
              className="text-xs uppercase tracking-wider text-gray-400 mb-3"
              style={{ fontFamily: "var(--font-satoshi)" }}
            >
              Productos
            </p>
            {productCategories.map((category) => (
              <a
                key={category}
                href="#"
                className="text-lg text-black py-3 border-b border-gray-100"
                style={{ fontFamily: "var(--font-satoshi)" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
