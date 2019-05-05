import React from "react";
import { Route, Router, Redirect } from "react-router-dom";
import Auth from "./Auth/Auth";
import History from "./history";
import Callback from "./Callback/Callback";
import TopNavBar from "./Components/TopNavBar";
import Home from "./LeagueViews/AllLeagues";
import MyLeagues from "./LeagueViews/MyLeagues";
import UserProfile from "./User/UserProfile";
import ModifyUser from "./User/ModifyUser";
import LoginPage from "./Home/Login";
import LeaguePage from "./LeagueViews/LeagueTeams";
import CreateHockeyTeam from "./Hockey/Components/CreateHockeyTeam";
import SetHockeyLineup from "./Hockey/Components/SetHockeyLineup";
import HockeyTeamDetail from "./Hockey/Components/HockeyTeamDetail";


const auth = new Auth();

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
            exact
            path="/league/:id"
            render={props => <LeaguePage auth={auth} {...props} />}
          />
          <Route
            path="/hockey/createteam/:id"
            render={props => <CreateHockeyTeam auth={auth} {...props} />}
          />
          <Route
            exact
            path="/hockey/setlineup/:id"
            render={props => <SetHockeyLineup auth={auth} {...props} />}
          />
          <Route
            exact
            path="/hockey/teamdetail/:id"
            render={props => <HockeyTeamDetail auth={auth} {...props} />}
          />
        </div>
      </Router>
    </div>
  );
};
