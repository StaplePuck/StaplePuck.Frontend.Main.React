import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider, graphql, Query } from "react-apollo";
import { gql } from "apollo-boost";
import ReactTable from "react-table";
import "react-table/react-table.css";

const client = new ApolloClient({
  uri: "http://www.staplepuck.com:5050/graphql"
});

const getLeaguesQuery = gql`
  {
    leagues {
      id
      name
      description
      season {
        id
        fullName
        sport {
          name
        }
      }
      fantasyTeams {
        id
      }
    }
  }
`;

const columns = [
  {
    Header: "League",
    accessor: "name",
    sortable: true,
    style: { textAlign: "center" },
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "#30303c",
      color: "white"
    }
  },
  {
    Header: "Sport",
    accessor: "season.sport.name",
    style: { textAlign: "center" },
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "#30303c",
      color: "white"
    }
  },
  {
    Header: "Season",
    accessor: "season.fullName",
    style: { textAlign: "center" },
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "#30303c",
      color: "white"
    }
  },
  {
    Header: "Description",
    accessor: "description",
    style: { textAlign: "center" },
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "#30303c",
      color: "white"
    }
  }
];

function ListofLeagues({ loading, error, leagues }) {
  if (loading) return <div>Fetching Leauges</div>;
  if (error) return <div>Error Fetching Leauges</div>;
  return (
    <div className="App">
      <ReactTable
        data={leagues}
        columns={columns}
        defaultPageSize={10}
        resizable={false}
        noDataText="Bloody hell.. No Leagues!"
        className="-striped -highlight"
      />
    </div>
  );
}

const LeagueData = graphql(getLeaguesQuery, {
  props: ({ data: { loading, leagues } }) => ({
    loading,
    leagues
  })
})(ListofLeagues);

class MainLeagues extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;

    return (
      <div>
        <ApolloProvider client={client}>
          <LeagueData />
        </ApolloProvider>
      </div>
    );
  }
}

export default MainLeagues;
