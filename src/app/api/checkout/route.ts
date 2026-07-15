import { NextResponse } from "next/server";
import type { Product } from "@/types";
import { camisetaCustomizations } from "@/config/pricing";
import { getProduct } from "@/lib/shopify/client";
import { shopifyAdminFetch } from "@/lib/shopify/admin-client";
import { draftOrderCreateMutation } from "@/lib/shopify/queries/draft-order";
import type { ShopifyDraftOrderCreateResponse } from "@/lib/shopify/types";
import {
  parseCheckoutPayload,
  buildCartLinesFromPayload,
  buildDraftOrderInput,
} from "@/lib/checkout/checkout";

/**
 * POST /api/checkout — "Tramitar pedido" del carrito.
 *
 * Orquesta el flujo (la lógica vive en lib/checkout, que es pura):
 *   1. valida el payload del navegador (referencias y cantidades, sin precios)
 *   2. lee los productos FRESCOS de Shopify (tramos de precio actuales)
 *   3. recalcula los precios en el servidor con computeCartPricing
 *   4. crea el draft order con priceOverride por línea
 *   5. devuelve la invoiceUrl: el checkout nativo de Shopify donde se paga
 *
 * Los errores devueltos al navegador son mensajes mostrables; los detalles
 * técnicos se quedan en el log del servidor.
 */
export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "El pedido recibido no es válido." },
      { status: 400 }
    );
  }

  const payload = parseCheckoutPayload(body);
  if (!payload.ok) {
    return NextResponse.json({ error: payload.error }, { status: 400 });
  }

  // Un fetch por producto único, en paralelo, siempre sin caché.
  const handles = [...new Set(payload.value.map((line) => line.productHandle))];
  const productsByHandle = new Map<string, Product>();
  try {
    const products = await Promise.all(
      handles.map((handle) => getProduct(handle, { revalidate: 0 }))
    );
    for (const product of products) {
      if (product) productsByHandle.set(product.handle, product);
    }
  } catch (error) {
    console.error("[checkout] Error leyendo productos de Shopify:", error);
    return NextResponse.json(
      { error: "No se ha podido verificar el pedido. Inténtalo de nuevo." },
      { status: 502 }
    );
  }

  const lines = buildCartLinesFromPayload(
    payload.value,
    productsByHandle,
    camisetaCustomizations
  );
  if (!lines.ok) {
    return NextResponse.json({ error: lines.error }, { status: 400 });
  }

  try {
    const data = await shopifyAdminFetch<ShopifyDraftOrderCreateResponse>({
      query: draftOrderCreateMutation,
      variables: { input: buildDraftOrderInput(lines.value) },
    });

    const { draftOrder, userErrors } = data.draftOrderCreate;
    if (userErrors.length > 0 || !draftOrder?.invoiceUrl) {
      console.error("[checkout] draftOrderCreate userErrors:", userErrors);
      return NextResponse.json(
        { error: "No se ha podido crear el pedido. Inténtalo de nuevo." },
        { status: 502 }
      );
    }

    return NextResponse.json({ invoiceUrl: draftOrder.invoiceUrl });
  } catch (error) {
    console.error("[checkout] Error creando el draft order:", error);
    return NextResponse.json(
      { error: "No se ha podido crear el pedido. Inténtalo de nuevo." },
      { status: 502 }
    );
  }
}
