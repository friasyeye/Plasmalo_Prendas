"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartIcon } from "@/components/icons/CartIcon";
import type { NavEntry } from "@/config/navigation";
import { useCart } from "@/hooks/use-cart";
import { useScrolled } from "@/hooks/use-scrolled";
import { DesktopNav } from "./nav/DesktopNav";
import { MobileMenu } from "./nav/MobileMenu";
import { NAV_TRANSITION } from "./nav/transition";

interface NavbarClientProps {
  /** Entradas del menú, con las fotos de producto ya resueltas (ver Navbar.tsx). */
  entries: NavEntry[];
  /**
   * - "solid" (por defecto): fondo blanco siempre. Para páginas que empiezan
   *   con contenido claro.
   * - "overlay": transparente con texto blanco SOBRE el contenido, también al
   *   hacer scroll; solo se vuelve blanco al pasar el ratón o con un menú
   *   abierto. Solo para páginas cuyo primer bloque es oscuro y reserva
   *   arriba el alto del navbar (h-16), porque el contenido sube por debajo.
   */
  variant?: "solid" | "overlay";
}

export function NavbarClient({ entries, variant = "solid" }: NavbarClientProps) {
  const scrolled = useScrolled();
  const [hovered, setHovered] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  // Menú móvil: null = cerrado; si está abierto, px desde arriba del viewport
  // donde empieza (borde inferior de la barra, que varía según si el TopBar
  // sigue visible). Un único estado: "abierto" y "dónde" no pueden desincronizarse.
  const [mobileMenuTop, setMobileMenuTop] = useState<number | null>(null);
  const mobileMenuOpen = mobileMenuTop !== null;
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const { pricing, openCart } = useCart();

  const solid = variant === "solid" || hovered || activeMenu !== null || mobileMenuOpen;
  const closeMenu = () => setActiveMenu(null);
  const closeMobileMenu = () => setMobileMenuTop(null);
  const closeAll = () => {
    closeMenu();
    closeMobileMenu();
  };
  const toggleMobileMenu = () =>
    setMobileMenuTop(mobileMenuOpen ? null : (barRef.current?.getBoundingClientRect().bottom ?? 0));

  // En táctil no existe "salir con el ratón": cerrar al tocar fuera del navbar.
  useEffect(() => {
    if (!activeMenu) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setActiveMenu(null);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [activeMenu]);

  // Con el menú móvil abierto: la página de detrás no hace scroll, y si la
  // ventana pasa a escritorio (donde el menú está oculto) se cierra, para no
  // dejar el scroll bloqueado sin motivo visible.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const desktop = window.matchMedia("(min-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileMenuTop(null);
    };
    desktop.addEventListener("change", handleChange);

    return () => {
      root.style.overflow = previousOverflow;
      desktop.removeEventListener("change", handleChange);
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      ref={navRef}
      aria-label="Principal"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        setHovered(false);
        setActiveMenu(null);
      }}
      onKeyDown={(e) => e.key === "Escape" && closeAll()}
      className={cn(
        "sticky top-0 z-50 transition-[background-color,color,box-shadow]",
        // Misma transición que el mega-menú: barra blanca e imágenes a la vez.
        NAV_TRANSITION,
        // El hero sube por debajo del navbar (ver prop `variant`).
        variant === "overlay" && "-mb-16",
        solid ? "bg-white text-black" : "bg-transparent text-white",
        // Línea inferior al hacer scroll, solo en "solid" (en "overlay" va
        // transparente). Sombra en vez de borde: no cambia el alto.
        variant === "solid" && scrolled && "shadow-[0_1px_0_rgba(0,0,0,0.08)]"
      )}
    >
      <div ref={barRef} className="flex items-center justify-between px-4 md:px-8 h-16">
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link href="/" onClick={closeAll} className="flex items-center shrink-0">
          <Image
            src="/images/logo_plasmalo.png"
            alt="Plásmalo"
            width={512}
            height={512}
            priority
            className={cn(
              "h-12 w-12 md:h-14 md:w-14 object-contain transition-[filter]",
              NAV_TRANSITION,
              // Solo hay logo oscuro: en modo transparente se pasa a blanco.
              !solid && "brightness-0 invert"
            )}
          />
        </Link>

        <DesktopNav
          entries={entries}
          activeMenu={activeMenu}
          onOpenMenu={setActiveMenu}
          onToggleMenu={(label) => setActiveMenu((current) => (current === label ? null : label))}
          onCloseMenu={closeMenu}
        />

        <button
          type="button"
          aria-label="Abrir carrito"
          onClick={() => {
            closeAll();
            openCart();
          }}
          className="flex items-center hover:opacity-70 transition-opacity"
        >
          <CartIcon size={20} />
          <span className="text-sm ml-0.5">{pricing.totalUnits}</span>
        </button>
      </div>

      {mobileMenuTop !== null && (
        <MobileMenu entries={entries} top={mobileMenuTop} onClose={closeMobileMenu} />
      )}
    </nav>
  );
}
