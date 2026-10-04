"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { formatEUR } from "@/lib/format";
import { IVA_RATE } from "@/config/pricing";
import type { CartLine } from "@/types";
import type { CartLinePricing } from "@/lib/cart/cart";

/**
 * Drawer lateral del carrito. Se monta una vez en el root layout y se abre
 * desde el Navbar o al añadir a la cesta desde el configurador.
 *
 * Las líneas se pintan agrupadas por producto porque así funciona el precio:
 * el tramo lo deciden las unidades agregadas del producto (todas sus
 * variantes juntas), y el aviso de ahorro pertenece al grupo, no a la línea.
 *
 * El resumen del pedido vive fijo al pie del panel: siempre visible mientras
 * el carrito está abierto (manual de pricing, punto D).
 */

/** Color primero y Talla después, en el orden en que se leen en voz alta. */
function formatSelectedOptions(selectedOptions: Record<string, string>): string {
  const entries = Object.entries(selectedOptions);
  const color = entries.find(([name]) => /color|colour/i.test(name));
  const size = entries.find(([name]) => /talla|size/i.test(name));
  const rest = entries.filter(([name]) => name !== color?.[0] && name !== size?.[0]);

  return [color, size, ...rest]
    .filter((entry): entry is [string, string] => Boolean(entry))
    .map(([, value]) => value)
    .join(" — ");
}

function CartLineRow({
  line,
  pricing,
}: {
  line: CartLine;
  pricing: CartLinePricing;
}) {
  const { removeFromCart, updateQuantity } = useCart();
  const optionsLabel = formatSelectedOptions(line.selectedOptions);
  const zonesLabel = line.customizations.map((c) => c.zone).join(", ");

  return (
    <div className="flex gap-3.5 py-4 border-b border-gray-100">
      <div className="relative w-20 h-24 bg-gray-100 shrink-0 overflow-hidden">
        {line.image ? (
          <Image
            src={line.image.url}
            alt={line.image.altText ?? line.productTitle}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <span className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
            Sin foto
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-medium text-black truncate">
              {line.productTitle}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{optionsLabel}</p>
            {zonesLabel && (
              <p className="text-xs text-gray-500 mt-0.5">
                Personalización: {zonesLabel}
              </p>
            )}
            {line.designFileName && (
              <p className="text-xs text-gray-400 mt-0.5 truncate">
                Diseño: {line.designFileName}
              </p>
            )}
          </div>
          <p className="text-sm font-semibold text-black whitespace-nowrap">
            {formatEUR(pricing.lineTotal)}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2.5">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Reducir cantidad"
              disabled={line.quantity <= 1}
              onClick={() => updateQuantity(line.id, line.quantity - 1)}
              className="w-7 h-7 rounded-full border border-gray-300 text-black hover:border-black transition-colors duration-200 disabled:border-gray-200 disabled:text-gray-300 flex items-center justify-center text-sm"
            >
              −
            </button>
            <span className="min-w-8 text-center text-sm font-semibold text-black">
              {line.quantity}
            </span>
            <button
              type="button"
              aria-label="Aumentar cantidad"
              onClick={() => updateQuantity(line.id, line.quantity + 1)}
              className="w-7 h-7 rounded-full border border-gray-300 text-black hover:border-black transition-colors duration-200 flex items-center justify-center text-sm"
            >
              +
            </button>
            <span className="text-xs text-gray-400 ml-1.5 whitespace-nowrap">
              {formatEUR(pricing.unitTotal)}/ud + IVA
            </span>
          </div>
          <button
            type="button"
            onClick={() => removeFromCart(line.id)}
            className="text-xs text-gray-500 underline underline-offset-4 decoration-gray-400 hover:text-black hover:decoration-black transition-colors duration-200"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { lines, pricing, isOpen, closeCart } = useCart();
  const isEmpty = pricing.groups.length === 0;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  /**
   * "Tramitar pedido": manda al servidor solo REFERENCIAS (variante, zonas,
   * cantidades) — nunca precios, que se recalculan allí — y redirige al
   * checkout de Shopify (invoiceUrl del draft order). El carrito no se vacía:
   * si el cliente cancela el pago y vuelve, conserva su pedido.
   */
  async function handleCheckout() {
    setIsSubmitting(true);
    setCheckoutError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: lines.map((line) => ({
            productHandle: line.productHandle,
            variantId: line.variantId,
            quantity: line.quantity,
            zones: line.customizations.map((c) => c.zone),
            designFileName: line.designFileName,
            notes: line.notes,
          })),
        }),
      });

      const data: { invoiceUrl?: string; error?: string } =
        await response.json();

      if (!response.ok || !data.invoiceUrl) {
        setCheckoutError(
          data.error ?? "No se ha podido iniciar el pago. Inténtalo de nuevo."
        );
        setIsSubmitting(false);
        return;
      }

      // El botón queda deshabilitado mientras el navegador navega.
      window.location.assign(data.invoiceUrl);
    } catch {
      setCheckoutError("No se ha podido iniciar el pago. Inténtalo de nuevo.");
      setIsSubmitting(false);
    }
  }

  // Con el drawer abierto: Escape cierra y el fondo no hace scroll.
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeCart();
    }
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={
          "fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 " +
          (isOpen ? "opacity-100" : "opacity-0 pointer-events-none")
        }
      />

      <aside
        aria-label="Carrito"
        aria-hidden={!isOpen}
        className={
          "fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-white flex flex-col transition-transform duration-300 " +
          (isOpen ? "translate-x-0" : "translate-x-full")
        }
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-200 shrink-0">
          <h2 className="text-gray-900 text-[11px] font-medium uppercase tracking-[0.12em]">
            Tu cesta{!isEmpty && ` (${pricing.totalUnits} uds)`}
          </h2>
          <button
            aria-label="Cerrar carrito"
            onClick={closeCart}
            className="text-black hover:opacity-70 transition-opacity"
          >
            <X size={22} />
          </button>
        </div>

        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center px-5 text-center">
            <p className="text-black font-medium mb-1">Tu cesta está vacía</p>
            <p className="text-sm text-gray-500 mb-6">
              Configura una prenda y añádela a tu pedido.
            </p>
            <button
              type="button"
              onClick={closeCart}
              className="rounded-full border border-gray-300 hover:border-black transition-colors duration-200 px-6 py-2.5 text-sm font-medium text-black"
            >
              Seguir comprando
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              {pricing.groups.map((group) => (
                <div key={group.productHandle} className="py-2">
                  {group.lines.map((line) => (
                    <CartLineRow
                      key={line.id}
                      line={line}
                      pricing={pricing.linePricing[line.id]}
                    />
                  ))}
                  {group.savings && (
                    <p className="border-l-2 border-black pl-2.5 mt-3.5 mb-2 text-xs text-gray-600 leading-relaxed">
                      Añade {group.savings.unitsNeeded} unidad
                      {group.savings.unitsNeeded > 1 ? "es" : ""} más y ahorrarás{" "}
                      <span className="font-semibold text-black">
                        {formatEUR(group.savings.savings)}
                      </span>{" "}
                      en este pedido
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Resumen del pedido: siempre visible con el carrito abierto
                (manual de pricing, punto D). */}
            <div className="shrink-0 border-t border-gray-200 px-5 py-4 space-y-1.5 bg-white pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <div className="flex items-baseline justify-between text-sm">
                <p className="text-gray-500">Unidades</p>
                <p className="text-black font-medium">{pricing.totalUnits}</p>
              </div>
              <div className="flex items-baseline justify-between pt-2 border-t border-gray-100">
                <p className="text-gray-900 text-[11px] font-medium uppercase tracking-[0.12em]">
                  Total
                </p>
                <p className="font-display font-semibold text-black text-2xl leading-none tracking-tight">
                  {formatEUR(pricing.subtotal)}{" "}
                  <span className="text-gray-400 text-sm font-normal">
                    + IVA
                  </span>
                </p>
              </div>
              <p className="text-right text-gray-400 text-xs">
                {formatEUR(pricing.totalWithIva)} IVA (
                {Math.round(IVA_RATE * 100)}%) incluido
              </p>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleCheckout}
                className="w-full bg-black text-white rounded-full py-3.5 font-medium text-sm transition-colors duration-200 hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed mt-3"
              >
                {isSubmitting ? "Preparando el pago…" : "Tramitar pedido"}
              </button>
              {checkoutError && (
                <p role="alert" className="text-xs text-red-600 text-center pt-1">
                  {checkoutError}
                </p>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  );
}
