export const getTopBarMessagesQuery = /* GraphQL */ `
  query getTopBarMessages {
    shop {
      metafield(namespace: "custom", key: "topbar_messages") {
        value
      }
    }
  }
`;
