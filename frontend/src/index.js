import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";

import { GlobalProvider } from "./GlobalState/store";
import { ApolloProvider } from "react-apollo";
import client from "./apollo";

import GlobalStyle from "./global-styles";

ReactDOM.render(
  <GlobalProvider>
    <ApolloProvider client={client}>
      <Routes />
      <GlobalStyle />
    </ApolloProvider>
  </GlobalProvider>,
  document.getElementById("root")
);
