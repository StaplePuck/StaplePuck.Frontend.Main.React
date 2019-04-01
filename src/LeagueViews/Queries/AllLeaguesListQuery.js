import { gql } from "apollo-boost";

export const AllLeaguesListQuery = gql`
  {
    leagues {
      id
      name
      description
      paymentInfo
      announcement
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
