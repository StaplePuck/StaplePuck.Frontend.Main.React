import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider, graphql } from "react-apollo";
import { gql } from "apollo-boost";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../Assets/css/AllLeagues.css";
import Logo from "../Assets/Images/logo-white-with-name.jpg";

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
    style: { textAlign: "center", textDecoration: "underline" },
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "gold",
      color: "#30303c"
    }
  },
  {
    Header: "Sport",
    accessor: "season.sport.name",
    style: { textAlign: "center" },
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "gold",
      color: "#30303c"
    }
  },
  {
    Header: "Season",
    accessor: "season.fullName",
    sortable: false,
    style: { textAlign: "center" },
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "gold",
      color: "#30303c"
    }
  },
  {
    Header: "Description",
    accessor: "description",
    sortable: false,
    style: { textAlign: "center" },
    headerStyle: {
      fontWeight: "bold",
      backgroundColor: "gold",
      color: "#30303c"
    }
  }
];

function ListofLeagues({ loading, error, leagues }) {
  if (loading) return <div>Fetching Leauges</div>;
  if (error) return <div>Error Fetching Leauges</div>;
  return (
    <div className="allLeagues">
      <img className="mainLogo" src={Logo} alt="Logo" />
      <ReactTable
        data={leagues}
        columns={columns}
        defaultPageSize={10}
        resizable={false}
        noDataText="Bloody hell... No leagues!"
        className="-striped -highlight allLeaguesTable"
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
