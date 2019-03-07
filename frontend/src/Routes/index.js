import React, { useContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Store } from "../GlobalState/store";

import Home from "../Routes/Home";
import DashBoard from "./DashBoard";

const LoggedOutRoutes = () => (
  <BrowserRouter>
    <Route path="/" exact component={Home} />
  </BrowserRouter>
);

const LoggedInRoutes = () => (
  <BrowserRouter>
    <Route path="/" exact component={DashBoard} />
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
