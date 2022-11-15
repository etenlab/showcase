import { ApolloClient, InMemoryCache } from "@apollo/client";
const { createUploadLink } = require("apollo-upload-client");

export const client = new ApolloClient({
  link: createUploadLink({
    uri:
      process.env.REACT_APP_FILE_API_SERVER_URL ||
      "http://localhost:3002/graphql",
  }),
  cache: new InMemoryCache(),

  // Provide some optional constructor fields
  name: "react-web-client",
  version: "1.3",
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});
