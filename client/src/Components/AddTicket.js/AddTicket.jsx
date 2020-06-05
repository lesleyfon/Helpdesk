import React, { Component } from "react";
import AppContext from "./../../Context/AppContext";
import "./AddTicket.css";

export default class AddTicket extends Component {
  static contextType = AppContext;
  state = {
    title: "",
    description: "",
    category: "",
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
  render() {
    const { updateModal } = this.context;
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
        <input
          type="text"
          name="title"
          value={this.state.title}
          placeholder=""
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="description"
          value={this.state.description}
          placeholder="description"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="category"
          value={this.state.category}
          placeholder="category"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
