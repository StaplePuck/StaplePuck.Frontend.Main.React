import { gql } from "apollo-boost";

export const QueryCreateTeam = gql`
  mutation($fantasyTeam: FantasyTeamInput!) {
    createFantasyTeam(fantasyTeam: $fantasyTeam) {
      id
      message
      success
    }
  }
`;
