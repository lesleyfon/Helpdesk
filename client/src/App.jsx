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
import AddTicketModal from "./Components/AddTicketModal/AddTicketModal.jsx";
import SolveTicketModal from "./Components/SolveTicketModal/SolveTicketModal";

class App extends Component {
  state = {
    display_modal: false,
    display_solve_ticket_modal: true,
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
          <div
            className={this.state.display_modal ? "display_modal" : ""}
            style={{
              display: `${this.state.display_modal ? "flex" : "none"}`,
            }}
          >
            <AddTicketModal />
          </div>

          <div
            className={`${
              this.state.display_solve_ticket_modal
                ? "display_solve_ticket_modal"
                : ""
            }`}
          >
            <SolveTicketModal />
          </div>
        </AppContextProvider>
      </div>
    );
  }
}

export default withRouter(App);
