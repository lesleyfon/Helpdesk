import React, { Component } from "react";

//GraphQL
import { Query } from "react-apollo";
import gql from "graphql-tag";
//Styles
import "./Ticket.css";
export default class TicketList extends Component {
  //Fetch Query
  Ticket_Mutation = gql`
    query {
      allTickets {
        id
        title
        description
        category
        created_at
        created_by {
          first_name
          last_name
        }
      }
    }
  `;

  render() {
    return (
      <>
        <Query query={this.Ticket_Mutation}>
          {(results) => {
            const { data } = results;

            if (data) {
              const { allTickets } = data;

              return allTickets.map((ticket) => {
                const date = new Date(Number(ticket.created_at));

                return (
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
                );
              });
            } else {
              return <h1>Data Fetch Failure </h1>;
            }
          }}
        </Query>
      </>
    );
  }
}
