import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { Store } from "../GlobalState/store";

import Home from "../Routes/Home";
import Projects from "./Projects";
import CreateProjects from "./Projects/Create/CreateProject";
import SettingTags from "./Projects/Create/SettingTags";

import DashBoard from "./DashBoard";

const LoggedOutRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Redirect from={"*"} to={"/"} />
    </Switch>
  </BrowserRouter>
);

const LoggedInRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/dashBoard" component={DashBoard} />
      <Route path="/projects" exact component={Projects} />
      <Route path="/projects/create" component={CreateProjects} />
      <Route path="/projects/settingTag" component={SettingTags} />
      <Redirect from={"*"} to={"/projects"} />
    </Switch>
  </BrowserRouter>
);

const Routes = () => {
  const { state } = useContext(Store);

  if (state.isLoggedIn) {
    return <LoggedInRoutes />;
  } else {
    return <LoggedOutRoutes />;
  }
};

export default Routes;
