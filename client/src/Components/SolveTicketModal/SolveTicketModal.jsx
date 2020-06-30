import React, { Component } from "react";
import AppContext from "../../Context/AppContext";
import { Mutation } from "react-apollo";
import { RESOLVE_TICKET } from "./../../GraphQL/Queries";
import { AUTH_TOKEN } from "../../constants";
export default class SolveTicketModal extends Component {
	static contextType = AppContext;
	state = {
		solution: "",
		error: {
			status: false,
			message: "",
		},
	};

	//Reset the form Fields state for errors
	_resetState() {
		this.setState({
			solution: "",
			error: {
				status: false,
				message: "",
			},
		});
	}
	render() {
		const { updateModal, resolve_ticket } = this.context;

		return (
			<Mutation
				mutation={RESOLVE_TICKET}
				onCompleted={(data) => {
					const resolve_ticket = {
						display_solve_ticket_modal: false,
					};
					updateModal({ resolve_ticket });
				}}
				onError={(err) => {
					console.log(err);
				}}
			>
				{(mutation) => {
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
									this._resetState();
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
									onChange={(event) => this.setState({ solution: event.target.value })}
								/>

								{/* Is there is an error */}
								{this.state.error.status ? (
									<p className="error-msg">{this.state.error.message}</p>
								) : null}

								<div
									className="add-ticket-btn"
									onClick={() => {
										// PRevent submitting an empty form textarea
										if (this.state.solution.length === 0) {
											this.setState({
												error: { status: true, message: "Can't submit an empty Form" },
											});
										}

										// Check is have typed in something for the solution and if theres a ticket id to be resolved
										if (resolve_ticket.ticket_id && this.state.solution) {
											mutation({
												variables: {
													solution: this.state.solution,
													ticket_id: resolve_ticket.ticket_id,
													solved_by: localStorage.getItem(AUTH_TOKEN),
												},
											});

											this._resetState();
										}
									}}
								>
									{" "}
									Resolve This Ticket a third ticket
								</div>
							</div>
						</div>
					);
				}}
			</Mutation>
		);
	}
}
