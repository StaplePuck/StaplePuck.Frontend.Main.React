import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { ApolloProvider, Query } from "react-apollo";
import { Formik, Field, Form } from "formik";
import { Mutation } from "react-apollo";
import * as Yup from "yup";
import { QueryGetNHLData } from "../Queries/QueryGetNHLData";
import { MutationSetLineup } from "../Mutations/MutationSetLineup";
import LoginPage from "../../Home/Login";

//Assets
import "../../Assets/css/Hockey/SetLineup.css";
import Logo from "../../Assets/Images/logo-white-with-name.jpg";

class SetHockeyLineup extends Component {
  replaceError(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  FindTeam(season, playerId) {
    try {
      season.teamSeasons.some(ts => {
        ts.playerSeasons.some(ps => {
          if (ps.player.id === playerId) {
            throw ts.team;
          }
        });
      });
    } catch (value) {
      return value;
    }
    return '';
  }

  CompareTeamSeasons(a, b) {
    const teamA = a.team.fullName;
    const teamB = b.team.fullName;

    let comparison = 0;
    if (teamA > teamB) {
      comparison = 1;
    } else if (teamA < teamB) {
      comparison = -1;
    }
    return comparison;
  }
  ComparePlayerSeasons(a, b) {
    const playerA = a.player.fullName;
    const playerB = b.player.fullName;

    let comparison = 0;
    if (playerA > playerB) {
      comparison = 1;
    } else if (playerA < playerB) {
      comparison = -1;
    }
    return comparison;
  }
  //playerSeasons

  render() {
    let teamId = {
      teamId: this.props.match.params.id
    };
    // Show the login page if not authenticated
    const { isAuthenticated } = this.props.auth;
    if (!isAuthenticated()) {
      return <LoginPage auth={this.props.auth} />;
    } else {
      return (
        <ApolloProvider client={this.props.auth.apolloClient}>
          <div className="teamMain">
            <div className="teamFormLogo">
              <img className="mainLogo" src={Logo} alt="Logo" />
              <br />
              You must selcet one player from each NHL team and the following number of players:
              10 Forwards (F),
              4 Defenseman (D), and
              2 Goalies (G)<br />
              :Scoring Rules:<br />
              Forwards -
              Points per Goal: 3
              Points per Assist: 2
              <br />
              Defensemen -
              Points per Goal: 4
              Points per Assist: 3
              <br />
              Goalies -
              Win: 5
              Shutout: 5
              Points per Goal: 10
              Points per Assist: 4
              <br />
              Bonus points -
              Overtime goal: +5
              Series clinching goal: +5
              Shorthanded goal: +2
            </div>
            <Query variables={teamId} query={QueryGetNHLData}>
              {({ loading, error, data }) => {
                if (loading) return <div>Loading NHL data...</div>;
                if (error) return <div>Error loading NHL data...</div>;

                if (!data || !data.fantasyTeams) {
                  return <div>No NHL data was returned</div>;
                }
                var initValues = {};
                data.fantasyTeams.forEach(fteam => {
                  fteam.fantasyTeamPlayers.forEach(p => {
                    var team = this.FindTeam(fteam.league.season, p.player.id);
                    var playerKey = "player" + team.id;
                    initValues[playerKey] = p.player.id;
                  });
                });
                return (
                  <div>
                    {data.fantasyTeams.map(Fteams => (
                      this.props.auth.tokenSub === Fteams.gM.externalId ? (
                        <div key={Fteams.id}>
                          <Mutation
                            mutation={MutationSetLineup}
                            refetchQueries={() => {
                              return [{
                                query: QueryGetNHLData,
                                variables: teamId
                              }];
                            }}
                            onCompleted={data => {
                              data.updateFantasyTeam.success === true && alert("Save Complete");
                            }}>
                            {(updateFantasyTeam, { saving, error }) => (

                              <div className="mainTeamSet">
                                {saving && <div>We're saving.. hold on tight</div>}
                                {error &&

                                  <div className="team-save-error">
                                    <b>Sorry, there was an error saving...</b>
                                    <br />
                                    {error.message.replace(/GraphQL error:/g, ".")}
                                    {this.scrollToTop()}
                                  </div>
                                }
                                <Formik
                                  initialValues={initValues}
                                  onSubmit={values => {
                                    var fantasyTeamPlayersArray = [];
                                    for (let [key, value] of Object.entries(values)) {
                                      fantasyTeamPlayersArray.push({ playerId: parseInt(value, 10) });
                                    }

                                    updateFantasyTeam({
                                      variables: {
                                        fantasyTeamUpdate: {
                                          id: Fteams.id,
                                          fantasyTeamPlayers: fantasyTeamPlayersArray
                                        }
                                      }
                                    });
                                  }}
                                  render={formProps => {
                                    return (
                                      <Form className="teamForm">
                                        <h4> {Fteams.name}</h4>
                                        <div>
                                          {Fteams.league.season.teamSeasons.sort(this.CompareTeamSeasons).map(
                                            NHLTeam => (
                                              <div key={NHLTeam.team.id}>
                                                <div className="teamFormLabel">
                                                  <label>
                                                    {NHLTeam.team.fullName}:
                                                  </label>
                                                </div>
                                                <Field
                                                  name={`player${NHLTeam.team.id}`}
                                                  component="select"
                                                  className="teamFormSelect"
                                                  placeholder="Select...">
                                                  <option value="">Select..</option>
                                                  {NHLTeam.playerSeasons.sort(this.ComparePlayerSeasons).map(
                                                    Players => (
                                                      <option
                                                        key={Players.player.id}
                                                        value={Players.player.id}
                                                      >
                                                        {Players.player.fullName} - {Players.positionType.shortName}
                                                      </option>
                                                    )
                                                  )}
                                                </Field>
                                              </div>
                                            )
                                          )}
                                        </div>
                                        <div className="teamFormSubmit">
                                          <Button type="submit">Save</Button>
                                        </div>
                                      </Form>
                                    )
                                  }}
                                />
                              </div>
                            )}
                          </Mutation>
                        </div>
                      ) : (
                          <span>
                            This isn't your team. Stop trying to cheat, yo!
                        </span>
                        )
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
}

export default SetHockeyLineup;
