import { gql } from "apollo-boost";

export const LeagueTeamListQuery = gql`
  {
    leagues {
      id
      name
      description
      season {
        id
        fullName
        sport {
          name
          id
        }
      }
    }
  }
`;
