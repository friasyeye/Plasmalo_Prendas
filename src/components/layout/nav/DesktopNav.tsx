"use client";

import { useRef } from "react";
import type { PointerEvent } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NavEntry } from "@/config/navigation";
import { MegaMenu } from "./MegaMenu";

/**
 * Mismo estilo para enlaces y menús. El hover baja la opacidad (no cambia a
 * un color fijo) porque el texto es blanco o negro según el estado del
 * navbar; el menú abierto se queda en ese mismo estado.
 */
const entryClass = "text-nav transition-opacity hover:opacity-60";

interface DesktopNavProps {
  entries: NavEntry[];
  activeMenu: string | null;
  onOpenMenu: (label: string) => void;
  onToggleMenu: (label: string) => void;
  onCloseMenu: () => void;
}

/**
 * Enlaces de escritorio. Los menús se abren:
 * - con ratón: al pasar por encima (hover);
 * - con táctil o teclado: al pulsar (toggle), porque no hay hover.
 *
 * Distinguir el puntero evita que en una tablet el "hover" emulado y el clic
 * del mismo toque abran y cierren el menú a la vez.
 */
export function DesktopNav({
  entries,
  activeMenu,
  onOpenMenu,
  onToggleMenu,
  onCloseMenu,
}: DesktopNavProps) {
  const lastPointerType = useRef("mouse");

  return (
    <ul className="hidden md:flex items-center gap-8">
      {entries.map((entry, index) => {
        if (entry.type === "link") {
          return (
            <li key={entry.label}>
              <Link
                href={entry.href}
                onPointerEnter={(e) => e.pointerType === "mouse" && onCloseMenu()}
                onClick={onCloseMenu}
                className={entryClass}
              >
                {entry.label}
              </Link>
            </li>
          );
        }

        const isOpen = activeMenu === entry.label;
        const panelId = `mega-menu-${index}`;
        const triggerProps = {
          "aria-expanded": isOpen,
          "aria-controls": panelId,
          onPointerEnter: (e: PointerEvent) =>
            e.pointerType === "mouse" && onOpenMenu(entry.label),
          onPointerDown: (e: PointerEvent) => {
            lastPointerType.current = e.pointerType;
          },
          className: cn(entryClass, isOpen && "opacity-60"),
        };

        return (
          // Sin `relative`: el panel se posiciona contra el <nav>, a todo el ancho.
          <li key={entry.label}>
            {entry.href ? (
              // Título con página propia (Prendas): el hover abre el menú y el
              // clic lleva a la página. En táctil (sin hover) el primer toque
              // abre el menú y el segundo navega; con teclado, Enter navega y
              // flecha abajo abre/cierra el menú.
              <Link
                href={entry.href}
                {...triggerProps}
                onClick={(e) => {
                  const isTouch = e.detail !== 0 && lastPointerType.current !== "mouse";
                  if (isTouch && !isOpen) {
                    e.preventDefault();
                    onOpenMenu(entry.label);
                    return;
                  }
                  onCloseMenu();
                }}
                onKeyDown={(e) => {
                  if (e.key !== "ArrowDown") return;
                  e.preventDefault();
                  onToggleMenu(entry.label);
                }}
              >
                {entry.label}
              </Link>
            ) : (
              <button
                type="button"
                {...triggerProps}
                onClick={(e) => {
                  // e.detail === 0 → activado con teclado (Enter/Espacio).
                  const isMouseClick = e.detail !== 0 && lastPointerType.current === "mouse";
                  if (isMouseClick) onOpenMenu(entry.label);
                  else onToggleMenu(entry.label);
                }}
              >
                {entry.label}
              </button>
            )}
            <MegaMenu id={panelId} entry={entry} open={isOpen} onNavigate={onCloseMenu} />
          </li>
        );
      })}
    </ul>
  );
}
