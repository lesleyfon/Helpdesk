const { GraphQLServer } = require("graphql-yoga");
const resolvers = require("./resolvers/resolver");

// Instantiate a graphQL Server
//Passing in the path to the type def and resolvers
const server = new GraphQLServer({
  typeDefs: "./src/typeDefs/schema.graphql",
  resolvers,
  // We return the request object from the contest just to be able to get the graphql request information for all request made
  // The main reason for this is to be able to attach HTTP request in our graphql request and maybe grab information from the request object that maybe useful to use in the backend
  context: (request) => ({
    ...request,
  }),
});

server.start(() =>
  console.log(`GraphQL-yoga listening to http://localhost:4000`)
);
