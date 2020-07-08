import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { Mutation } from "react-apollo";
import { DELETE_MUTATION, GET_TICKETS_QUERY } from "./../../GraphQL/Queries";
import AppContext from "../../Context/AppContext";

import { loggedInUser } from "./../../Utils/ConvertPhone";
import { useHistory } from "react-router-dom";
//The first Params is the cache object which we can use to read and write data
// The second Params id the data that we get from what ever function we just executed
const updateCache = (cache, { data: { deleteTicket } }) => {
	// Get all tickets from the cache
	const { allTickets } = cache.readQuery({ query: GET_TICKETS_QUERY });
	cache.writeQuery({
		query: GET_TICKETS_QUERY,
		data: {
			allTickets: allTickets.filter((ticket) => ticket.id !== deleteTicket.id),
		},
	});
};

function TicketCard({ ticket }) {
	//Format the ticket Date to a readable String
	const date = new Date(Number(ticket.created_at));

	//Destructure the ticket id from the ticket props object
	const { id } = ticket;

	// GraphQL mutation for deleting a ticket

	const { updateModal } = useContext(AppContext);
	const history = useHistory();

	const routeToQuestion = (title, ticket_id) => {
		// Format the ticket title to not have spaces or accept /

		title = title.trim(); // Remove wide spaces after each title
		title = title.replace(/[^a-zA-Z0-9]/g, "_").replace(/__/g, "_"); // Regext to replace all unwanted characters with an underscore

		history.push(`/question/${ticket_id}/${title}`);
	};
	return (
		<div>
			<div className="ticket-details">
				<div className="title-info">
					<p
						className="ticket-title"
						onClick={() => routeToQuestion(ticket.title, ticket.id)}
					>
						{" "}
						Question: {ticket.title}
					</p>

					{/* This conditional is to check the current users that is logged in's id , if matches the id of a person that created that specific ticket. If so display the delete button. This make it so that not anyone can delete a ticket */}
					{ticket.created_by.id === loggedInUser().userId && (
						<Mutation mutation={DELETE_MUTATION} update={updateCache}>
							{(deleteMutation) => {
								return (
									<MdDelete
										onClick={(e) => {
											e.preventDefault();
											deleteMutation({ variables: { id: id } });
										}}
									/>
								);
							}}
						</Mutation>
					)}
				</div>

				<p className="ticket-description">{ticket.description}</p>
				<div id="small">
					<p id="category">{ticket.category}</p>
					<p>
						{" "}
						asked: {`${date.toLocaleDateString()}`} by{" "}
						<span> {ticket.created_by.first_name}</span>
					</p>
				</div>
				<small>
					Status:{" "}
					<span
						className="ticket_status"
						onClick={() => {
							const resolve_ticket = {
								display_solve_ticket_modal: true,
								ticket_id: id,
							};

							updateModal({ resolve_ticket });
						}}
						// onMouseOver={() => setSolveTicketInfo(!solveTicketInfo)}
						// onMouseOut={() => setSolveTicketInfo(!solveTicketInfo)}
					>
						{ticket.ticket_status.state === "pending" ? "Unsolved" : "Solved Ticket"}
					</span>
				</small>
				{/* {solveTicketInfo ? (
          <div className="tooltip">Solve this ticket</div>
        ) : null} */}
			</div>
		</div>
	);
}

export default TicketCard;
