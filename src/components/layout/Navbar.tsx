"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartIcon } from "@/components/icons/CartIcon";
import { navPrendas, navMerchandising } from "@/config/site";
import { sectors } from "@/config/home";
import { sectorPages } from "@/config/sectores";
import { useCart } from "@/hooks/use-cart";

interface NavItem {
  label: string;
  href?: string;
}

const navSectores: NavItem[] = sectors.map((sector) => {
  const sectorPage = Object.values(sectorPages).find((page) => page.name === sector.name);
  return { label: sector.name, href: sectorPage ? `/sectores/${sectorPage.slug}` : undefined };
});

const toNavItems = (labels: string[]): NavItem[] => labels.map((label) => ({ label }));

interface NavDropdownProps {
  label: string;
  items: NavItem[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  /** Si se pasa, añade un "Ver todo [label]" al principio del panel, enlazando aquí. */
  viewAllHref?: string;
}

function NavDropdown({
  label,
  items,
  open,
  onToggle,
  onClose,
  viewAllHref,
}: NavDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={onToggle}
        className="flex items-center gap-1.5 text-[15px] font-medium text-black hover:opacity-70 transition-opacity"
        style={{ fontFamily: "var(--font-satoshi)" }}
      >
        {label}
        <ChevronDown
          size={16}
          className={cn("transition-transform duration-200", open ? "rotate-180" : "")}
        />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 z-50">
          <div className="w-56 rounded-xl border border-gray-100 bg-white shadow-lg py-2">
            {viewAllHref && (
              <Link
                href={viewAllHref}
                onClick={onClose}
                className="block px-4 py-2.5 text-[15px] font-medium text-black border-b border-gray-100 mb-1 hover:bg-gray-50 transition-colors"
                style={{ fontFamily: "var(--font-satoshi)" }}
              >
                Ver todo {label.toLowerCase()}
              </Link>
            )}
            {items.map((item) =>
              item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="block px-4 py-2.5 text-[15px] text-black hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: "var(--font-satoshi)" }}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href="#"
                  onClick={onClose}
                  className="block px-4 py-2.5 text-[15px] text-black hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: "var(--font-satoshi)" }}
                >
                  {item.label}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface MobileNavAccordionProps {
  label: string;
  items: NavItem[];
  open: boolean;
  onToggle: () => void;
  onItemClick: () => void;
  /** Si se pasa, añade un "Ver todo [label]" al principio del acordeón, enlazando aquí. */
  viewAllHref?: string;
}

function MobileNavAccordion({
  label,
  items,
  open,
  onToggle,
  onItemClick,
  viewAllHref,
}: MobileNavAccordionProps) {
  return (
    <div>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={onToggle}
        className="flex items-center justify-between w-full text-lg font-medium text-black py-3 border-b border-gray-100"
        style={{ fontFamily: "var(--font-satoshi)" }}
      >
        {label}
        <ChevronDown
          size={20}
          className={cn("transition-transform duration-200", open ? "rotate-180" : "")}
        />
      </button>

      {open && (
        <div className="flex flex-col">
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-base font-medium text-black py-3 pl-4 border-b border-gray-100"
              style={{ fontFamily: "var(--font-satoshi)" }}
              onClick={onItemClick}
            >
              Ver todo {label.toLowerCase()}
            </Link>
          )}
          {items.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="text-base text-black py-3 pl-4 border-b border-gray-100"
                style={{ fontFamily: "var(--font-satoshi)" }}
                onClick={onItemClick}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href="#"
                className="text-base text-black py-3 pl-4 border-b border-gray-100"
                style={{ fontFamily: "var(--font-satoshi)" }}
                onClick={onItemClick}
              >
                {item.label}
              </a>
            )
          )}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prendasOpen, setPrendasOpen] = useState(false);
  const [merchOpen, setMerchOpen] = useState(false);
  const [sectoresOpen, setSectoresOpen] = useState(false);
  const [mobilePrendasOpen, setMobilePrendasOpen] = useState(false);
  const [mobileMerchOpen, setMobileMerchOpen] = useState(false);
  const [mobileSectoresOpen, setMobileSectoresOpen] = useState(false);
  const { pricing, openCart } = useCart();

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

        {/* Desktop: category dropdowns */}
        <div className="hidden md:flex items-center gap-8">
          <NavDropdown
            label="Prendas"
            items={toNavItems(navPrendas)}
            open={prendasOpen}
            onToggle={() => setPrendasOpen((open) => !open)}
            onClose={() => setPrendasOpen(false)}
            viewAllHref="/prendas"
          />
          <NavDropdown
            label="Merchandising"
            items={toNavItems(navMerchandising)}
            open={merchOpen}
            onToggle={() => setMerchOpen((open) => !open)}
            onClose={() => setMerchOpen(false)}
          />
          <NavDropdown
            label="Sectores"
            items={navSectores}
            open={sectoresOpen}
            onToggle={() => setSectoresOpen((open) => !open)}
            onClose={() => setSectoresOpen(false)}
          />
          <Link
            href="/brand-session"
            className="text-[15px] font-medium text-black hover:opacity-70 transition-opacity"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            Brand Session
          </Link>
          <Link
            href="/club-plasmalo"
            className="text-[15px] font-medium text-black hover:opacity-70 transition-opacity"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            Club Plásmalo
          </Link>
        </div>

        {/* Right side: cart */}
        <div className="flex items-center gap-4 md:gap-6">
          <button
            aria-label="Abrir carrito"
            onClick={openCart}
            className="flex items-center text-black hover:opacity-70 transition-opacity"
          >
            <CartIcon size={20} />
            <span className="text-sm ml-0.5">{pricing.totalUnits}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden overflow-y-auto">
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
            <MobileNavAccordion
              label="Prendas"
              items={toNavItems(navPrendas)}
              open={mobilePrendasOpen}
              onToggle={() => setMobilePrendasOpen((open) => !open)}
              onItemClick={() => setMobileMenuOpen(false)}
              viewAllHref="/prendas"
            />
            <MobileNavAccordion
              label="Merchandising"
              items={toNavItems(navMerchandising)}
              open={mobileMerchOpen}
              onToggle={() => setMobileMerchOpen((open) => !open)}
              onItemClick={() => setMobileMenuOpen(false)}
            />
            <MobileNavAccordion
              label="Sectores"
              items={navSectores}
              open={mobileSectoresOpen}
              onToggle={() => setMobileSectoresOpen((open) => !open)}
              onItemClick={() => setMobileMenuOpen(false)}
            />
            <Link
              href="/brand-session"
              className="text-lg font-medium text-black py-3 border-b border-gray-100"
              style={{ fontFamily: "var(--font-satoshi)" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Brand Session
            </Link>
            <Link
              href="/club-plasmalo"
              className="text-lg font-medium text-black py-3 border-b border-gray-100"
              style={{ fontFamily: "var(--font-satoshi)" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Club Plásmalo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
