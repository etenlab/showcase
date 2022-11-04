import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
// import reportWebVitals from './reportWebVitals';

import "./styles.css";

var darkMode = localStorage.getItem("dark-mode");
if (darkMode) {
  document.body.classList.toggle("dark");
}
const client = new ApolloClient({
  uri: "https://fast-heron-34.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
});

console.log(process.env);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

const eventLogger = (event: unknown, error: unknown) => {
  console.log("onKeycloakEvent", event, error);
};

const tokenLogger = (tokens: unknown) => {
  console.log("onKeycloakTokens", tokens);
};

root.render(
  <ReactKeycloakProvider
    initOptions={{ checkLoginIframe: false }}
    authClient={keycloak}
    onEvent={eventLogger}
    onTokens={tokenLogger}
  >
    <StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </StrictMode>
  </ReactKeycloakProvider>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
