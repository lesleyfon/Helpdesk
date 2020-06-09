import React from "react";
import { MdDelete } from "react-icons/md";
import { Mutation } from "react-apollo";
import { DELETE_MUTATION, GET_TICKETS_QUERY } from "./../../GraphQL/Queries";

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

  return (
    <div>
      <div className="ticket-details">
        <div className="title-info">
          <p className="ticket-title"> Question: {ticket.title}</p>
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
      </div>
    </div>
  );
}

export default TicketCard;
