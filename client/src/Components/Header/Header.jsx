import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Styles
import "./Header.css";
import { AUTH_TOKEN } from "../../constants";

function Header({ history }) {
	// Log out a user
	const logout = () => {
		localStorage.removeItem(AUTH_TOKEN);
		history.push("/register");
	};
	return (
		<nav className="navbar navbar-expand-lg navbar-mainbg">
			<div className="navbar-brand navbar-logo">Help Desk</div>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav ml-auto">
					<div className="hori-selector">
						<div className="left"></div>
						<div className="right"></div>
					</div>

					<li className="nav-item">
						<i className="fas fa-tachometer-alt"></i>Dashboard
					</li>

					<li className="nav-item">
						<i className="far fa-clone"></i>Add a Ticket
					</li>
					<li className="nav-item">
						<i className="far fa-calendar-alt"></i>Profile
					</li>
					<li className="nav-item">
						<i className="far fa-chart-bar"></i>Tickets
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
