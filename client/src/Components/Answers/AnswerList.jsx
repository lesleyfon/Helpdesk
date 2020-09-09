import React from "react";
import { FETCH_TICKET_SOLUTIONS } from "./../../GraphQL/Queries.js";
import { useQuery } from "react-apollo";

const AnswerList = (props) => {
	const { id } = props;

	const { loading, error, data } = useQuery(FETCH_TICKET_SOLUTIONS, {
		variables: { id },
	});

	// Destructure the data.ticketSolution key value from the data object

	// Request Loading
	if (loading) {
		return <h3>Fetching Data </h3>;
	}

	// IF theres an error when fetching data
	if (error) {
		return <h3>Error Fetching Solutions To tickets</h3>;
	}
	// When theres data returned and the length of the array is greater than Zero
	if (Array.isArray(data.ticketSolution) && data.ticketSolution.length === 0) {
		return <h2>No Suggested Solution Yet To This Question </h2>;
	}

	return (
		<section className="answer-section">
			<h3 className="mt-0 mb-0 text-uppercase font-weight-medium">Possible Answers</h3>

			{Array.isArray(data.ticketSolution) && data.ticketSolution.length > 0
				? data.ticketSolution.map((solution, index) => (
						<div
							key={solution.id}
							className="card card-text"
							style={{
								padding: "10px 10px",
								margin: "20px",
								textAlign: "left",
							}}
						>
							{/* {console.log(solution)} */}
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
								{solution.resolved_by.first_name} {solution.resolved_by.last_name}
							</p>
						</div>
				  ))
				: null}
		</section>
	);
};

export default AnswerList;
