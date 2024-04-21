import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Route component={App} />
  </BrowserRouter>,
  rootElement
);
