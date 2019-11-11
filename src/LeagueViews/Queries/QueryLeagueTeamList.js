import { gql } from "apollo-boost";

export const QueryLeagueTeamsList = gql`
  query getleagues($leagueid: ID) {
    leagues(id: $leagueid) {
      id
      name
      isLocked
      paymentInfo
      announcement
      allowMultipleTeams
      fantasyTeams {
        name
        id
        rank
        score
        todaysScore
        gM {
          externalId
          name
        }
      }
    }
  }
`;
