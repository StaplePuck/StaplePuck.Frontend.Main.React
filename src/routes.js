import React from "react";
import { Route, Router, Redirect } from "react-router-dom";
import Auth from "./Auth/Auth";
import History from "./history";
import Callback from "./Callback/Callback";
import TopNavBar from "./Components/TopNavBar";
<<<<<<< HEAD
import MyLeaguesNavBar from "./User/MyLeaguesNavBar"
import Home from "./Home/AllLeagues";
import MyLeagues from "./User/MyLeagues";
=======
import Home from "./LeagueViews/AllLeagues";
import MyLeagues from "./LeagueViews/MyLeagues";
>>>>>>> cdca27a2124b454622bd28c9b0a120a3020e3905
import UserProfile from "./User/UserProfile";
import ModifyUser from "./User/ModifyUser";
import LoginPage from "./Home/Login";
import LeaguePage from "./LeagueViews/LeagueTeams";
import CreateHokeyTeam from "./Hockey/Pages/CreateHockeyTeam";

const auth = new Auth();


export const makeMainRoutes = () => {
  return (
<<<<<<< HEAD
    <ApolloProvider client={auth.apolloClient}>
      <div>
        <Router history={History}>
          <div> 
            <TopNavBar auth={auth} />  
            <div> 
              <MyLeaguesNavBar // TODO: This routing should be refactored.
                               // I'm not sure if the NavBars should be here or not.
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
              render={props => <ModifyUser auth={auth} {...props} />}
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
=======
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
            path="/adduser"
            render={props => <ModifyUser auth={auth} {...props} />}
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
          <Route
            path="/league"
            render={props => <LeaguePage auth={auth} {...props} />}
          />
          <Route
            path="/hockey/createteam"
            render={props => <CreateHokeyTeam auth={auth} {...props} />}
          />
        </div>
      </Router>
    </div>
>>>>>>> cdca27a2124b454622bd28c9b0a120a3020e3905
  );
};
