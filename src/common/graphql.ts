import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

// Instantiate required constructor fields
const cache = new InMemoryCache();
var link = new HttpLink({
  uri: 'http://localhost:8081/v1/graphql',
});

if(process.env.NODE_ENV === "production"){
  link = new HttpLink({
    uri: 'https://fast-heron-34.hasura.app/v1/graphql',
  });
}

export const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  link: link,
  // Provide some optional constructor fields
  name: 'react-web-client',
  version: '1.3',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});