import gql from 'graphql-tag';

export const fetchNotes = gql`
{
    notes {
        id
        title
        text
        createdAt
        updatedAt
    }
}
`;
