import React, { Component } from "react";

//Router
import { Route, withRouter } from "react-router-dom";
//Components
import Registration from "./Page/Registration/Registration";
import Header from "./Components/Header/Header";

//context
import { AppContextProvider } from "./Context/AppContext";
// Styles
import "./App.css";
import { AUTH_TOKEN } from "./constants";
import Home from "./Page/Home/Home";
import AddTicket from "./Components/AddTicket.js/AddTicket";

class App extends Component {
  state = {
    display_modal: true,
  };
  componentDidMount() {
    const token = localStorage.getItem(AUTH_TOKEN);
    const { history } = this.props;
    if (!token) {
      history.push("/register");
    }
  }

  updateModal = (bool) => {
    this.setState((prevState) => ({ ...this.state, display_modal: bool }));
  };
  render() {
    const { updateModal } = this;
    return (
      <div className="App">
        <header className="App-header">
          {" "}
          <Header />{" "}
        </header>
        <Route
          path="/register"
          exact
          component={(props) => <Registration {...props} />}
        />

        <AppContextProvider
          value={{
            updateModal,
          }}
        >
          <Route
            exact
            path="/home"
            component={(props) => <Home {...props} />}
          />
          <div className={this.state.display_modal ? "display_modal" : ""}>
            <AddTicket />
          </div>
        </AppContextProvider>
      </div>
    );
  }
}

export default withRouter(App);
