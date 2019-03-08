import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";

import { GlobalProvider } from "./GlobalState/store";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { ApolloProvider } from "react-apollo";
import client from "./apollo";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import GlobalStyle from "./global-styles";

ReactDOM.render(
  <>
    <GlobalProvider>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <Routes />
          <GlobalStyle />
        </ApolloHooksProvider>
      </ApolloProvider>
    </GlobalProvider>
    <ToastContainer draggable={true} position={"bottom-center"} />
  </>,
  document.getElementById("root")
);
