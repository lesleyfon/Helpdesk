import React, { Component } from "react";
import { Query } from "react-apollo";
import { Get_TICKET_AT_ID } from "../../GraphQL/Queries";

class Question extends Component {
	render() {
		const {
			location: { pathname },
		} = this.props;

		const [, , id] = pathname.split("/"); // the [ , , ] represents the first two elements in the array. because we don't need those variables and need just the id

		return (
			<main>
				<div className="Ticket ">
					<Query query={Get_TICKET_AT_ID} variables={{ id: id }}>
						{({ loading, error, data }) => {
							if (loading) return <h1>Fetching data</h1>;

							const { fetchTicket } = data;

							let date = new Date(Number(fetchTicket.created_at)); // Format date. Returns a date Object
							date = `${date.toLocaleDateString()}`; // Convert it to local string
							console.log(fetchTicket);
							return (
								<section>
									<h2>{fetchTicket.title}</h2>
									<h5>Date: {date}</h5>
									<h5>By {fetchTicket.created_by.first_name} </h5>
									<p>Description: {fetchTicket.description}</p>
									<p>Category: {fetchTicket.category}</p>
								</section>
							);
						}}
					</Query>
				</div>
			</main>
		);
	}
}
export default Question;
