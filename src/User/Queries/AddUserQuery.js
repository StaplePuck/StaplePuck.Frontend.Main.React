import { gql } from "apollo-boost";

export const AddUserQuery = gql`
  mutation($user: UserInput!) {
    updateUser(user: $user) {
      id
      success
      message
    }
  }
`;
