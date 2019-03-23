import React, { Component } from "react";
import { ApolloProvider, Query } from "react-apollo";
import {} from "../Queries/CreateTeam";
import LoginPage from "../../Home/Login";

//Assests
import "../../Assets/css/User/UserProfile.css";
import Logo from "../../Assets/Images/logo-white-with-name.jpg";

class Craeteteam extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    if (!isAuthenticated()) {
      return <LoginPage auth={this.props.auth} />;
    } else {
      return (
        <ApolloProvider client={this.props.auth.apolloClient}>
          <div className="userProfile">
            <img className="mainLogo" src={Logo} alt="Logo" />
            <h2>Create your team that will lose to Hetland</h2>
          </div>
        </ApolloProvider>
      );
    }
  }
}

export default Craeteteam;
