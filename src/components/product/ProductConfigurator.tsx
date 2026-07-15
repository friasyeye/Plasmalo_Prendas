"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { PriceTier, ProductOption, ProductVariant } from "@/types";
import type { Customization } from "@/config/pricing";
import { IVA_RATE } from "@/config/pricing";
import {
  getUnitPriceForQuantity,
  calculateOrderTotal,
  getNextTierSavings,
} from "@/lib/pricing/tiered-pricing";
import { formatEUR } from "@/lib/format";
import { useCart } from "@/hooks/use-cart";

interface ProductConfiguratorProps {
  /** Handle del producto: identidad de línea y agregación de tramos en el carrito. */
  productHandle: string;
  title: string;
  description: string;
  priceTiers: PriceTier[];
  customizations: Customization[];
  options: ProductOption[];
  variants: ProductVariant[];
  /** Opciones seleccionadas (Talla, Color…); las gestiona ProductView. */
  selectedOptions: Record<string, string>;
  onSelectOption: (name: string, value: string) => void;
}

const ACCEPTED_DESIGN_TYPES = [
  "image/png",
  "application/pdf",
  "application/postscript",
  "image/svg+xml",
];
const MAX_DESIGN_FILE_SIZE_MB = 20;

export function ProductConfigurator({
  productHandle,
  title,
  description,
  priceTiers,
  customizations,
  options,
  variants,
  selectedOptions,
  onSelectOption,
}: ProductConfiguratorProps) {
  const { addToCart, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedZones, setSelectedZones] = useState<string[]>(() => {
    if (customizations.length === 0) return [];
    const cheapest = customizations.reduce((min, c) =>
      c.unitPrice < min.unitPrice ? c : min
    );
    return [cheapest.zone];
  });
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [designError, setDesignError] = useState<string | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [notes, setNotes] = useState("");

  const MAX_NOTES_LENGTH = 300;

  const selectedVariant = variants.find((variant) =>
    Object.entries(selectedOptions).every(
      ([name, value]) => variant.selectedOptions[name] === value
    )
  );

  function findVariantImage(optionName: string, value: string) {
    const matches = variants.filter((variant) => variant.selectedOptions[optionName] === value);
    return matches.find((variant) => variant.image)?.image ?? matches[0]?.image;
  }

  function processDesignFile(file: File | undefined | null) {
    if (!file) {
      setDesignFile(null);
      setDesignError(null);
      return;
    }

    const isAcceptedType =
      ACCEPTED_DESIGN_TYPES.includes(file.type) ||
      /\.(png|pdf|ai|eps|svg)$/i.test(file.name);
    if (!isAcceptedType) {
      setDesignError("Formato no admitido. Usa PNG, PDF, AI, EPS o SVG.");
      setDesignFile(null);
      return;
    }
    if (file.size > MAX_DESIGN_FILE_SIZE_MB * 1024 * 1024) {
      setDesignError(`El archivo supera los ${MAX_DESIGN_FILE_SIZE_MB}MB.`);
      setDesignFile(null);
      return;
    }

    setDesignError(null);
    setDesignFile(file);
  }

  function handleDesignFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    processDesignFile(e.target.files?.[0]);
  }

  function handleDesignDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setIsDraggingFile(false);
    processDesignFile(e.dataTransfer.files?.[0]);
  }

  const sortedTiers = useMemo(
    () => [...priceTiers].sort((a, b) => a.minQuantity - b.minQuantity),
    [priceTiers]
  );

  const customizationUnitPrice = customizations
    .filter((c) => selectedZones.includes(c.zone))
    .reduce((sum, c) => sum + c.unitPrice, 0);

  const unitPrice = getUnitPriceForQuantity(sortedTiers, quantity);
  const unitTotal = unitPrice + customizationUnitPrice;
  const orderTotal = calculateOrderTotal({
    tiers: sortedTiers,
    quantity,
    customizationUnitPrice,
  });
  const orderTotalWithIva = orderTotal * (1 + IVA_RATE);

  const savingsInfo = getNextTierSavings(sortedTiers, quantity);

  const canAddToCart = Boolean(selectedVariant?.availableForSale);

  function handleAddToCart() {
    if (!selectedVariant?.availableForSale) return;
    addToCart({
      productHandle,
      productTitle: title,
      variantId: selectedVariant.id,
      selectedOptions: { ...selectedOptions },
      image: selectedVariant.image ?? variants.find((v) => v.image)?.image ?? null,
      quantity,
      customizations: customizations.filter((c) =>
        selectedZones.includes(c.zone)
      ),
      priceTiers: sortedTiers,
      designFileName: designFile?.name ?? null,
      notes: notes.trim(),
    });
    openCart();
  }

  function toggleZone(zone: string) {
    setSelectedZones((prev) => {
      if (prev.includes(zone)) {
        if (prev.length === 1) return prev;
        return prev.filter((z) => z !== zone);
      }
      return [...prev, zone];
    });
  }

  return (
    <div className="flex flex-col bg-[#F4F4F4] p-5 md:p-6">
      <div className="pb-5 mb-5 border-b border-gray-200">
        <h1 className="font-display font-semibold text-black text-xl md:text-2xl mb-1 leading-tight tracking-tight">
          {title}
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed max-w-md mb-3">
          {description}
        </p>
        <p className="font-display font-semibold text-black text-lg">
          {formatEUR(unitTotal)} <span className="text-gray-400 text-sm font-normal">+ IVA</span>
        </p>
        <p className="text-gray-400 text-xs">
          {formatEUR(unitTotal * (1 + IVA_RATE))} IVA incluido
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Personalización */}
        <div>
          <h3 className="text-gray-900 text-[11px] font-medium mb-1 uppercase tracking-[0.12em]">
            Personalización
          </h3>
          <p className="text-xs text-gray-400 mb-3">
            Selecciona al menos una personalización
          </p>
          <div className="flex flex-col">
            {customizations.map((c) => {
              const active = selectedZones.includes(c.zone);
              return (
                <button
                  key={c.zone}
                  type="button"
                  onClick={() => toggleZone(c.zone)}
                  className={
                    "flex items-center justify-between gap-3 py-2.5 border-b text-sm transition-colors duration-200 " +
                    (active
                      ? "border-black"
                      : "border-gray-200 hover:border-gray-400")
                  }
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <span
                      className={
                        "relative shrink-0 w-11 h-11 overflow-hidden bg-white border transition-colors duration-200 " +
                        (active ? "border-black" : "border-gray-200")
                      }
                    >
                      <Image
                        src={c.image}
                        alt={c.zone}
                        fill
                        sizes="44px"
                        className="object-contain"
                      />
                    </span>
                    <span
                      className={
                        "truncate transition-colors duration-200 " +
                        (active
                          ? "text-black font-semibold"
                          : "text-gray-500 font-medium hover:text-black")
                      }
                    >
                      {c.zone}
                    </span>
                  </span>
                  <span className={"shrink-0 " + (active ? "text-black" : "text-gray-400")}>
                    +{formatEUR(c.unitPrice)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Sube tu diseño */}
        <div>
          <h3 className="text-gray-900 text-[11px] font-medium mb-1 uppercase tracking-[0.12em]">
            Sube tu diseño
          </h3>
          <p className="text-xs text-gray-400 mb-3">
            PNG, PDF, AI, EPS o SVG · máx. {MAX_DESIGN_FILE_SIZE_MB}MB
          </p>
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingFile(true);
            }}
            onDragLeave={() => setIsDraggingFile(false)}
            onDrop={handleDesignDrop}
            className={
              "flex items-center justify-center w-full px-3 py-6 border-2 rounded-none transition-[border-color,transform] duration-200 cursor-pointer " +
              (isDraggingFile
                ? "border-dashed border-black scale-[1.01]"
                : designFile
                  ? "border-solid border-black"
                  : "border-dashed border-gray-300 hover:border-gray-400")
            }
          >
            <div className="flex flex-col items-center justify-center text-center">
              {designFile ? (
                <svg className="w-6 h-6 text-black mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 12v9m0-9l-3 3m3-3l3 3" />
                </svg>
              )}
              <p className={"text-sm font-medium " + (designFile ? "text-black" : "text-gray-700")}>
                {designFile ? designFile.name : "Arrastra tu archivo aquí"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {designFile ? "Haz clic para cambiar el archivo" : "o haz clic para seleccionar"}
              </p>
            </div>
            <input
              type="file"
              accept=".png,.pdf,.ai,.eps,.svg,image/png,application/pdf,application/postscript,image/svg+xml"
              onChange={handleDesignFileChange}
              className="hidden"
            />
          </label>
          {designError && (
            <p className="text-xs text-red-600 mt-2 font-medium">✗ {designError}</p>
          )}
        </div>

        {/* 3. Color · 4. Talla (orden de options según Shopify) */}
        {options.map((option) => {
          const isSizeOption = /talla|size/i.test(option.name);
          const isColorOption = /color|colour/i.test(option.name);

          if (isColorOption) {
            return (
              <div key={option.name}>
                <h3 className="text-black text-sm font-medium mb-3">
                  {selectedOptions[option.name] ?? option.name}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {option.values.map((value) => {
                    const active = selectedOptions[option.name] === value;
                    const swatchImage = findVariantImage(option.name, value);
                    return (
                      <button
                        key={value}
                        type="button"
                        aria-label={value}
                        onClick={() => onSelectOption(option.name, value)}
                        className={
                          "pb-1.5 border-b transition-colors duration-200 " +
                          (active
                            ? "border-black"
                            : "border-transparent hover:border-gray-300")
                        }
                      >
                        <span className="relative block w-14 h-14 overflow-hidden">
                          {swatchImage ? (
                            <Image
                              src={swatchImage.url}
                              alt={value}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          ) : (
                            <span className="w-full h-full flex items-center justify-center bg-gray-100 text-[10px] text-gray-500">
                              {value.slice(0, 2)}
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          }

          return (
            <div key={option.name}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-900 text-[11px] font-medium uppercase tracking-[0.12em]">
                  {option.name}
                </h3>
                {isSizeOption && (
                  <button
                    type="button"
                    className="text-xs text-gray-500 underline underline-offset-4 decoration-gray-400 hover:text-black hover:decoration-black transition-colors duration-200"
                  >
                    Guía de tallas
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const active = selectedOptions[option.name] === value;

                  if (isSizeOption) {
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => onSelectOption(option.name, value)}
                        className={
                          "pb-1 border-b transition-colors duration-200 " +
                          (active
                            ? "border-black"
                            : "border-transparent hover:border-gray-300")
                        }
                      >
                        <span
                          className={
                            "w-10 h-10 text-sm flex items-center justify-center transition-colors duration-200 " +
                            (active
                              ? "text-black font-semibold"
                              : "text-gray-500 font-medium hover:text-black")
                          }
                        >
                          {value}
                        </span>
                      </button>
                    );
                  }

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => onSelectOption(option.name, value)}
                      className={
                        "pb-1 border-b transition-colors duration-200 " +
                        (active
                          ? "border-black"
                          : "border-transparent hover:border-gray-300")
                      }
                    >
                      <span
                        className={
                          "h-10 px-1 text-sm flex items-center justify-center transition-colors duration-200 " +
                          (active
                            ? "text-black font-semibold"
                            : "text-gray-500 font-medium hover:text-black")
                        }
                      >
                        {value}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {selectedVariant && !selectedVariant.availableForSale && (
          <div className="bg-red-50 border border-red-200 rounded-none p-3">
            <p className="text-xs text-red-700">
              Esta combinación no está disponible actualmente.
            </p>
          </div>
        )}

        {/* 5. Observaciones */}
        <div>
          <h3 className="text-gray-900 text-[11px] font-medium mb-1 uppercase tracking-[0.12em]">
            Observaciones{" "}
            <span className="normal-case text-gray-400 font-normal">(opcional)</span>
          </h3>
          <p className="text-xs text-gray-400 mb-3">
            ¿Algo que debamos tener en cuenta con tu pedido?
          </p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value.slice(0, MAX_NOTES_LENGTH))}
            placeholder="Ej: el logo en un tono más oscuro, tallas por unidad…"
            rows={3}
            className="w-full px-3 py-2.5 rounded-none border border-gray-300 bg-white text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors duration-200 resize-none"
          />
          <p className="text-[11px] text-gray-400 mt-1 text-right">
            {notes.length}/{MAX_NOTES_LENGTH}
          </p>
        </div>

        <div>
          <h3 className="text-gray-900 text-[11px] font-medium mb-3 uppercase tracking-[0.12em]">
            Cantidad
          </h3>

          {sortedTiers.length > 1 && (
            <div className="flex flex-wrap justify-between sm:justify-start gap-1 sm:gap-2 mb-3">
              {sortedTiers.map((tier) => {
                const active = tier.minQuantity === quantity;
                return (
                  <button
                    key={tier.minQuantity}
                    type="button"
                    onClick={() => setQuantity(tier.minQuantity)}
                    className={
                      "pb-1 border-b transition-colors duration-200 " +
                      (active
                        ? "border-black"
                        : "border-transparent hover:border-gray-300")
                    }
                  >
                    <span
                      className={
                        "min-w-8 sm:min-w-10 h-10 px-0.5 sm:px-1 text-sm flex items-center justify-center transition-colors duration-200 " +
                        (active
                          ? "text-black font-semibold"
                          : "text-gray-500 font-medium hover:text-black")
                      }
                    >
                      {tier.minQuantity}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Reducir cantidad"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-full border border-gray-300 text-black hover:border-black transition-[border-color,transform] duration-200 active:scale-[0.97] flex items-center justify-center font-semibold text-sm"
            >
              −
            </button>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, Number(e.target.value) || 1))
              }
              className="w-16 text-center border border-gray-300 rounded-full py-2 text-black font-semibold bg-transparent focus:outline-none focus:border-black text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              type="button"
              aria-label="Aumentar cantidad"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-9 h-9 rounded-full border border-gray-300 text-black hover:border-black transition-[border-color,transform] duration-200 active:scale-[0.97] flex items-center justify-center font-semibold text-sm"
            >
              +
            </button>
          </div>
          {savingsInfo && (
            <p className="border-l-2 border-black pl-2.5 mt-3.5 text-xs text-gray-600 leading-relaxed transition-opacity duration-200">
              Añade {savingsInfo.unitsNeeded} unidad
              {savingsInfo.unitsNeeded > 1 ? "es" : ""} más y ahorrarás{" "}
              <span className="font-semibold text-black">
                {formatEUR(savingsInfo.savings)}
              </span>{" "}
              en este pedido
            </p>
          )}
        </div>

        {/* Resumen de pedido: siempre visible mientras se configura (manual de
            pricing, punto D). En desktop, sticky al fondo del viewport hasta
            llegar a su posición natural. */}
        <div className="md:sticky md:bottom-0 md:bg-[#F4F4F4] md:pb-5">
        <div className="pt-5 mt-1 border-t border-gray-200 space-y-1.5">
          <h3 className="text-gray-900 text-[11px] font-medium mb-2 uppercase tracking-[0.12em]">
            Tu pedido
          </h3>

          <div className="flex items-baseline justify-between text-sm">
            <p className="text-gray-500">
              Cantidad
            </p>
            <p className="text-black font-medium">
              {quantity} ud{quantity > 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex items-baseline justify-between text-sm">
            <p className="text-gray-500">
              Precio unidad
              {selectedZones.length > 0 && (
                <span className="text-gray-400">
                  {" "}
                  ({formatEUR(unitPrice)} prenda + {formatEUR(customizationUnitPrice)} personalización)
                </span>
              )}
            </p>
            <p className="text-black font-medium">{formatEUR(unitTotal)}</p>
          </div>

          <div className="flex items-baseline justify-between pt-2 mt-1 border-t border-gray-200">
            <p className="text-gray-900 text-[11px] font-medium uppercase tracking-[0.12em]">
              Total
            </p>
            <p className="font-display font-semibold text-black text-2xl leading-none tracking-tight">
              {formatEUR(orderTotal)}{" "}
              <span className="text-gray-400 text-sm font-normal">+ IVA</span>
            </p>
          </div>
          <p className="text-right text-gray-400 text-xs">
            {formatEUR(orderTotalWithIva)} IVA ({Math.round(IVA_RATE * 100)}%) incluido
          </p>
        </div>

        <button
          type="button"
          disabled={!canAddToCart}
          onClick={handleAddToCart}
          className="hidden md:block w-full bg-black text-white rounded-full py-3.5 font-medium text-sm transition-colors duration-200 hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed mt-4"
        >
          Añadir a la cesta
        </button>
        </div>
      </div>

      {/* CTA fijo en mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-gray-500 truncate">
            {quantity} ud{quantity > 1 ? "s" : ""} ·{" "}
            {formatEUR(unitTotal * (1 + IVA_RATE))}/ud · IVA incluido
          </p>
          <p className="font-display font-semibold text-black text-lg leading-tight truncate">
            {formatEUR(orderTotalWithIva)}
          </p>
        </div>
        <button
          type="button"
          disabled={!canAddToCart}
          onClick={handleAddToCart}
          className="bg-black text-white rounded-full py-3 px-6 font-medium text-sm transition-colors duration-200 hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Añadir a la cesta
        </button>
      </div>
    </div>
  );
}
