import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider, graphql, Query } from "react-apollo";
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://www.staplepuck.com:5050/"
});

const getLeaguesQuery = gql`
  {
    leagues {
      id
      name
      fantasyTeams {
        name
      }
    }
  }
`;

class MainLeagues extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;

    return (
      <div>
        <ApolloProvider client={client}>
          <Query query={getLeaguesQuery}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching Leauges</div>;
              if (error) return <div>Error Fetching Leauges</div>;

              const leaguesToRender = data.leagues;

              return (
                <ul>
                  {leaguesToRender.map(league => (
                    <li>{league.name}</li>
                  ))}
                </ul>
              );
            }}
          </Query>
        </ApolloProvider>
      </div>
    );
  }
}

export default MainLeagues;
