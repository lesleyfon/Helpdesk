import React, { Component } from "react";

//GraphQL
import { Query } from "react-apollo";
import gql from "graphql-tag";
//Styles
import "./Ticket.css";
export default class TicketList extends Component {
  render() {
    // created_by: User!
    // ticket_status: Status!
    const Ticket_Mutation = gql`
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
    return (
      <div>
        <Query query={Ticket_Mutation}>
          {(results) => {
            const { data } = results;
            console.log(data);
            if (data) {
              return <h1>Data fetch Successful</h1>;
            } else {
              return <h1>Data Fetch Failure </h1>;
            }
          }}
        </Query>
      </div>
    );
  }
}
