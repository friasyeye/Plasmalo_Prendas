/**
 * La Storefront API devuelve como máximo 250 variantes por petición. Un
 * producto con más (p. ej. 43 colores × 7 tallas = 301) se lee en páginas:
 * getProductQuery trae todo + la primera página; getProductVariantsPageQuery
 * trae solo las siguientes (ver getProduct en ../client.ts).
 */

const variantFields = /* GraphQL */ `
  id
  availableForSale
  selectedOptions {
    name
    value
  }
  image {
    url
    altText
    width
    height
  }
`;

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      handle
      title
      description
      descriptionHtml
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
      images(first: 250) {
        nodes {
          url
          altText
          width
          height
        }
      }
      options {
        name
        optionValues {
          name
        }
      }
      variants(first: 250) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ${variantFields}
        }
      }
      pricingTable: metafield(namespace: "custom", key: "tabla_de_precios") {
        reference {
          ... on Metaobject {
            field(key: "tramos") {
              references(first: 20) {
                nodes {
                  ... on Metaobject {
                    cantidadMinima: field(key: "cantidad_minima") {
                      value
                    }
                    precioSinIva: field(key: "precio_sin_iva") {
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getProductVariantsPageQuery = /* GraphQL */ `
  query getProductVariantsPage($handle: String!, $after: String!) {
    product(handle: $handle) {
      variants(first: 250, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ${variantFields}
        }
      }
    }
  }
`;

/** Solo las fotos de un producto (ligera: sin variantes ni tramos de precio). */
export const getProductPhotosQuery = /* GraphQL */ `
  query getProductPhotos($handle: String!) {
    product(handle: $handle) {
      featuredImage {
        url
        altText
        width
        height
      }
      images(first: 250) {
        nodes {
          url
          altText
          width
          height
        }
      }
    }
  }
`;
