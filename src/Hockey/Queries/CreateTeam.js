import { gql } from "apollo-boost";

export const CreateTeam = gql`
  mutation($fantasyTeam: FantasyTeamInput!) {
    createFantasyTeam(fantasyTeam: $fantasyTeam) {
      id
      message
      success
    }
  }
`;
