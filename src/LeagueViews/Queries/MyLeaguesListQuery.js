import { gql } from "apollo-boost";

//TODO: Get the query for a specific users leagues
export const MyLeaguesListQuery = gql`
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
