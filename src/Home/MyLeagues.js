import React, { Component } from "react";

class MyLeagues extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    return <div>A list of all the users leagues will go here</div>;
  }
}

export default MyLeagues;
