import React, { Component } from "react";

// GraphQl Imports
import { USER_QUERY } from "./../../GraphQL/Queries";
import { Query } from "react-apollo";

//styles
import "./Users.css";

// Avatar
import UserCard from "./UserCard";
export default class Users extends Component {
	state = {
		users: [],
	};

	render() {
		return (
			<div className="user-list-container">
				<div className="user-details-header">Online Users</div>
				<Query query={USER_QUERY}>
					{(result) => {
						const { data, ...error } = result;
						// console.log(error);
						if (data) {
							const { allUsers } = data;

							return allUsers.map((user) => <UserCard user={user} key={user.id} />);
						}
						return <p>Fetching Data</p>;
					}}
				</Query>
			</div>
		);
	}
}
