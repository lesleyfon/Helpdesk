import React, { Component } from "react";

//Router
import {
	Route,
	withRouter,
	// Redirect
} from "react-router-dom";

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
import Question from "./Page/Question/Question";

class App extends Component {
	state = {
		display_modal: false, // Display the modal for adding a ticket
		resolve_ticket: {
			display_solve_ticket_modal: false, // Displays modal for Adding a solution to a ticket
			ticket_id: null,
		},
	};
	componentDidMount() {
		const token = localStorage.getItem(AUTH_TOKEN);
		const { history } = this.props;
		if (!token) {
			history.push("/register");
		}
	}

	updateModal = (updateModalState) => {
		this.setState((prevState) => ({ ...this.state, ...updateModalState }));
	};

	render() {
		const { updateModal } = this;
		const { resolve_ticket } = this.state;
		return (
			<div className="App">
				<AppContextProvider
					value={{
						updateModal,
						resolve_ticket,
					}}
				>
					<header className="App-header">
						{" "}
						<Header />{" "}
					</header>
					{/* <Redirect from="/" to="/home" /> */}
					<Route
						path="/register"
						exact
						component={(props) => <Registration {...props} />}
					/>

					<Route exact path="/home" component={(props) => <Home {...props} />} />
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
							this.state.resolve_ticket.display_solve_ticket_modal
								? "display_solve_ticket_modal"
								: ""
						}`}
						style={{
							display: `${
								this.state.resolve_ticket.display_solve_ticket_modal
									? "flex"
									: "none"
							}`,
						}}
					>
						<SolveTicketModal />
					</div>
					<Route
						path="/question/:ticket_id/:title"
						component={(props) => <Question {...props} />}
					/>
				</AppContextProvider>
			</div>
		);
	}
}

export default withRouter(App);
