import React from "react";

function TicketCard({ ticket }) {
  const date = new Date(Number(ticket.created_at));

  return (
    <div>
      <div key={ticket.id} className="ticket-details">
        <p className="ticket-title"> Question: {ticket.title}</p>
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
