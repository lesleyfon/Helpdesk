import React, { Component } from "react";
import AppContext from "../../Context/AppContext";

export default class SolveTicketModal extends Component {
  static contextType = AppContext;
  state = {
    solution: "",
  };
  render() {
    const { updateModal } = this.context;
    return (
      <div
        className="form-fields-container registration-wrapper"
        style={{
          height: "350px",
        }}
      >
        <div
          id="close"
          onClick={() => {
            const resolve_ticket = {
              display_solve_ticket_modal: false,
            };
            updateModal({ resolve_ticket });
          }}
        >
          Close
        </div>
        <div className="add-ticket-input-container">
          <textarea
            name="Solution"
            type="textarea"
            rows="7"
            value={this.state.solution}
            placeholder="Solution"
            onChange={this.handleChange}
          />

          <div
            className="add-ticket-btn"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {" "}
            Resolve This Ticket
          </div>
        </div>
      </div>
    );
  }
}
