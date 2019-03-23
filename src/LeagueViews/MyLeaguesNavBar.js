import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Assets/css/Leagues/MyLeaguesNavBar.css";

class MyLeaguesNavBar extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    return (
      <div className="myLeaguesNavBar">
        <h5>Your Leagues</h5>
        <Link to="/myleagues">{this.props.leagues}</Link>
      </div>
    );
  }
}

export default MyLeaguesNavBar;
