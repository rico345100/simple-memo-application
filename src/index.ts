import "reflect-metadata";
import * as Koa from 'koa';
import * as logger from 'koa-log';
import * as bodyParser from 'koa-bodyparser';
import { ApolloServer, gql } from 'apollo-server-koa';
import router from './routes';
import typeDefs from './graphql/typedefs';
import resolvers from './graphql/resolvers';
import db from './db';

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});
const server = new Koa();
server.use(logger());
server.use(bodyParser());
server.use(router.routes());
server.use(router.allowedMethods());

apolloServer.applyMiddleware({ app: server });

server.listen({ port: 3000 }, () => console.log('Apollo Server with Koa is running on port 3000...\nGraphQL Path: ' + apolloServer.graphqlPath));

db.eventManager.on(db.Events.Connected, () => console.log('Successfully connected to Database.'));
db.eventManager.on(db.Events.Disconnected, () => console.log('Disconnected from DB.'));

function handleError(err?:Error | NodeJS.SignalsListener | void) {
    if(err) {
        console.error(err);

        if(err instanceof Error) {
            console.error(err.stack);    
        }
    }
    
    db.disconnect({ force: true });
    process.exit(1);
}

process.on('uncaughtException', handleError);
process.on('SIGINT', handleError);