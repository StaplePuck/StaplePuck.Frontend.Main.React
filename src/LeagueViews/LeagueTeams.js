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
import "../Assets/css/Leagues/AllLeagues.css";
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
        Cell: props =>
          this.props.auth.tokenSub === props.original.gM.externalId ? (
            <Link to={`../hockey/setlineup/${props.original.id}`}>
              {props.value}
            </Link>
          ) : (
            <span>{props.value}</span>
          ),
        style: { textAlign: "center" },
        headerStyle: {
          fontWeight: "bold",
          backgroundColor: "gold",
          color: "#30303c"
        }
      }
      // {
      //   Header: "Score",
      //   accessor: "name",
      //   style: { textAlign: "center" },
      //   headerStyle: {
      //     fontWeight: "bold",
      //     backgroundColor: "gold",
      //     color: "#30303c"
      //   }
      // }
    ];

    return (
      <ApolloProvider client={apolloClient}>
        <div className="userProfile">
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
                      {isAuthenticated() &&
                        (league.isLocked === false && (
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
                        ))}
                      <ReactTable
                        data={league.fantasyTeams}
                        columns={LeagueTeamsColumns}
                        defaultPageSize={10}
                        minRows={1}
                        resizable={false}
                        noDataText="Bloody hell... No teams!"
                        className="-striped -highlight allLeaguesTable"
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
