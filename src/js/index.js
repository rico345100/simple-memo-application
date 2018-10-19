/* @flow */
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql'
});

client.query({
    query: gql`
        {
            books {
                title
                author
            }
        }
    `
})
.then(result => console.log(result));