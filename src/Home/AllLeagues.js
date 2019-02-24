import React, { Component } from "react";
import { Button } from "react-bootstrap";

class MainLeagues extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    return <div>A list of all the leagues will go here.</div>;
  }
}

export default MainLeagues;
