import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

// GraphQL Imports
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
// App Component
import App from "./App.jsx";
import { AUTH_TOKEN } from "./constants";

// Connecting to the api exposed by the graphql server

const httpLink = createHttpLink({
	uri: "http://localhost:4000",
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem(AUTH_TOKEN);

	return {
		headers: {
			...headers,
			Authorization: token ? `Bearer ${token}` : " ",
		},
	};
});

// Creating a graphql client instance by passing in the httpLink to connect to the server.
const client = new ApolloClient({
	link: authLink.concat(httpLink),
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
