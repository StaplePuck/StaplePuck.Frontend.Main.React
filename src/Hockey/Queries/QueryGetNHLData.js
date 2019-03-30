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
          teamSeasons {
            team {
              locationName
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
