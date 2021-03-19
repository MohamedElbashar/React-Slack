/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import App from "./Components/App";
import registerServiceWorker from "./registerServiceWorker";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import firebase from "./firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.history.push("/");
      }
    });
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={App}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
        </Switch>
      </Router>
    );
  }
}
const RootwithAuth = withRouter(Root);
ReactDOM.render(
  <Router>
    <RootwithAuth />
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
