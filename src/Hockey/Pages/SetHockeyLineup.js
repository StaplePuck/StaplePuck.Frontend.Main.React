import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { ApolloProvider, Query } from "react-apollo";
import { Formik } from "formik";
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
                      <Mutation mutation={MutationSetLineup}>
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
                                validationSchema={ProfileShema}
                                onSubmit={values => {
                                  updateFantasyTeam({
                                    variables: {
                                      fantasyTeam: {
                                        id: this.props.match.params.id
                                      }
                                    }
                                  });
                                }}
                                render={({
                                  values,
                                  errors,
                                  touched,
                                  handleChange,
                                  handleBlur,
                                  handleSubmit
                                }) => (
                                  <form onSubmit={handleSubmit}>
                                    <h3 key={Fteams.id}>
                                      Team Name: {Fteams.name}
                                    </h3>
                                    <div>
                                      {Fteams.league.season.teamSeasons.map(
                                        NHLTeam => (
                                          <div className="userFormGroup">
                                            <label
                                              key={NHLTeam.team.locationName}
                                            >
                                              {NHLTeam.team.fullName}
                                            </label>
                                            <select name="player">
                                              <option value="">
                                                Select...
                                              </option>
                                              {NHLTeam.playerSeasons.map(
                                                Players => (
                                                  <option
                                                    key={Players.player.id}
                                                    value={Players.player.id}
                                                  >
                                                    {Players.player.fullName}
                                                  </option>
                                                )
                                              )}
                                            </select>
                                          </div>
                                        )
                                      )}
                                    </div>
                                    <div className="user-submit-block">
                                      <Button type="submit">Save</Button>
                                    </div>
                                  </form>
                                )}
                              />
                            </div>
                          </div>
                        )}
                      </Mutation>
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
