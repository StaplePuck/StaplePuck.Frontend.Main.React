import { gql } from "apollo-boost";

export const GetProfileQuery = gql`
  {
    currentUser {
      id
      name
      email
      receiveEmails
    }
  }
`;
