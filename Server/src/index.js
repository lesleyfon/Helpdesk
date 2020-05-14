
const { GraphQLServer } = require("graphql-yoga");
const resolvers = require('./resolvers/resolver');


const server = new GraphQLServer({
  typeDefs: "./src/typeDefs/schema.graphql",
  resolvers,
  context: request =>({
    ...request
  })
});

server.start(() =>
  console.log(`GraphQL-yoga listening to http://localhost:4000`)
);
