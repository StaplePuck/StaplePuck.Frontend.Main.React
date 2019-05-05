import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { GLOBAL_CONFIG } from "../App_Config/GlobalVariables";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { QueryLeagueTeamsList } from "./Queries/QueryLeagueTeamList";
import { QueryUserProfile } from "../User/Queries/QueryUserProfile"

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

    this.props.auth.apolloClient !== undefined &&
      this.props.auth.apolloClient
        .query({
          query: QueryUserProfile
        })
        .then(result => (
          result.data.currentUser !== null && (this.props.auth.userName = result.data.currentUser.name))
        );

    const { isAuthenticated } = this.props.auth;
    let leagueid = {
      leagueid: this.props.match.params.id
    };

    return (
      <ApolloProvider client={apolloClient}>
        <div className="allLeagues">
          <img className="mainLogo" src={Logo} alt="Logo" />
          <Query variables={leagueid} query={QueryLeagueTeamsList} fetchPolicy="cache-and-network">
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
                      {league.announcement}

                      {/* Determine if we can show the Join Leage button */}
                      {league.isLocked === true ? (<div><br />This league is locked</div>) : // The league can't be locked
                        (!isAuthenticated() ? (<div><br /><b>Log in to join this league.</b></div>) : // The user has to be logged in
                          (this.props.auth.userName === undefined ? (<div><br /><b>You need to set your a user handle in the My Profile page in order to create a team.</b></div>) :
                            (
                              (league.allowMultipleTeams === true || // The league allows multiple teams
                                league.fantasyTeams.length === 0 || // There are no fantasy teams created at all
                                league.fantasyTeams.filter(val => val.gM.externalId === this.props.auth.tokenSub).length < 0) && // The user has not created a fantasy team yet
                              <div>
                                <br />
                                <Link
                                  className="link-style"
                                  to={`/hockey/createteam/${this.props.match.params.id}`}>
                                  Join League
                                  </Link>
                              </div>
                            )
                          )
                        )
                      }

                      <ReactTable
                        data={league.fantasyTeams}
                        columns={[
                          {
                            Header: "Team",
                            accessor: "name",
                            id: "id",
                            Cell: props => (
                              league.isLocked === true ? (<span>
                                <div className="rt-mobileHeader">
                                  Team:
                                </div>
                                <Link className="grid-link-style" to={`../hockey/teamdetail/${props.original.id}`}>
                                  {props.value}
                                </Link>
                              </span>) :
                                (
                                  this.props.auth.tokenSub === props.original.gM.externalId && isAuthenticated() ? (
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
                                )),
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
                            Header: "Rank",
                            accessor: "rank",
                            Cell: props => (
                              <span>
                                <div className="rt-mobileHeader">
                                  Rank:
                                </div>
                                {props.value}
                              </span>
                            ),
                            style: { textAlign: "center" },
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
                            Header: "Score",
                            accessor: "score",
                            Cell: props => (
                              <span>
                                <div className="rt-mobileHeader">
                                  Score:
                                </div>
                                {props.value}
                              </span>
                            ),
                            style: { textAlign: "center" },
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
                            Header: "Today's Score",
                            accessor: "todaysScore",
                            Cell: props => (
                              <span>
                                <div className="rt-mobileHeader">
                                  Today's Score:
                                </div>
                                {props.value}
                              </span>
                            ),
                            style: { textAlign: "center" },
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
                            Header: "Team GM",
                            accessor: "gM.name",
                            Cell: props => (
                              <span>
                                <div className="rt-mobileHeader">
                                  Team GM:
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
                        ]}
                        minRows={1}
                        pageSize={100}
                        resizable={false}
                        showPagination={false}
                        defaultSorted={[{
                          id: 'rank',
                          desc: false,
                        }]}
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
