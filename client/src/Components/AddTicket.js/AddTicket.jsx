import React, { Component } from "react";
import AppContext from "./../../Context/AppContext";

// GraphQL
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

//Styles
import "./AddTicket.css";
import { AUTH_TOKEN } from "../../constants";

export default class AddTicket extends Component {
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
  ADD_TICKET_MUTATION = gql`
    mutation Add_mutation(
      $title: String!
      $description: String!
      $category: String
      $created_by: String
    ) {
      addTicket(
        title: $title
        description: $description
        category: $category
        created_by: $created_by
      ) {
        title
      }
    }
  `;
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
        mutation={this.ADD_TICKET_MUTATION}
        variables={{
          title,
          description,
          category,
          created_by: localStorage.getItem(AUTH_TOKEN),
        }}
        onCompleted={(data) => {
          console.log(data);
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
                  console.log(updateModal);
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
