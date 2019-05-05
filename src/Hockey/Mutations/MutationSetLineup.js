import { gql } from "apollo-boost";

export const MutationSetLineup = gql`
  mutation($fantasyTeamUpdate: FantasyTeamUpdateInput!) {
    updateFantasyTeam(fantasyTeam: $fantasyTeamUpdate) {
      id
      success
      message
    }
  }
`;
