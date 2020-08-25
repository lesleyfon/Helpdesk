import React, { Component } from "react";
import { FETCH_TICKET_SOLUTIONS } from "./../../GraphQL/Queries.js";
import { Query } from "react-apollo";

class AnswerList extends Component {
	render() {
		const { id } = this.props;
		return (
			<section className="answer-section">
				<h3 class="mt-0 mb-0 text-uppercase font-weight-medium">Possible Answers</h3>
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
								<div
									key={solution.id}
									className="card card-text"
									style={{
										padding: "10px 10px",
										margin: "20px",
										textAlign: "left",
									}}
								>
									{console.log(solution)}
									<h3
										style={{
											textAlign: "left",
											fontSize: "1rem",
											margin: "5px 0px ",
										}}
									>
										{index + 1})
									</h3>
									<p
										style={{
											textTransform: "capitalize",
											letterSpacing: ".8px",
											wordSpacing: "1.3px",
											lineHeight: "20px",
											marginBottom: "7px",
										}}
									>
										{solution.solution}
									</p>
									<p style={{ fontWeight: "lighter" }}>
										<span style={{ fontWeight: "bold" }}>Solved By:</span>{" "}
										{solution.resolved_by}
									</p>
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
