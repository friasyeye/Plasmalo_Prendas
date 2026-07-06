export const getFeaturedProductQuery = /* GraphQL */ `
  query getFeaturedProduct($handle: String!) {
    collection(handle: $handle) {
      products(first: 1) {
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
