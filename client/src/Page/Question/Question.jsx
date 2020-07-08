import React, { Component } from "react";
import { Query } from "react-apollo";
import { Get_TICKET_AT_ID } from "../../GraphQL/Queries";

class Question extends Component {
	render() {
		const {
			location: { pathname },
		} = this.props;

		const [_, __, id, title] = pathname.split("/");
		return (
			<main>
				<div className="Ticket ">
					<Query query={Get_TICKET_AT_ID} variables={{ id: id }}>
						{({ loading, error, data }) => {
							console.log(data);
							return <h1>Hello World</h1>;
						}}
					</Query>
				</div>
			</main>
		);
	}
}

export default Question;
