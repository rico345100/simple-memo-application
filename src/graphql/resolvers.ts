import { NullableConnection } from '../types';
import db from '../db';

async function getNotes() {
    const connection:NullableConnection = db.connection;

    return [];
}   

export default {
    Query: {
        notes: async function() {
            return []
        },
    },
    Mutation: {
        createNote: async function(root, { title, content }) {
            console.log(`Create Note: ${title} , ${content}`);
        }
    },
};