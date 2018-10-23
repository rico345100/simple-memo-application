import { Connection, Repository } from 'typeorm';
import db from '../db';
import { Note } from '../entity/Note';
import { BadRequestError } from '../errors';

export default {
    Query: {
        notes: async function() {
            const connection:Connection = db.connection;
            
            const loadedNotes:Note[] = await connection.getRepository(Note).find();
            return loadedNotes;
        },
    },
    Mutation: {
        createNote: async function(root:any, { title, text }: { title:string, text: string}) {
            const newNote = new Note();
            newNote.title = title;
            newNote.text = text;

            const connection:Connection = db.connection;
            await connection.manager.save(newNote);
        },
        updateNote: async function(root:any, { id, title, text }: { id:number, title:string, text:string }) {
            if(!id) {
                throw new BadRequestError(`Invalid ID`);
            }

            const connection:Connection = db.connection;
            const noteRepository:Repository<Note> = connection.getRepository(Note);
            const note:Note|undefined = await noteRepository.findOne(id);

            if(typeof note === 'undefined') {
                throw new BadRequestError(`Can't find Note with ID ${id}`);
            }

            note.title = title;
            note.text = text;

            await noteRepository.save(note);
        },
        deleteNote: async function(root:any, { id }: { id:number }) {
            if(!id) {
                throw new BadRequestError(`Invalid ID`);
            }

            const connection:Connection = db.connection;
            
            const noteRepository:Repository<Note> = connection.getRepository(Note);
            const note:Note|undefined = await noteRepository.findOne(id);

            if(typeof note === 'undefined') {
                throw new BadRequestError(`Can't find Note with ID ${id}`);
            }

            await noteRepository.delete(note);
        }
    },
};