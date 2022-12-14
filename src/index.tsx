import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import reportWebVitals from './reportWebVitals';

import './styles.css';

var darkMode = JSON.parse(localStorage.getItem('dark-mode')!);
if (darkMode) {
  document.body.classList.toggle('dark');
}

const client = new ApolloClient({
  uri: 'https://fast-heron-34.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
