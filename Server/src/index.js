const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
    type Query {
        welcome: String!
    }

`;

const resolvers = {
    Query: {
        welcome: ()=> "Welcome to Help desk queue"
    }
};


const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(()=> console.log(`GraphQL-yoga listening to http://localhost:4000`));