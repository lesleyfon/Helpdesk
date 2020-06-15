import React, { Component } from "react";
import AppContext from "../../Context/AppContext";

export default class SolveTicketModal extends Component {
  static contextType = AppContext;

  render() {
    const { updateModal } = this.context;
    return <div> Solve this ticket</div>;
  }
}
