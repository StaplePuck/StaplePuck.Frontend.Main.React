import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { ApolloProvider, Query } from "react-apollo";
import { Formik } from "formik";
import * as Yup from "yup";
import { Mutation } from "react-apollo";
import { QueryGetLeagueTeams } from "../../LeagueViews/Queries/LeagueTeamListQuery";
import { MutationCreateTeam } from "../Mutations/MutationCreateTeam";
import LoginPage from "../../Home/Login";

//Assests
import "../../Assets/css/User/UserProfile.css";
import Logo from "../../Assets/Images/logo-white-with-name.jpg";

const ProfileShema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Must be 5 characters or longer")
    .required("Team Name is Required")
});

class Createteam extends Component {
  onCreateSuccess = data => {
    // navigate to the set lineup page
    this.props.history.replace(
      `/hockey/setlineup/${data.createFantasyTeam.id}`
    );
  };

  render() {
    let leagueid = {
      leagueid: this.props.match.params.id
    };
    const { isAuthenticated } = this.props.auth;
    if (!isAuthenticated()) {
      return <LoginPage auth={this.props.auth} />;
    } else {
      return (
        <ApolloProvider client={this.props.auth.apolloClient}>
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
                      <h2 key={league.name}>
                        Create a team for the {league.name}
                      </h2>
                    ))}

                    <div>
                      <Mutation
                        mutation={MutationCreateTeam}
                        onCompleted={data => {
                          this.onCreateSuccess(data);
                        }}
                        refetchQueries={() => {
                          return [{
                            query: QueryGetLeagueTeams,
                            variables: leagueid
                          }];
                        }}
                      >
                        {(createFantasyTeam, { loading, error }) => (
                          <div className="userProfile">
                            <div className="userform">
                              {loading && <div>Saving...</div>}
                              {error && (
                                <div>
                                  Error saving your team...
                                  <br />
                                  {error.message}
                                </div>
                              )}
                              <Formik
                                initialValues={{
                                  name: "",
                                  leagueId: this.props.match.params.id
                                }}
                                validationSchema={ProfileShema}
                                onSubmit={values => {
                                  createFantasyTeam({
                                    variables: {
                                      fantasyTeam: {
                                        name: values.name,
                                        leagueId: this.props.match.params.id
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
                                      <div className="userFormGroup">
                                        <label>Team Name:</label>
                                        <input
                                          type="Text"
                                          name="name"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.name}
                                        />
                                        {touched.name &&
                                          errors &&
                                          errors.name && (
                                            <div className="userFormErrorBlock">
                                              {errors.name}
                                            </div>
                                          )}
                                      </div>

                                      <div className="user-submit-block">
                                        <Button type="submit">Next ></Button>
                                      </div>
                                    </form>
                                  )}
                              />
                            </div>
                          </div>
                        )}
                      </Mutation>
                    </div>
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

export default Createteam;
