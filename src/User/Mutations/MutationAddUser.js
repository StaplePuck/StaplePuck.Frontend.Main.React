import { gql } from "apollo-boost";

export const MutationAddUser = gql`
  mutation($user: UserInput!) {
    updateUser(user: $user) {
      id
      success
      message
    }
  }
`;
