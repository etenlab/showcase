import { ApolloClient } from 'apollo-client';
import {
  ApolloClient as ApolloClient2,
  HttpLink as HttpLink2,
  InMemoryCache as InMemoryCache2,
} from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

// Instantiate required constructor fields
const cache = new InMemoryCache();
var link = new HttpLink({
  uri: 'http://localhost:8081/v1/graphql',
});

if (process.env.NODE_ENV === 'production') {
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

const AGGREGATION_API_URL = process.env.REACT_APP_AGGREGATION_API;

if (!AGGREGATION_API_URL) {
  throw new Error('AGGREGATION_API_URL is not defined');
}

export const aggregationClient = new ApolloClient2({
  cache: new InMemoryCache2(),

  link: new HttpLink2({
    uri: AGGREGATION_API_URL,
  }),

  uri: AGGREGATION_API_URL,

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
