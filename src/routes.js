import React from "react";
import { Route, Router, Redirect } from "react-router-dom";
import Auth from "./Auth/Auth";
import { ApolloProvider } from "react-apollo";
import History from "./history";
import Callback from "./Callback/Callback";
import TopNavBar from "./Components/TopNavBar";
import MyLeaguesNavBar from "./User/MyLeaguesNavBar"
import Home from "./Home/AllLeagues";
import MyLeagues from "./User/MyLeagues";
import UserProfile from "./User/UserProfile";
import UserAdd from "./User/AddUser";
import LoginPage from "./Home/Login.js";

const auth = new Auth();


export const makeMainRoutes = () => {
  return (
    <ApolloProvider client={auth.apolloClient}>
      <div>
        <Router history={History}>
          <div>
            <TopNavBar auth={auth} />
            <div> 
              <MyLeaguesNavBar // TODO: This routing should be refactored.
                auth={auth} 
                leagues={"TODO: GetTeams"} 
                myleaguesuri={props => 
                  <Route
                    exact
                    path="/myleagues"
                    render={props =>
                      auth.isAuthenticated() ? (
                        <MyLeagues auth={auth} {...props} />
                      ) : (
                        <Redirect to="/login" />
                      )
                    }
                />}
              />
            </div>
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
              path="/adduser"
              render={props => <UserAdd auth={auth} {...props} />}
            />
            <Route
              exact
              path="/myleagues"
              render={props =>
                auth.isAuthenticated() ? (
                  <MyLeagues auth={auth} {...props} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/login"
              render={props => <LoginPage auth={auth} {...props} />}
            />
            <Route
              path="/callback"
              render={props => <Callback auth={auth} {...props} />}
            />
          </div>
        </Router>
      </div>
    </ApolloProvider>
  );
};
