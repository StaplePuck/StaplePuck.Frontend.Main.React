import React, { Component } from "react";
import { GLOBAL_CONFIG } from "../../App_Config/GlobalVariables";
import ReactTable from "react-table";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { QueryGetTeamDetail } from "../Queries/QueryGetTeamDetail";
import { HockeyTeamDetailsColumns } from "./HockeyTeamDetailColumns"

//Assets
import "../../Assets/css/Leagues/LeagueTables.css";
import Logo from "../../Assets/Images/logo-white-with-name.jpg";

const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: GLOBAL_CONFIG.graphQLEndPoint
    }),
    cache: new InMemoryCache()
});

class HockeyTeamDetail extends Component {
    render() {
        let teamId = {
            teamId: this.props.match.params.id
        };
        return (
            <ApolloProvider client={apolloClient}>
                <div className="allLeagues">
                    <img className="mainLogo" src={Logo} alt="Logo" />
                    <Query variables={teamId} query={QueryGetTeamDetail}>
                        {({ loading, error, data }) => {
                            if (loading) return <div className="teamMain">Loading team...</div>;
                            if (error) return <div className="teamMain">Error loading team data... {error}</div>;
                            if (!data || !data.fantasyTeams) {
                                return <div className="teamMain">No team data was returned</div>;
                            }
                            return (
                                <div>
                                    {data.fantasyTeams.map(fteam => (
                                        <div key={fteam.name}>
                                            <h4>{fteam.name}</h4>
                                            League Ranking: {fteam.rank}<br />
                                            Total Score: {fteam.score}
                                            <div>
                                                <ReactTable
                                                    data={fteam.fantasyTeamPlayers}
                                                    columns={HockeyTeamDetailsColumns}
                                                    minRows={1}
                                                    pageSize={100}
                                                    resizable={false}
                                                    showPagination={false}
                                                    noDataText="Bloody hell... No teams!"
                                                />
                                            </div>
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

export default HockeyTeamDetail;
