import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "../Assets/css/AllLeagues.css";
import Logo from "../Assets/Images/logo-white-with-name.jpg";

class Login extends Component {
  render() {
    const { login } = this.props.auth;
    return (
      <div className="allLeagues">
        <img className="mainLogo" src={Logo} alt="Logo" />
        <br />
        <Button
          bsStyle="primary"
          className="btn-margin"
          onClick={login.bind(this)}
        >
          Log In
        </Button>
      </div>
    );
  }
}

export default Login;
