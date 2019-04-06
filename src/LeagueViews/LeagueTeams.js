import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { GLOBAL_CONFIG } from "../App_Config/GlobalVariables";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { QueryGetLeagueTeams } from "./Queries/LeagueTeamListQuery";
//import { LeagueTeamsColumns } from "./LeagueTeamsColumns";

//Assests
import "../Assets/css/Leagues/LeagueTables.css";
import Logo from "../Assets/Images/logo-white-with-name.jpg";

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: GLOBAL_CONFIG.graphQLEndPoint
  }),
  cache: new InMemoryCache()
});

class LeagueTeams extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    let leagueid = {
      leagueid: this.props.match.params.id
    };

    // Had to move the columns to the class in order to access the auth token out of state
    const LeagueTeamsColumns = [
      {
        Header: "Team",
        accessor: "name",
        id: "id",
        Cell: props => (
          this.props.auth.tokenSub === props.original.gM.externalId ? (
            <span>
              <div className="rt-mobileHeader">
                Team:
              </div>
              <Link className="grid-link-style" to={`../hockey/setlineup/${props.original.id}`}>
                {props.value}
              </Link>
            </span>
          ) :
            <span>
              <div className="rt-mobileHeader">
                Team:
              </div>
              {props.value}
            </span>
        ),
        style: { textAlign: "left" },
        headerStyle: {
          color: "#000",
          background: "rgb(255,214,94)",
          background:
            "-moz-linear-gradient(top, rgba(255,214,94,1) 0%, rgba(254,191,4,1) 100%)",
          background:
            "-webkit-linear-gradient(top, rgba(255,214,94,1) 0%,rgba(254,191,4,1) 100%)",
          background:
            "linear-gradient(to bottom, rgba(255,214,94,1) 0%,rgba(254,191,4,1) 100%)"
        }
      },
      {
        Header: "Points",
        accessor: "teamScore",
        Cell: props => (
          <span>
            <div className="rt-mobileHeader">
              Points:
            </div>
            {props.value}
          </span>
        ),
        style: { textAlign: "left" },
        headerStyle: {
          color: "#000",
          background: "rgb(255,214,94)",
          background:
            "-moz-linear-gradient(top, rgba(255,214,94,1) 0%, rgba(254,191,4,1) 100%)",
          background:
            "-webkit-linear-gradient(top, rgba(255,214,94,1) 0%,rgba(254,191,4,1) 100%)",
          background:
            "linear-gradient(to bottom, rgba(255,214,94,1) 0%,rgba(254,191,4,1) 100%)"
        }
      }
    ];

    return (
      <ApolloProvider client={apolloClient}>
        <div className="allLeagues">
          <img className="mainLogo" src={Logo} alt="Logo" />
          <Query variables={leagueid} query={QueryGetLeagueTeams}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading League Data...</div>;
              if (error) return <div>Error Loading League Data...</div>;

              if (!data || !data.leagues) {
                return <div>No league data was returned</div>;
              }
              return (
                <div>
                  {data.leagues.map(league => (
                    <div key={league.id}>
                      <h2 key={league.name}>{league.name}</h2>
                      Please pay Nick Hetland $10 in person or through <a href="https://venmo.com/Nick-Hetland" target="_blank">Venmo</a> and include your team name.<br />
                      {league.announcement}

                      {!isAuthenticated() && <div><br />Log in to join this league</div>}
                      {/* Determine if we can show the Join Leage button */}
                      {isAuthenticated() && // The user has to be logged in
                        league.isLocked === false && // The league can't be locked
                        league.fantasyTeams.length === 0 && ( // There are no fantasy teams created at all
                          <Link
                            className="link-style"
                            to={`/hockey/createteam/${
                              this.props.match.params.id
                              }`}
                          >
                            Join League
                            </Link>

                        )}

                      {isAuthenticated() && // The user has to be logged in
                        league.isLocked !== false && // The league can't be locked
                        league.fantasyTeams.some(
                          val =>
                            val.gM.externalId !== this.props.auth.tokenSub && ( // The user has not created a fantasy team yet
                              <Button bsStyle="primary" className="btn-margin">
                                <Link
                                  className="createTeamBtn"
                                  to={`/hockey/createteam/${
                                    this.props.match.params.id
                                    }`}
                                >
                                  Join League
                                </Link>
                              </Button>
                            )
                        )}
                      <ReactTable
                        data={league.fantasyTeams}
                        columns={LeagueTeamsColumns}
                        minRows={1}
                        resizable={false}
                        showPagination={false}
                        noDataText="Bloody hell... No teams!"
                      />
                    </div>
                  ))}
                </div>
              );
            }}
          </Query>
        </div>
      </ApolloProvider>
    );
  }
}

export default LeagueTeams;
