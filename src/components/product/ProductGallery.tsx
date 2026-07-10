"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/types";

interface ProductGalleryProps {
  images: ProductImage[];
  productTitle: string;
  /** Índice de la imagen activa; lo controla el padre (ProductView). */
  activeIndex: number;
  /** Se llama al pulsar una miniatura/dot o al deslizar el carrusel en mobile. */
  onSelect: (index: number) => void;
}

export function ProductGallery({
  images,
  productTitle,
  activeIndex,
  onSelect,
}: ProductGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Mientras hacemos scroll programático (al elegir color), ignoramos los
  // eventos de scroll para no pisar la selección con índices intermedios.
  const programmaticTarget = useRef<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const activeImage = images[activeIndex] ?? images[0];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || container.clientWidth === 0) return;
    const target = activeIndex * container.clientWidth;
    if (Math.abs(container.scrollLeft - target) > 1) {
      programmaticTarget.current = target;
      container.scrollTo({ left: target, behavior: "smooth" });
    }
  }, [activeIndex]);

  // Con el lightbox abierto: Escape cierra, flechas navegan, y se bloquea
  // el scroll de la página de fondo.
  useEffect(() => {
    if (!isLightboxOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowRight" && activeIndex < images.length - 1) {
        onSelect(activeIndex + 1);
      }
      if (e.key === "ArrowLeft" && activeIndex > 0) {
        onSelect(activeIndex - 1);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen, activeIndex, images.length, onSelect]);

  if (!activeImage) {
    return (
      <div className="w-full relative aspect-4/5 bg-gray-50 overflow-hidden" />
    );
  }

  function handleScroll() {
    const container = scrollRef.current;
    if (!container) return;
    if (programmaticTarget.current !== null) {
      if (Math.abs(container.scrollLeft - programmaticTarget.current) < 2) {
        programmaticTarget.current = null;
      }
      return;
    }
    const index = Math.round(container.scrollLeft / container.clientWidth);
    if (index !== activeIndex && index >= 0 && index < images.length) {
      onSelect(index);
    }
  }

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Mobile: carrusel deslizable con scroll-snap */}
      <div className="md:hidden relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onTouchStart={() => {
            programmaticTarget.current = null;
          }}
          className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, index) => (
            <div
              key={image.url}
              className="relative w-full aspect-4/5 bg-gray-50 overflow-hidden flex-shrink-0 snap-start"
            >
              <Image
                src={image.url}
                alt={image.altText ?? productTitle}
                fill
                sizes="100vw"
                className="object-cover object-top"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((image, index) => (
              <button
                key={image.url}
                type="button"
                aria-label={`Ver foto ${index + 1}`}
                onClick={() => onSelect(index)}
                className={
                  "w-1.5 h-1.5 rounded-full transition-all duration-200 " +
                  (index === activeIndex ? "bg-black w-4" : "bg-black/30")
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: imagen grande + miniaturas */}
      <button
        type="button"
        aria-label="Ver foto completa"
        onClick={() => setIsLightboxOpen(true)}
        className="hidden md:block relative w-full aspect-4/5 bg-gray-50 overflow-hidden cursor-lupa"
      >
        <Image
          src={activeImage.url}
          alt={activeImage.altText ?? productTitle}
          fill
          sizes="55vw"
          className="object-cover object-top"
          priority
        />
      </button>

      {images.length > 1 && (
        <div className="hidden md:flex gap-2.5 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              aria-label={`Ver foto ${index + 1}`}
              onClick={() => onSelect(index)}
              className={
                "flex-shrink-0 relative w-16 md:w-20 aspect-3/4 overflow-hidden transition-all duration-200 hover:scale-[1.03] " +
                (index === activeIndex
                  ? "opacity-100"
                  : "opacity-50 hover:opacity-100")
              }
            >
              <Image
                src={image.url}
                alt={image.altText ?? productTitle}
                fill
                sizes="96px"
                className="object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox: foto entera sin recortar (object-contain) a pantalla completa */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#F4F4F4] flex items-center justify-center cursor-lupa-out"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative w-[92vw] h-[88vh]">
            <Image
              src={activeImage.url}
              alt={activeImage.altText ?? productTitle}
              fill
              sizes="92vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center text-black cursor-pointer transition-transform duration-200 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {images.length > 1 && (
            <>
              {activeIndex > 0 && (
                <button
                  type="button"
                  aria-label="Foto anterior"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(activeIndex - 1);
                  }}
                  className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-black cursor-pointer transition-transform duration-200 hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              {activeIndex < images.length - 1 && (
                <button
                  type="button"
                  aria-label="Foto siguiente"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(activeIndex + 1);
                  }}
                  className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-black cursor-pointer transition-transform duration-200 hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-500 tracking-widest">
                {activeIndex + 1} / {images.length}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
