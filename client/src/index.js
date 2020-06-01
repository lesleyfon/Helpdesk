import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

// GraphQL Imports
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

// App Component
import App from "./App.jsx";

// Connecting to the api exposed by the graphql server

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

// Creating a graphql client instance by passing in the httpLink to connect to the server.
//
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Router>
    {/* We wrapped the whole app in the Apollo-provider to be able to exposed the client to all child components */}
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </Router>,
  document.getElementById("root")
);
