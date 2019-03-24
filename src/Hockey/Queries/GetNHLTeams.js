import { gql } from "apollo-boost";

export const GetTeamsAndPlayers = gql`
  query getleagues($leagueid: String) {
    leagues(id: $leagueid) {
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
        playerSeasons {
          team {
            fullName
            name
          }
          player {
            id
            fullName
          }
          positionType {
            id
            name
            shortName
          }
        }
      }
      playersPerTeam
      numberPerPositions {
        positionType {
          id
          name
        }
        count
      }
    }
  }
`;
