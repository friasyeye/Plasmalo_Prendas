export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      handle
      title
      description
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
      variants(first: 50) {
        nodes {
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
          gallery: metafield(namespace: "custom", key: "galeria") {
            references(first: 10) {
              nodes {
                ... on MediaImage {
                  image {
                    url
                    altText
                    width
                    height
                  }
                }
              }
            }
          }
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
