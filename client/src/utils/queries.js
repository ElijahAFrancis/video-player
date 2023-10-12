import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      name
      videos {
        _id
        uploadDate
        title
        path
      }
    }
  }
`;
