const Koa = require('koa');
const { ApolloServer, gql } = require('apollo-server-koa');

const books = [
    {
        title: 'Harry Porter',
        author: 'J.K. Rowling'
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton'
    }
];

const typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }
`;

const resolvers = {
    Query: {
        books: () => books
    }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const server = new Koa();

apolloServer.applyMiddleware({ app: server });

server.listen({ port: 3000 }, () => console.log('Apollo Server with Koa is running on port 3000...\nGraphQL Path: ' + apolloServer.graphqlPath));
