import React, { Component } from "react";
import ReactTable from "react-table";
import { GLOBAL_CONFIG } from "../App_Config/GlobalVariables";
import "react-table/react-table.css";
import { ApolloProvider, graphql } from "react-apollo";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { MyLeaguesListQuery } from "./Queries/MyLeaguesListQuery";
import { MyLeagueColumns } from "./MyLeaguesColumns";

//Assests
import "../Assets/css/Leagues/MyLeagues.css";
import Logo from "../Assets/Images/logo-white-with-name.jpg";

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: GLOBAL_CONFIG.graphQLEndPoint
  }),
  cache: new InMemoryCache()
});

function ListofLeagues({ loading, error, leagues }) {
  if (loading) return <div className="myLeagues">Fetching Leagues...</div>;
  if (error) return <div className="myLeagues">Error Fetching Leagues</div>;
  return (
    <div className="myLeagues">
      <img className="mainLogo" src={Logo} alt="Logo" />
      <ReactTable
        data={leagues}
        columns={MyLeagueColumns}
        defaultPageSize={10}
        resizable={false}
        noDataText="Bloody hell... No leagues!"
        className="-striped -highlight allLeaguesTable"
      />
    </div>
  );
}

const LeagueData = graphql(MyLeaguesListQuery, {
  props: ({ data: { loading, leagues } }) => ({
    loading,
    leagues
  })
})(ListofLeagues);

class MainLeagues extends Component {
  render() {
    return (
      <div>
        <ApolloProvider client={apolloClient}>
        <LeagueData />
        </ApolloProvider>
      </div>
    );
  }
}

export default MainLeagues;
