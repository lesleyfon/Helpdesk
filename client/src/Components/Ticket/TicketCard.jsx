import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";
function TicketCard({ ticket }) {
  //Format the ticket Date to a readable String
  const date = new Date(Number(ticket.created_at));

  //Destructure the ticket id from the ticket props object
  const { id } = ticket;

  const history = useHistory();
  const DELETE_MUTATION = gql`
    mutation Delete_mutation($id: ID!) {
      deleteTicket(id: $id) {
        id
        info
      }
    }
  `;

  return (
    <div>
      <div className="ticket-details">
        <div className="title-info">
          <p className="ticket-title"> Question: {ticket.title}</p>
          <Mutation
            mutation={DELETE_MUTATION}
            variables={{ id: id }}
            onCompleted={(data) => {
              if (data.deleteTicket.id) {
                history.push("/home");
                console.log(data.deleteTicket);
              }
            }}
          >
            {(mutation) => {
              return <MdDelete onClick={mutation} />;
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
