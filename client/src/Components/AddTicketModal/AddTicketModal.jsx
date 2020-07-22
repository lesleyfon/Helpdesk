import React, { Component } from "react";
import AppContext from "../../Context/AppContext";

// GraphQL
import { Mutation } from "react-apollo";
import { ADD_TICKET_MUTATION, GET_TICKETS_QUERY } from "./../../GraphQL/Queries";

//Styles
import "./AddTicket.css";
import { AUTH_TOKEN } from "../../constants";

const updateCache = (cache, { data: { addTicket } }) => {
	//Read Query from the Cache
	// Pass in the Query we need to fetch after a successful mutation
	// This returns all the data from the cache
	const { allTickets } = cache.readQuery({ query: GET_TICKETS_QUERY });
	//We want to write a cache and pass in the newly created ticket
	// First we have to pass in the the query for getting all the tickets
	// then we concat the addTicket to the allTickets array so it populates the all tickets array and renders on the page
	cache.writeQuery({
		query: GET_TICKETS_QUERY,
		data: {
			allTickets: allTickets.concat(addTicket),
		},
	});
};
export default class AddTicketModal extends Component {
	static contextType = AppContext;
	state = {
		title: "",
		description: "",
		category: "",
		error: {
			status: false,
			message: "",
		},
	};

	// title: String!
	//   description: String!
	//   category: String
	//   created_by: String
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	//graphql Mutation

	render() {
		// Destructure updateNodal from the context
		const { updateModal } = this.context;

		const {
			title,
			description,
			category,
			error: { status, message },
		} = this.state;

		return (
			<Mutation
				mutation={ADD_TICKET_MUTATION}
				onCompleted={(data) => {
					const { addTicket } = data;

					if (addTicket.title) {
						this.setState({
							title: "",
							description: "",
							category: "",
							error: {
								status: false,
								message: "",
							},
						});
						updateModal({ display_modal: false });
					}
				}}
				// Error Handling
				onError={(err) => {
					this.setState({
						error: {
							message: err.message.split("Error:")[1],
							status: !status,
						},
					});
				}}
				update={updateCache}
			>
				{(addMutation) => {
					return (
						<div className="form-fields-container registration-wrapper">
							<div
								id="close"
								onClick={() => {
									updateModal({ display_modal: false });
								}}
							>
								Close
							</div>
							<div className="add-ticket-input-container">
								<input
									type="text"
									name="title"
									value={title}
									placeholder="Title"
									autoComplete="off"
									onChange={this.handleChange}
								/>
								<input
									type="text"
									name="category"
									value={category}
									placeholder="Category"
									onChange={this.handleChange}
								/>
								<textarea
									name="description"
									type="textarea"
									rows="5"
									value={description}
									placeholder="Description"
									onChange={this.handleChange}
								/>

								<div
									className="add-ticket-btn"
									onClick={(e) => {
										e.preventDefault();
										addMutation({
											variables: {
												title,
												description,
												category,
												created_by: localStorage.getItem(AUTH_TOKEN),
											},
										});
									}}
								>
									{" "}
									Add A Ticket
								</div>
							</div>

							{status ? <p>{message}</p> : ""}
						</div>
					);
				}}
			</Mutation>
		);
	}
}
