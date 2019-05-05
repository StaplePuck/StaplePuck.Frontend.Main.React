import { gql } from "apollo-boost";

export const QueryUserProfile = gql`
  {
    currentUser {
      id
      name
      email
      receiveEmails
    }
  }
`;
