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

              return (
                <div className="ticket-section">
                  <div className="search-nav">
                    <div className="search-header">
                      <h3>Search Results</h3>
                      <h5 className="question-btn">Ask A Question</h5>
                    </div>
                    <div className="form-div">
                      <input
                        className="search-input-fields"
                        type="text"
                        name="search_ticket"
                        placeholder="Search a Ticket"
                      />
                      <div>Search</div>
                    </div>
                  </div>

                  {allTickets.map((ticket) => (
                    <TicketCard ticket={ticket} />
                  ))}
                </div>
              );
            } else {
              return <h1>Data Fetch Failure </h1>;
            }
          }}
        </Query>
      </>
    );
  }
}
