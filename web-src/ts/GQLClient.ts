import { ApolloClient } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

let m_Client:ApolloClient<any>;

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      }
};

export default {
    initialize() {
        const httpLink = createHttpLink({
            uri: 'http://localhost:3000/graphql'
        });

        m_Client = new ApolloClient({
            cache: new InMemoryCache(),
            link: httpLink,
            // @ts-ignore
            defaultOptions 
        });
    },
    get instance():ApolloClient<any> {
        return m_Client;
    }
};