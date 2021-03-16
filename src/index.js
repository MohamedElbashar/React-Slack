/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import App from "./Components/App";
import registerServiceWorker from "./registerServiceWorker";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
    </Switch>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
