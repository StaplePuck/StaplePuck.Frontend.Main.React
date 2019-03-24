import { gql } from "apollo-boost";

export const QueryGetLeagueTeams = gql`
  query getleagues($leagueid: String) {
    leagues(id: $leagueid) {
      id
      name
      fantasyTeams {
        name
        id
      }
    }
  }
`;
