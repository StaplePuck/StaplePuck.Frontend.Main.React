import React, { Component } from "react";

class UserProfile extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    return <div>The user profile will go here</div>;
  }
}

export default UserProfile;
