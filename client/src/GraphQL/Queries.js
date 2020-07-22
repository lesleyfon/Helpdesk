import gql from "graphql-tag";

//Fetch Query
export const GET_TICKETS_QUERY = gql`
	query {
		allTickets {
			id
			title
			description
			category
			created_at
			created_by {
				id
				first_name
				last_name
			}
			ticket_status {
				state
			}
		}
	}
`;

export const RESOLVE_TICKET = gql`
	mutation resolveTicketMutation($solution: String!, $ticket_id: ID!, $solved_by: ID!) {
		solveATicket(solution: $solution, ticket_id: $ticket_id, solved_by: $solved_by) {
			id
			solution
			ticket {
				id
				title
				description
				category
				created_at
			}
			resolved_by {
				id
				email
			}
		}
	}
`;

export const ADD_TICKET_MUTATION = gql`
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
			id
			title
			description
			category
			created_at
			created_by {
				id
				first_name
				last_name
			}
			ticket_status {
				state
			}
		}
	}
`;

export const DELETE_MUTATION = gql`
	mutation Delete_mutation($id: ID!) {
		deleteTicket(id: $id) {
			id
			info
		}
	}
`;
export const USER_QUERY = gql`
	query {
		allUsers {
			id
			first_name
			last_name
			email
			phone_number
		}
	}
`;

export const Get_TICKET_AT_ID = gql`
	query fetchTicketAtMutation($id: String!) {
		fetchTicket(id: $id) {
			id
			title
			description
			category
			created_at
			created_by {
				id
				first_name
				last_name
				email
				phone_number
			}
		}
	}
`;

export const FETCH_TICKET_SOLUTIONS = gql`
	query FetchTicketQuery($id: ID!) {
		ticketSolution(id: $id) {
			solution
			ticket_id
			resolved_by
		}
	}
`;
