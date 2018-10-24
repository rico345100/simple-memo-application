import gql from 'graphql-tag';

export const createNote = gql`
    mutation($title:String,$text:String)
    {
        createNote(title:$title, text:$text)
    }
`

export const updateNote = gql`
    mutation($id:Int, $title:String,$text:String)
    {
        updateNote(id:$id, title:$title, text:$text)
    }
`;

export const deleteNote = gql`
    mutation($id:Int)
    {
        deleteNote(id:$id)
    }
`;
