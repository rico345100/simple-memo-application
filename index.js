/* @flow */
const Koa = require('koa');
const logger = require('koa-log');
const bodyParser = require('koa-bodyparser');
const { ApolloServer, gql } = require('apollo-server-koa');
const router = require('./routes');

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
server.use(logger());
server.use(bodyParser());
server.use(router.routes());
server.use(router.allowedMethods());

apolloServer.applyMiddleware({ app: server });

server.listen({ port: 3000 }, () => console.log('Apollo Server with Koa is running on port 3000...\nGraphQL Path: ' + apolloServer.graphqlPath));
