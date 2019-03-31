import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { ApolloProvider, Query } from "react-apollo";
import { Formik, Field, Form, FieldArray } from "formik";
import { Mutation } from "react-apollo";
import * as Yup from "yup";
import { QueryGetNHLData } from "../Queries/QueryGetNHLData";
import { MutationSetLineup } from "../Queries/MutationSetLineup";
import LoginPage from "../../Home/Login";

//Assets
import "../../Assets/css/Leagues/AllLeagues.css";
import Logo from "../../Assets/Images/logo-white-with-name.jpg";

const ProfileShema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Must be 5 characters or longer")
    .max(20, "Must be 20 characters or less")
    .required("Team Name is Required")
});

class SetHockeyLineup extends Component {
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
          <div className="userProfile">
            <img className="mainLogo" src={Logo} alt="Logo" />

            <Query variables={teamId} query={QueryGetNHLData}>
              {({ loading, error, data }) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>Error Loading...</div>;

                if (!data || !data.fantasyTeams) {
                  return <div>No data was returned</div>;
                }
                return (
                  <div>
                    {data.fantasyTeams.map(Fteams => (
                      this.props.auth.tokenSub === Fteams.gM.externalId ? (
                        <div>
                          <Mutation mutation={MutationSetLineup} key={Fteams.id}>
                            {(updateFantasyTeam, { saving, error, data }) => (
                              <div className="userProfile">
                                <div className="userform">
                                  {saving && <div>Saving...</div>}
                                  {error && (
                                    <div>Error Saving... {console.log(error)}</div>
                                  )}
                                  {data &&
                                    data.updateFantasyTeam &&
                                    alert("Team Saved")}
                                  <Formik
                                    // initialValues={{
                                    //   name: "",
                                    // }}
                                    onSubmit={values => {
                                      var fantasyTeamPlayers = [];
                                      values.player.forEach(element => {
                                        if ((typeof(element) !== 'undefined') && (element !== null)) {
                                          fantasyTeamPlayers.push({"playerId": element});
                                        }
                                      });
                                      
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
                                      return(
                                      <Form>
                                        <h3>
                                          Team Name: {Fteams.name}
                                        </h3>
                                        <div>
                                        {Fteams.league.season.teamSeasons.map(
                                            NHLTeam => (
                                              <div className="userFormGroup" key={NHLTeam.team.id}>
                                                <label>
                                                  {NHLTeam.team.fullName}
                                                </label>
                                                <Field 
                                                  name={`player.${NHLTeam.team.id}`} 
                                                  component="select" 
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
                                        <div className="user-submit-block">
                                          <Button type="submit">Save</Button>
                                        </div>
                                      </Form>
                                    )}}
                                  />
                                </div>
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
