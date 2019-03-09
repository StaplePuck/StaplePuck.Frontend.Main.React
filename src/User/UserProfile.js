import React, { Component } from "react";
import { ApolloProvider, graphql } from "react-apollo";
import { GetProfileQuery } from "./Queries/GetUserQuery";

//Assests
import "../Assets/css/UserProfile.css";
import Logo from "../Assets/Images/logo-white-with-name.jpg";

function GetProfileData({ loading, error, data }) {
  if (loading) return <div>Fetching Profile...</div>;
  if (error) return <div>Error Fetching Profile...</div>;
  if (!data || !data.currentUser) {
    console.log(data);
    return <div>No Profile..</div>;
  }
}

const ProfileData = graphql(GetProfileQuery, {
  props: ({ data: { loading, data } }) => ({
    loading,
    data
  })
})(GetProfileData);

class UserProfile extends Component {
  render() {
    return (
      <div className="userProfile">
        <img className="mainLogo" src={Logo} alt="Logo" />
        <h1>Profile</h1>
        <ApolloProvider client={this.props.auth.client}>
          <ProfileData />
        </ApolloProvider>
      </div>
    );
  }
}

export default UserProfile;
