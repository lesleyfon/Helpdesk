import React, { Component } from "react";

//GraphQL
import { Query } from "react-apollo";
import gql from "graphql-tag";
//Styles
import "./Ticket.css";
import TicketCard from "./TicketCard";
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

              return allTickets.map((ticket) => <TicketCard ticket={ticket} />);
            } else {
              return <h1>Data Fetch Failure </h1>;
            }
          }}
        </Query>
      </>
    );
  }
}
