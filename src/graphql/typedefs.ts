import { gql } from 'apollo-server-koa';

const typeDefs = gql`
    type Note {
        title: String
        content: String
        createdAt: String
        updatedAt: String
    }

    type Query {
        notes: [Note]
    }

    type Mutation {
        createNote(title:String, content: String): Boolean
    }
`;

export default typeDefs;