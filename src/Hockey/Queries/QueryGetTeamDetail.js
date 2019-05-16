import { gql } from "apollo-boost";

export const QueryGetTeamDetail = gql`
  query getFantasty($teamId: String) {
    fantasyTeams(id: $teamId) {
      id
      name
      score
      todaysScore
      rank
      fantasyTeamPlayers {
        player {
          id
          fullName
        }
        playerSeason {
          team {
            name
          }
          positionType {
            shortName
          }
        }
        playerCalculatedScore {
          todaysScore
          score
          scoring {
            scoringType {
              id
              shortName
              name
            }
            total
            todaysScore
            todaysTotal
            score
          }
        }
      }
    }
  }
`;
