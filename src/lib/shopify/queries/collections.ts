/**
 * Campos de un producto para una tarjeta (fila de la Home y listados). Ligero
 * a propósito: ni variantes ni galería, solo lo que pinta la tarjeta y lo que
 * necesitan los filtros (tipo, etiquetas, colores) y la URL (colecciones:
 * de ellas sale la categoría del producto).
 */
const productSummaryFields = /* GraphQL */ `
  handle
  title
  productType
  tags
  collections(first: 50) {
    nodes {
      handle
    }
  }
  featuredImage {
    url
    altText
    width
    height
  }
  options {
    name
    optionValues {
      name
    }
  }
`;

export const getFeaturedProductsQuery = /* GraphQL */ `
  query getFeaturedProducts($handle: String!) {
    collection(handle: $handle) {
      products(first: 12) {
        nodes {
          ${productSummaryFields}
        }
      }
    }
  }
`;

/**
 * ¿Tiene productos cada colección? Una sola petición para N colecciones
 * (alias c0, c1… con variables $h0, $h1…), pidiendo solo 1 id de cada una.
 */
export function getCollectionsHaveProductsQuery(count: number): string {
  const indexes = Array.from({ length: count }, (_, i) => i);
  const variables = indexes.map((i) => `$h${i}: String!`).join(", ");
  const fields = indexes
    .map((i) => `c${i}: collection(handle: $h${i}) { products(first: 1) { nodes { id } } }`)
    .join("\n");
  return /* GraphQL */ `query getCollectionsHaveProducts(${variables}) {\n${fields}\n}`;
}

/**
 * Una página (máx. 250, el límite de Shopify) de los productos de una
 * colección, en el orden de la colección (el que fija el admin). Con
 * `after` se piden las siguientes páginas.
 */
export const getCollectionQuery = /* GraphQL */ `
  query getCollection($handle: String!, $after: String) {
    collection(handle: $handle) {
      handle
      title
      description
      seo {
        title
        description
      }
      products(first: 250, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ${productSummaryFields}
        }
      }
    }
  }
`;
