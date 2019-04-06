import { gql } from "apollo-boost";

export const AllLeaguesListQuery = gql`
  {
    leagues {
      id
      name
      description
      paymentInfo
      announcement
      allowMultipleTeams
      season {
        id
        fullName
        sport {
          name
          id
        }
      }
    }
  }
`;
