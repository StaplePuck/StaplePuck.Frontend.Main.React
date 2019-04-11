import { gql } from "apollo-boost";

export const QueryGetTeamDetail = gql`
  query getFantasty($teamId: String) {
    fantasyTeams(id: $teamId) {
      name
      fantasyTeamPlayers {
        player {
          id
          fullName
          number
          playerSeasons {
            team {
              fullName
            }
          }
        }
      }
    }
  }
`;
