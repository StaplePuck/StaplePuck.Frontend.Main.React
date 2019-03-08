import { gql } from "apollo-boost";

const AllLeaguesList = gql`
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

export default AllLeaguesList;
