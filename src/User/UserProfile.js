import React, { Component } from "react";
import { ApolloProvider, Query } from "react-apollo";
import { GetProfileQuery } from "./Queries/GetUserQuery";
import ModifyUser from "./ModifyUser";
import UpdateEmailPref from "./UpdateEmailPref";
import LoginPage from "../Home/Login";

//Assests
import "../Assets/css/User/UserProfile.css";
import Logo from "../Assets/Images/logo-white-with-name.jpg";

class UserProfile extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    if (!isAuthenticated()) {
      return <LoginPage auth={this.props.auth} />;
    } else {
      return (
        <ApolloProvider client={this.props.auth.apolloClient}>
          <div className="userProfile">
            <img className="mainLogo" src={Logo} alt="Logo" />
            <h2>StaplePuck Profile</h2>
            <Query query={GetProfileQuery} fetchPolicy="cache-and-network">
              {({ loading, error, data }) => {
                if (loading) return <div>Fetching Profile...</div>;
                if (error) return <div>Error Fetching Profile...</div>;

                //Redirect to the Add User form if no user is returned on login
                if (!data || !data.currentUser) {
                  return <ModifyUser />;
                }

                return (
                  <div>
                    <UpdateEmailPref currentuser={data.currentUser} />
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

export default UserProfile;
