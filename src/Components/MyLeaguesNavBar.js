import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Assets/css/MyLeaguesNavBar.css";

class MyLeaguesNavBar extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    return (
      <nav>
        <div>

        </div>
      </nav>
    );
  }
}

export default MyLeaguesNavBar;
