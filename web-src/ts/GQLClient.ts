import { ApolloClient } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

let m_Client:ApolloClient<any>;

export default {
    initialize() {
        const httpLink = createHttpLink({
            uri: 'http://localhost:3000/graphql'
        });

        m_Client = new ApolloClient({
            cache: new InMemoryCache(),
            link: httpLink
        });
    },
    get instance():ApolloClient<any> {
        return m_Client;
    }
};