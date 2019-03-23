import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

//Assests
import "../Assets/css/Components/NavBar.css";

class TopNavBar extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    return (
      <nav>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">All Leagues</Link>
            </li>
            <li>
              <Link to="/myleagues">My Leagues</Link>
            </li>

            {isAuthenticated() && (
              <li>
                <Link to="/user">My Profile</Link>
              </li>
            )}

            <li>
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
