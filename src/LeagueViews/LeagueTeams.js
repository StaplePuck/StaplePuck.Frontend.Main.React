import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { GLOBAL_CONFIG } from "../App_Config/GlobalVariables";
import { ApolloProvider, graphql } from "react-apollo";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { LeagueTeamListQuery } from "./Queries/LeagueTeamListQuery";
import { LeagueTeamsColumns } from "./LeagueTeamsColumns";

//Assests
import "../Assets/css/Leagues/AllLeagues.css";
import Logo from "../Assets/Images/logo-white-with-name.jpg";

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: GLOBAL_CONFIG.graphQLEndPoint
  }),
  cache: new InMemoryCache()
});

function ListofTeams({ loading, error, teams }) {
  if (loading) return <div className="allLeagues">Fetching Leauges...</div>;
  if (error) return <div className="allLeagues">Error Fetching Leauges</div>;
  return (
    <div className="allLeagues">
      <ReactTable
        data={teams}
        columns={LeagueTeamsColumns}
        defaultPageSize={10}
        resizable={false}
        noDataText="Bloody hell... No teams!"
        className="-striped -highlight allLeaguesTable"
      />
    </div>
  );
}

const TeamsData = graphql(LeagueTeamListQuery, {
  props: ({ data: { loading, teams } }) => ({
    loading,
    teams
  })
})(ListofTeams);

class LeagueTeams extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    let id = this.props.match.params.id;
    return (
      <div className="allLeagues">
        <img className="mainLogo" src={Logo} alt="Logo" />
        <h2>League Name</h2>
        {isAuthenticated() && (
          <Button bsStyle="primary" className="btn-margin">
            <Link className="createTeamBtn" to={`/hockey/createteam/${id}`}>
              Create Team
            </Link>
          </Button>
        )}
        <ApolloProvider client={apolloClient}>
          <TeamsData />
        </ApolloProvider>
      </div>
    );
  }
}

export default LeagueTeams;
