import React, { Component } from "react";
import { FETCH_TICKET_SOLUTIONS } from "./../../GraphQL/Queries.js";
import { Query } from "react-apollo";
class AnswerList extends Component {
	render() {
		const { id } = this.props;
		return (
			<section className="answer-section">
				<Query query={FETCH_TICKET_SOLUTIONS} variables={{ id: id }}>
					{({ loading, error, data }) => {
						// Request Loading
						if (loading) {
							return <h3>Fetching Data </h3>;
						}

						// IF theres an error when fetching data
						if (error) {
							return <h3>Error Fetching Solutions To tickets</h3>;
						}

						// Destructure the ticketSolution key value from the data object
						const { ticketSolution } = data;

						// When theres data returned and the length of the array is greater than Zero
						if (Array.isArray(ticketSolution) && ticketSolution.length === 0) {
							return <h2>No Suggested Solution Yet To This Question </h2>;
						}

						// Render Tickets with Data in the Array
						if (Array.isArray(ticketSolution) && ticketSolution.length > 0) {
							return ticketSolution.map((solution, index) => (
								<div key={solution.id}>
									{" "}
									<h3>Answer {index + 1}:</h3>
									<p>{solution.solution}</p>
									<p>Solved By: {solution.resolved_by}</p>
								</div>
							));
						}
					}}
				</Query>
			</section>
		);
	}
}

export default AnswerList;
