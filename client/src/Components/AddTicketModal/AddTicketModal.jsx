import React, { Component } from "react";
import AppContext from "../../Context/AppContext";

// GraphQL
import { Mutation } from "react-apollo";
import { ADD_TICKET_MUTATION } from "./../../GraphQL/Queries";
//Styles
import "./AddTicket.css";
import { AUTH_TOKEN } from "../../constants";

export default class AddTicketModal extends Component {
  static contextType = AppContext;
  state = {
    title: "",
    description: "",
    category: "",
    error: {
      status: false,
      message: "",
    },
  };

  // title: String!
  //   description: String!
  //   category: String
  //   created_by: String
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  //graphql Mutation

  render() {
    // Destructure updateNodal from the context
    const { updateModal } = this.context;

    const {
      title,
      description,
      category,
      error: { status, message },
    } = this.state;

    return (
      <Mutation
        mutation={ADD_TICKET_MUTATION}
        variables={{
          title,
          description,
          category,
          created_by: localStorage.getItem(AUTH_TOKEN),
        }}
        onCompleted={(data) => {
          const { addTicket } = data;
          if (addTicket.title) {
            updateModal(false);
          }
        }}
        onError={(err) => {
          this.setState({
            error: {
              message: err.message.split("Error:")[1],
              status: !status,
            },
          });
        }}
      >
        {(mutation) => {
          return (
            <div className="form-fields-container registration-wrapper">
              <div
                id="close"
                onClick={() => {
                  updateModal(false);
                }}
              >
                Close
              </div>
              <div className="add-ticket-input-container">
                <input
                  type="text"
                  name="title"
                  value={title}
                  placeholder="Title"
                  autoComplete="off"
                  onChange={this.handleChange}
                />
                <input
                  type="text"
                  name="category"
                  value={category}
                  placeholder="category"
                  onChange={this.handleChange}
                />
                <textarea
                  name="description"
                  type="textarea"
                  rows="5"
                  value={description}
                  placeholder="description"
                  onChange={this.handleChange}
                />

                <div className="add-ticket-btn" onClick={mutation}>
                  {" "}
                  Add A Ticket
                </div>
              </div>

              {status ? <p>{message}</p> : ""}
            </div>
          );
        }}
      </Mutation>
    );
  }
}
