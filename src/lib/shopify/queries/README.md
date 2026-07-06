# Queries y mutations GraphQL de la Storefront API

Aquí vive un archivo por área: `products.ts`, `collections.ts`, `cart.ts`…
Cada archivo exporta sus documentos GraphQL como template strings:

```ts
export const getProductByHandleQuery = /* GraphQL */ `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      handle
      title
      ...
    }
  }
`;
```

Los consume `shopifyFetch` (en `../client.ts`), y los tipos de la respuesta
se declaran en `../types.ts` reflejando exactamente los campos pedidos.
