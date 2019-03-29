import { gql } from "apollo-boost";

export const QueryGetNHLData = gql`
  query getNHLTeams($teamId: String) {
    fantasyTeams(id: $teamId) {
      id
      name
      gM {
        externalId
        id
      }
      league {
        season {
          id
          fullName
          sport {
            name
            id
          }
          teamSeasons {
            team {
              fullName
              id
            }
            playerSeasons {
              player {
                id
                fullName
              }
              positionType {
                name
                shortName
              }
            }
          }
        }
      }
    }
  }
`;
