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
      }
    }
  `;

  render() {
    return (
      <div>
        <Query query={this.Ticket_Mutation}>
          {(results) => {
            const { data } = results;

            if (data) {
              const { allTickets } = data;
              return allTickets.map((ticket) => (
                <div key={ticket.id}>
                  <p>{ticket.title}</p>
                  <p>{ticket.description}</p>
                  <p>{`${new Date(Number(ticket.created_at))}`}</p>
                </div>
              ));
            } else {
              return <h1>Data Fetch Failure </h1>;
            }
          }}
        </Query>
      </div>
    );
  }
}
