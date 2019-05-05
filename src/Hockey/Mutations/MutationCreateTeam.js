import { gql } from "apollo-boost";

export const MutationCreateTeam = gql`
  mutation($fantasyTeam: FantasyTeamInput!) {
    createFantasyTeam(fantasyTeam: $fantasyTeam) {
      id
      message
      success
    }
  }
`;
