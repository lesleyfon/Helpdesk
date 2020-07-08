const { user_model, ticket_model } = require("./../models/index");
const { getUserDetails: AuthUser } = require("./../utils/utils");
const db = require("./../data/db.config");
class Query {
	/**
	 * Test Query:
	 */
	welcome() {
		return "Welcome to Help Desk";
	}
	async allUsers(root, args, context) {
		await AuthUser(context);
		try {
			const allUsers = await user_model.fetchAllUser();

			return allUsers;
		} catch (error) {
			throw new Error({
				message: "Server Error",
				error,
			});
		}
	}

	async allTickets(root, args, context) {
		await AuthUser(context);
		//Fetch all tickets
		const tickets = await ticket_model.fetchAllTickets();

		//Return tickets
		try {
			return tickets.map(async (ticket) => {
				const status = await db("ticket_status").where("ticket_id", ticket.id).first();
				return {
					...ticket,
					// Fetch user based on the person that created a ticket
					created_by: await user_model.findUser({ id: ticket.created_by }),
					ticket_status: {
						...status,
					},
				};
			});
		} catch (error) {
			throw new Error({
				message: "Server Error",
				error,
			});
		}
	}

	async fetchTicket(root, args, context) {
		await AuthUser(context);

		const { created_by, ...ticket } = await ticket_model.findTicket({
			id: args.id,
		});

		const user = await user_model.findUser({ id: created_by });

		return {
			...ticket,
			created_by: {
				...user,
			},
		};
	}

	// Ticket Status
	async allTicketStatus(root, args, context) {
		await AuthUser(context);
		const allStatus = await ticket_model.allTicketStatus();

		return allStatus;
	}

	//all tickets that have been resolved
	async allResolvedTickets(root, args, context) {
		await AuthUser(context);

		const resolvedTicketsInfo = await ticket_model.resolvedTickets();

		return resolvedTicketsInfo.map(async (info) => ({
			id: info.id,
			solution: info.solution,
			ticket: await ticket_model.findTicket({ id: info.ticket_id }),
			resolved_by: await user_model.findUser({ id: info.resolved_by }),
		}));
	}

	// Query a specific ticket status
	async ticketStatus(root, args, context) {
		await AuthUser(context);
		const { ticket_id } = args;

		const { id, state, ...ticket } = await ticket_model.ticketStatus(ticket_id);

		return {
			id,
			state,
			ticket,
		};
	}
}

module.exports = new Query();
