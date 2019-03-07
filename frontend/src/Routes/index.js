import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { Store } from "../GlobalState/store";

import Home from "../Routes/Home";
import DashBoard from "./DashBoard";
import CreateProjects from "./DashBoard/CreateProjects";

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
      <Route path="/" exact component={DashBoard} />
      <Route path="/createProject" component={CreateProjects} />
      <Redirect from={"*"} to={"/"} />
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
