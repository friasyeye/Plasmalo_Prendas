"use client";

import { useMemo, useState } from "react";
import type { PriceTier, ProductOption, ProductVariant } from "@/types";
import type { Customization } from "@/config/pricing";
import { IVA_RATE } from "@/config/pricing";
import {
  getUnitPriceForQuantity,
  calculateOrderTotal,
} from "@/lib/pricing/tiered-pricing";

interface ProductConfiguratorProps {
  priceTiers: PriceTier[];
  customizations: Customization[];
  options: ProductOption[];
  variants: ProductVariant[];
}

function formatEUR(amount: number): string {
  return amount.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });
}

const ACCEPTED_DESIGN_TYPES = [
  "image/png",
  "application/pdf",
  "application/postscript", // .ai / .eps
  "image/svg+xml",
];
const MAX_DESIGN_FILE_SIZE_MB = 20;

export function ProductConfigurator({
  priceTiers,
  customizations,
  options,
  variants,
}: ProductConfiguratorProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        options.map((option) => [option.name, option.values[0]])
      )
  );
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [designError, setDesignError] = useState<string | null>(null);

  const selectedVariant = variants.find((variant) =>
    Object.entries(selectedOptions).every(
      ([name, value]) => variant.selectedOptions[name] === value
    )
  );

  function selectOption(name: string, value: string) {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  }

  function handleDesignFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
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

  const nextTier = sortedTiers.find((t) => t.minQuantity > quantity);
  let savingsMessage: string | null = null;
  if (nextTier) {
    const unitsNeeded = nextTier.minQuantity - quantity;
    const totalAtNextTier = calculateOrderTotal({
      tiers: sortedTiers,
      quantity: nextTier.minQuantity,
      customizationUnitPrice,
    });
    const currentTotalAtThatQuantity =
      unitTotal * nextTier.minQuantity;
    const savings = currentTotalAtThatQuantity - totalAtNextTier;
    if (savings > 0) {
      savingsMessage = `Añade ${unitsNeeded} unidad${unitsNeeded > 1 ? "es" : ""} más y ahorrarás ${formatEUR(savings)} en este pedido.`;
    }
  }

  function toggleZone(zone: string) {
    setSelectedZones((prev) =>
      prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Opciones de Variante */}
      <div className="space-y-5">
        {options.map((option) => (
          <div key={option.name} className="bg-gray-50/60 backdrop-blur-sm rounded-2xl p-4 md:p-5 border border-gray-200/50">
            <h3
              style={{ fontFamily: "var(--font-general-sans)", fontWeight: 600 }}
              className="text-black text-sm md:text-base mb-4 block"
            >
              {option.name}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {option.values.map((value) => {
                const active = selectedOptions[option.name] === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => selectOption(option.name, value)}
                    className={
                      "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 " +
                      (active
                        ? "bg-black text-white border border-black shadow-sm"
                        : "bg-white/70 text-gray-700 border border-gray-300/50 hover:border-gray-400/70 hover:bg-white")
                    }
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selectedVariant && !selectedVariant.availableForSale && (
        <div className="bg-red-50/60 border border-red-200/50 rounded-2xl p-4 backdrop-blur-sm">
          <p className="text-sm text-red-700">
            Esta combinación no está disponible actualmente.
          </p>
        </div>
      )}

      {/* Personalización */}
      <div className="bg-gray-50/60 backdrop-blur-sm rounded-2xl p-4 md:p-5 border border-gray-200/50">
        <h3
          style={{ fontFamily: "var(--font-general-sans)", fontWeight: 600 }}
          className="text-black text-sm md:text-base mb-4 block"
        >
          Personalización
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {customizations.map((c) => {
            const active = selectedZones.includes(c.zone);
            return (
              <button
                key={c.zone}
                type="button"
                onClick={() => toggleZone(c.zone)}
                className={
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 " +
                  (active
                    ? "bg-black text-white border border-black shadow-sm"
                    : "bg-white/70 text-gray-700 border border-gray-300/50 hover:border-gray-400/70 hover:bg-white")
                }
              >
                {c.zone} · +{formatEUR(c.unitPrice)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cantidad */}
      <div className="bg-gray-50/60 backdrop-blur-sm rounded-2xl p-4 md:p-5 border border-gray-200/50">
        <h3
          style={{ fontFamily: "var(--font-general-sans)", fontWeight: 600 }}
          className="text-black text-sm md:text-base mb-4 block"
        >
          Cantidad
        </h3>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Reducir cantidad"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-11 h-11 rounded-full border border-gray-300/50 text-black hover:border-gray-400 hover:bg-white/50 transition-all duration-200 flex items-center justify-center"
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
            className="w-20 text-center border border-gray-300/50 rounded-full py-2.5 text-black font-medium bg-white/70 focus:outline-none focus:border-gray-400"
          />
          <button
            type="button"
            aria-label="Aumentar cantidad"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-11 h-11 rounded-full border border-gray-300/50 text-black hover:border-gray-400 hover:bg-white/50 transition-all duration-200 flex items-center justify-center"
          >
            +
          </button>
        </div>
        {savingsMessage && (
          <p className="text-sm text-green-700 mt-4 font-medium">{savingsMessage}</p>
        )}
      </div>

      {/* Precio Unitario */}
      <div className="bg-gray-50/60 backdrop-blur-sm rounded-2xl p-4 md:p-5 border border-gray-200/50">
        <p className="text-gray-600 text-sm mb-2">Precio unitario</p>
        <p
          style={{ fontFamily: "var(--font-general-sans)", fontWeight: 600 }}
          className="text-black text-3xl md:text-4xl leading-tight"
        >
          {formatEUR(unitTotal)} <span className="text-gray-400 text-xl">+ IVA</span>
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {formatEUR(unitTotal * (1 + IVA_RATE))} IVA incluido
        </p>
      </div>

      {/* Diseño a estampar */}
      <div className="bg-gray-50/60 backdrop-blur-sm rounded-2xl p-4 md:p-5 border border-gray-200/50">
        <h3
          style={{ fontFamily: "var(--font-general-sans)", fontWeight: 600 }}
          className="text-black text-sm md:text-base mb-3 block"
        >
          Sube tu diseño
        </h3>
        <p className="text-xs md:text-sm text-gray-600 mb-4">
          Recomendamos PNG con fondo transparente, PDF vectorial, AI, EPS o SVG.
        </p>
        <label className="flex items-center justify-center w-full px-4 py-4 border-2 border-dashed border-gray-300/50 rounded-xl hover:border-gray-400/70 hover:bg-white/50 transition-all duration-200 cursor-pointer bg-white/30">
          <div className="flex flex-col items-center justify-center">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
            <p className="text-sm md:text-base font-medium text-gray-700">
              {designFile ? designFile.name : "Selecciona un archivo"}
            </p>
            <p className="text-xs text-gray-500 mt-1">o arrastra aquí</p>
          </div>
          <input
            type="file"
            accept=".png,.pdf,.ai,.eps,.svg,image/png,application/pdf,application/postscript,image/svg+xml"
            onChange={handleDesignFileChange}
            className="hidden"
          />
        </label>
        {designFile && !designError && (
          <p className="text-sm text-green-700 mt-3 font-medium">
            ✓ Archivo listo: {designFile.name}
          </p>
        )}
        {designError && (
          <p className="text-sm text-red-600 mt-3 font-medium">✗ {designError}</p>
        )}
      </div>

      {/* Resumen de pedido */}
      <div className="bg-gray-950/5 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-gray-200/50 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Tu pedido:</span>
          <span className="font-medium text-gray-900">{quantity} camiseta{quantity > 1 ? "s" : ""}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Precio/unidad:</span>
          <span className="font-medium text-gray-900">{formatEUR(unitTotal)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">IVA:</span>
          <span className="font-medium text-gray-900">{Math.round(IVA_RATE * 100)}%</span>
        </div>
        <div className="border-t border-gray-200/50 pt-3 flex justify-between items-center">
          <span className="text-gray-700 font-medium">Total:</span>
          <span
            style={{ fontFamily: "var(--font-general-sans)", fontWeight: 600 }}
            className="text-black text-2xl md:text-3xl"
          >
            {formatEUR(orderTotalWithIva)}
          </span>
        </div>
      </div>

      <button
        type="button"
        disabled
        title="Disponible próximamente"
        className="bg-black text-white rounded-full py-3.5 md:py-4 font-semibold text-base md:text-lg transition-all duration-200 opacity-60 cursor-not-allowed hover:opacity-60"
      >
        Añadir al carrito
      </button>
    </div>
  );
}
