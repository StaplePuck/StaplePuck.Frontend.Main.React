import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./App.css";
import TopNavBar from "./Components/TopNavBar";

class App extends Component {
  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem("isLoggedIn") === "true") {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated, login, logout } = this.props.auth;

    return <div />;
  }
}

export default App;
