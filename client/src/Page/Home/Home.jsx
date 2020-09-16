import React, { Component } from "react";

import { verify } from "jsonwebtoken";
import { AUTH_TOKEN } from "./../../constants.js";

import { REACT_APP_JWT_SECRETE } from "./../../Utils/ConvertPhone";

//Component
// import Users from "../../Components/Users.js/UsersList";
import TicketList from "../../Components/Ticket/TicketList";

//Styles
import "./Home.css";

export default class Home extends Component {
	state = {
		display_modal: true,
	};
	verifyToken() {
		try {
			const token = localStorage.getItem(AUTH_TOKEN);
			verify(token, REACT_APP_JWT_SECRETE);
		} catch (error) {
			if (error) {
				localStorage.removeItem("AUTH_TOKEN");
			}
		}
	}

	componentDidMount() {
		this.verifyToken();
	}

	render() {
		return (
			<div className="ticket-container ">
				{/* <div className="users aside">
					{" "}
					<Users />
				</div> */}
				<div className="tickets main">
					<TicketList />
				</div>
			</div>
		);
	}
}

//Add search Functionality
