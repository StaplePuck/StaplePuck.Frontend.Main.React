import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { GLOBAL_CONFIG } from "../App_Config/GlobalVariables";
import { ApolloProvider, graphql } from "react-apollo";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { AllLeaguesListQuery } from "../LeagueViews/Queries/AllLeaguesListQuery";
import { AllLeagueColumns } from "./AllLeaguesColumns";

//Assests
import "../Assets/css/Leagues/AllLeagues.css";
import Logo from "../Assets/Images/logo-white-with-name.jpg";

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: GLOBAL_CONFIG.graphQLEndPoint
  }),
  cache: new InMemoryCache()
});

function ListofLeagues({ loading, error, leagues }) {
  if (loading) return <div className="allLeagues">Fetching Leauges...</div>;
  if (error) return <div className="allLeagues">Error Fetching Leauges</div>;
  return (
    <div className="allLeagues">
      <img className="mainLogo" src={Logo} alt="Logo" />
      <h4>Current Leagues</h4>
      <ReactTable
        data={leagues}
        columns={AllLeagueColumns}
        defaultPageSize={10}
        minRows={1}
        resizable={false}
        showPagination={false}
        noDataText="Bloody hell... No leagues!"
      />
    </div>
  );
}

const LeagueData = graphql(AllLeaguesListQuery, {
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
