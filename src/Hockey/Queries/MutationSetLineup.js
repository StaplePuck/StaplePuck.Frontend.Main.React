// {"id":35,
// "fantasyTeamPlayers":[
//     {"playerId":499},
//     {"playerId":283},
//     {"playerId":137},
//     {"playerId":5},
//     {"playerId":97},
//     {"playerId":395},
//     {"playerId":355},
//     {"playerId":54},
//     {"playerId":228},
//     {"playerId":187},
//     {"playerId":522},
//     {"playerId":254},
//     {"playerId":307},
//     {"playerId":441},
//     {"playerId":154},
//     {"playerId":366}]
// }

import { gql } from "apollo-boost";

export const MutationSetLineup = gql`
  mutation($teamdata: FantasyTeamUpdateInput!) {
    updateFantasyTeam(FantasyTeamUpdateInput: $teamdata) {
      id
      success
      message
    }
  }
`;
