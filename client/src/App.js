import React, { Component } from "react";

//Router
import { Route, withRouter } from "react-router-dom";
//Components
import Registration from "./Page/Registration/Registration";
// Styles
import "./App.css";
import { AUTH_TOKEN } from "./constants";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem(AUTH_TOKEN);
    const { history } = this.props;
    if (!token) {
      history.push("/register");
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Help Desk</header>
        <Route
          path="/register"
          exact
          component={(props) => <Registration {...props} />}
        />
      </div>
    );
  }
}

export default withRouter(App);
