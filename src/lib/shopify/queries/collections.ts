export const getFeaturedProductsQuery = /* GraphQL */ `
  query getFeaturedProducts($handle: String!) {
    collection(handle: $handle) {
      products(first: 4) {
        nodes {
          handle
          title
          images(first: 2) {
            nodes {
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
`;
