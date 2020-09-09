import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
// Styles
import "./Header.css";
import { AUTH_TOKEN } from "../../constants";

// Context
import AppContext from "./../../Context/AppContext";

function Header({ history }) {
	// Log out a user
	const logout = () => {
		localStorage.removeItem(AUTH_TOKEN);
		history.push("/register");
	};
	const { updateModal } = useContext(AppContext);

	const showAddTicketModal = () => {
		updateModal({ display_modal: true });
	};

	const navRoute = (path) => {
		history.push(`/${path}`);
	};
	return (
		<nav className="navbar navbar-expand-lg navbar-mainbg">
			<div className="navbar-brand navbar-logo">Help Desk</div>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav ml-auto">
					<li className="nav-item" onClick={() => navRoute("home")}>
						<i className="fas fa-tachometer-alt"></i>Dashboard
					</li>

					<li className="nav-item" onClick={showAddTicketModal}>
						<i className="far fa-clone"></i>Add a Ticket
					</li>
					<li className="nav-item active logout" onClick={logout}>
						<i className="far fa-address-book"></i>Log Out
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default withRouter(Header);
