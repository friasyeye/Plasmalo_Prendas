/**
 * Mutación de la ADMIN API (no Storefront): crea un draft order con precios
 * custom por línea (priceOverride). El invoiceUrl que devuelve es el checkout
 * nativo de Shopify donde el cliente paga.
 */
export const draftOrderCreateMutation = /* GraphQL */ `
  mutation draftOrderCreate($input: DraftOrderInput!) {
    draftOrderCreate(input: $input) {
      draftOrder {
        id
        invoiceUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;
