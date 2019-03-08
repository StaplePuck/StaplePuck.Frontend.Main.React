import { gql } from "apollo-boost";

export const AllLeaguesList = gql`
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
        }
      }
      fantasyTeams {
        id
      }
    }
  }
`;
