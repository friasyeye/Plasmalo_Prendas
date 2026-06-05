"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Prendas", href: "/shop" },
  { label: "Preguntas frecuentes", href: "/faq" },
  { label: "Contacto", href: "/contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menú al hacer scroll
  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrolled]);

  const textColor = scrolled || menuOpen
    ? "text-black hover:text-black/60"
    : "text-white hover:text-white/70";

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen ? "bg-white border-b border-black/10" : "bg-transparent"
        }`}
      >
        <nav className="h-[60px] flex items-center justify-between px-6 md:px-10 max-w-[1440px] mx-auto">

          {/* Logo — izquierda */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.svg"
              alt="Plásmalo"
              width={28}
              height={28}
              className={scrolled || menuOpen ? "invert-0" : "invert"}
            />
          </Link>

          {/* Links centrados — solo desktop */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={`text-sm font-normal transition-colors ${textColor}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Botón hamburguesa — solo móvil */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 ml-auto"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-px w-6 transition-all duration-300 origin-center ${
                scrolled || menuOpen ? "bg-black" : "bg-white"
              } ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block h-px w-6 transition-all duration-300 ${
                scrolled || menuOpen ? "bg-black" : "bg-white"
              } ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-6 transition-all duration-300 origin-center ${
                scrolled || menuOpen ? "bg-black" : "bg-white"
              } ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </nav>

        {/* Menú móvil desplegable */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-black/10 ${
            menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm font-normal text-black hover:text-black/60 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
