import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { ApolloProvider, Query } from "react-apollo";
import { Formik, Field, Form } from "formik";
import { Mutation } from "react-apollo";
import * as Yup from "yup";
import { QueryGetNHLData } from "../Queries/QueryGetNHLData";
import { MutationSetLineup } from "../Queries/MutationSetLineup";
import LoginPage from "../../Home/Login";

//Assets
import "../../Assets/css/Hockey/SetLineup.css";
import Logo from "../../Assets/Images/logo-white-with-name.jpg";
import { transformOperation } from "apollo-link/lib/linkUtils";

const ProfileShema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Must be 5 characters or longer")
    .max(20, "Must be 20 characters or less")
    .required("Team Name is Required")
});

class SetHockeyLineup extends Component {
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
                          <Mutation mutation={MutationSetLineup}>
                            {(updateFantasyTeam, { saving, error, data }) => (
                              <div className="mainTeamSet">
                                {saving && <div>We're saving.. Hold on tight</div>}
                                {error && (
                                  <div>Error Saving... {console.log(error)}</div>
                                )}
                                {data &&
                                  data.updateFantasyTeam &&
                                  alert("Team Saved")}
                                <Formik
                                  initialValues={initValues}
                                  onSubmit={values => {
                                    var fantasyTeamPlayers = [];
                                    console.log("submitting");
                                    for (let [key, value] of Object.entries(values)) {
                                      fantasyTeamPlayers.push({ "playerId": value });
                                    }

                                    updateFantasyTeam({
                                      variables: {
                                        fantasyTeamUpdate: {
                                          id: Fteams.id,
                                          "fantasyTeamPlayers": fantasyTeamPlayers
                                        }
                                      }
                                    });
                                  }}
                                  render={formProps => {
                                    return (
                                      <Form className="teamForm">
                                        <h4> {Fteams.name}</h4>                                      <div>
                                          {Fteams.league.season.teamSeasons.map(
                                            NHLTeam => (
                                              <div>
                                                <div key={NHLTeam.team.id} className="teamFormLabel">
                                                  <label>
                                                    {NHLTeam.team.fullName}:
                                                  </label>
                                                </div>
                                                <Field
                                                  name={`player${NHLTeam.team.id}`}
                                                  component="select"
                                                  className="teamFormSelect"
                                                  placeholder="Select...">
                                                  {NHLTeam.playerSeasons.map(
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
