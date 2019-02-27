import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Assets/css/NavBar.css";
import Logo from "../Assets/Images/logo-white-with-name.jpg";

class TopNavBar extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    return (
      <nav>
        <div>
          <ul>
            <li>
              <Link to="/">StaplePuck</Link>
            </li>
            <li>
              <Link to="/">All Leagues</Link>
            </li>
            <li>
              <Link to="/myleagues">My Leagues</Link>
            </li>
            <li>
              {isAuthenticated() && (
                <li>
                  <Link to="/user">Hello Username</Link>
                </li>
              )}
              <Button
                bsStyle="primary"
                className="btn-margin pull-right"
                onClick={
                  isAuthenticated() ? logout.bind(this) : login.bind(this)
                }
              >
                {isAuthenticated() ? "Log Out" : "Log In"}
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default TopNavBar;
