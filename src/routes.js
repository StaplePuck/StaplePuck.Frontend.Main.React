import React from "react";
import { Route, Router, Redirect } from "react-router-dom";
import Auth from "./Auth/Auth";
import History from "./history";
import Callback from "./Callback/Callback";
import TopNavBar from "./Components/TopNavBar";
import Home from "./Home/AllLeagues";
import MyLeagues from "./Home/MyLeagues";
import UserProfile from "./Home/UserProfile";

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => {
  return (
    <div>
      <Router history={History}>
        <div>
          <TopNavBar auth={auth} />
          <Route
            exact
            path="/"
            render={props => <Home auth={auth} {...props} />}
          />
          <Route
            exact
            path="/home"
            render={props => <Home auth={auth} {...props} />}
          />
          <Route
            exact
            path="/user"
            render={props => <UserProfile auth={auth} {...props} />}
          />
          <Route
            exact
            path="/myleagues"
            render={props =>
              auth.isAuthenticated() ? (
                <MyLeagues auth={auth} {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/callback"
            render={props => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
        </div>
      </Router>
    </div>
  );
};
