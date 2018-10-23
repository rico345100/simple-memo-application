import { gql } from 'apollo-server-koa';

const typeDefs = gql`
    type Note {
        id: Int
        title: String
        text: String
        createdAt: String
        updatedAt: String
    }

    type Query {
        notes: [Note]
    }

    type Mutation {
        createNote(title:String, text: String): Boolean
        updateNote(id:Int, title:String, text:String): Boolean
        deleteNote(id:Int): Boolean
    }
`;

export default typeDefs;