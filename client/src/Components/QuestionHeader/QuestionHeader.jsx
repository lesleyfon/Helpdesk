import React, { Component } from "react";
import { Query } from "react-apollo";
import { Get_TICKET_AT_ID } from "./../../GraphQL/Queries.js";
class QuestionHeader extends Component {
	render() {
		const { id } = this.props;
		return (
			<section className="question">
				<div className="question_ticket">
					<Query query={Get_TICKET_AT_ID} variables={{ id: id }}>
						{({ loading, error, data }) => {
							if (loading) return <h1>Fetching data</h1>;

							const { fetchTicket } = data;

							let date = new Date(Number(fetchTicket.created_at)); // Format date. Returns a date Object
							date = `${date.toLocaleDateString()}`; // Convert it to local string
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
			</section>
		);
	}
}

export default QuestionHeader;
