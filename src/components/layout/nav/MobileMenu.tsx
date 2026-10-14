"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { NavEntry, NavLinkEntry, NavMenuEntry } from "@/config/navigation";

interface MobileMenuProps {
  entries: NavEntry[];
  /** Posición (px desde arriba del viewport) del borde inferior de la barra. */
  top: number;
  onClose: () => void;
}

/**
 * Menú móvil por PANTALLAS (patrón de Nude Project), no acordeón:
 * - Principal: los enlaces directos en grande y los menús con →.
 * - Al tocar un menú, la pantalla se sustituye por la suya: título, miga
 *   "Menú / Sección", "← Menú" y sus entradas. No se ve nada más.
 *
 * Se abre DEBAJO de la barra del navbar (que sigue visible con la X), por
 * eso recibe `top`. Su estado vive aquí: al cerrar se desmonta y la próxima
 * vez empieza en la pantalla principal.
 */
export function MobileMenu({ entries, top, onClose }: MobileMenuProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  // Al volver a la principal, el foco regresa al menú del que se venía.
  const [returnFocusTo, setReturnFocusTo] = useState<string | null>(null);

  const section = entries.find(
    (entry): entry is NavMenuEntry => entry.type === "menu" && entry.label === activeSection
  );

  const goBack = () => {
    setReturnFocusTo(activeSection);
    setActiveSection(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
      // `top` depende de si el TopBar sigue visible: valor medido, no una clase fija.
      style={{ top }}
      className="fixed inset-x-0 bottom-0 z-50 overflow-y-auto bg-white text-black border-t border-black/10 md:hidden"
    >
      {section ? (
        <SectionScreen key={section.label} section={section} onBack={goBack} onClose={onClose} />
      ) : (
        <RootScreen
          entries={entries}
          focusSection={returnFocusTo}
          onOpenSection={setActiveSection}
          onClose={onClose}
        />
      )}
    </div>
  );
}

const screenClass = "px-6 pt-8 pb-12 animate-in fade-in duration-150 motion-reduce:animate-none";
const itemClass = "flex w-full items-center justify-between py-3 text-menu-item active:opacity-60";

interface RootScreenProps {
  entries: NavEntry[];
  focusSection: string | null;
  onOpenSection: (label: string) => void;
  onClose: () => void;
}

function RootScreen({ entries, focusSection, onOpenSection, onClose }: RootScreenProps) {
  const sectionButtons = useRef(new Map<string, HTMLButtonElement>());
  const links = entries.filter((entry): entry is NavLinkEntry => entry.type === "link");
  const menus = entries.filter((entry): entry is NavMenuEntry => entry.type === "menu");

  useEffect(() => {
    if (focusSection) sectionButtons.current.get(focusSection)?.focus();
  }, [focusSection]);

  return (
    <div className={screenClass}>
      <ul className="flex flex-col">
        {menus.map((menu) => (
          <li key={menu.label}>
            <button
              type="button"
              ref={(node) => {
                if (node) sectionButtons.current.set(menu.label, node);
              }}
              onClick={() => onOpenSection(menu.label)}
              className={itemClass}
            >
              {menu.label}
              <ArrowRight size={22} strokeWidth={1.25} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      <ul className="mt-10 flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} onClick={onClose} className="block text-menu-display active:opacity-60">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SectionScreenProps {
  section: NavMenuEntry;
  onBack: () => void;
  onClose: () => void;
}

function SectionScreen({ section, onBack, onClose }: SectionScreenProps) {
  const backButton = useRef<HTMLButtonElement>(null);

  // La pantalla se sustituye entera: el foco pasa a "← Menú" para que
  // teclado y lector de pantalla no se queden en un botón que ya no existe.
  useEffect(() => {
    backButton.current?.focus();
  }, []);

  return (
    <div className="animate-in fade-in duration-150 motion-reduce:animate-none">
      <div className="px-6 pt-8 pb-6 border-b border-black/10">
        <h2 className="text-menu-display">{section.label}</h2>
        <nav aria-label="Ruta del menú" className="mt-4 text-nav">
          <button type="button" onClick={onBack} className="text-black/40 active:opacity-60">
            Menú
          </button>
          <span className="mx-2 text-black/30" aria-hidden="true">
            /
          </span>
          <span aria-current="location">{section.label}</span>
        </nav>
      </div>

      <div className="px-6 pt-6 pb-12">
        <button
          ref={backButton}
          type="button"
          onClick={onBack}
          className="flex items-center gap-4 py-3 text-menu-item active:opacity-60"
        >
          <ArrowLeft size={22} strokeWidth={1.25} aria-hidden="true" />
          Menú
        </button>

        <ul className="mt-6 flex flex-col">
          <li>
            <Link href={section.viewAllHref} onClick={onClose} className={itemClass}>
              Descubrir todo
            </Link>
          </li>
          {section.items.map((item) => (
            <li key={item.label}>
              <Link href={item.href} onClick={onClose} className={itemClass}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
