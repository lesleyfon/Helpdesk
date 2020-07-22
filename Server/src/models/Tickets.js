const db = require("./../data/db.config");

class Tickets {
	constructor() {
		this.tableName = "ticket";
	}

	//Find all tickets
	fetchAllTickets() {
		return db(this.tableName);
	}

	//Add a new ticket to the database
	async createTicket(ticket) {
		try {
			await db(this.tableName).insert(ticket);

			const newTicket = await this.findTicket({ title: ticket.title });

			// Create a status for a ticket when  a ticket is created
			const [status] = await db("ticket_status")
				.insert({
					ticket_id: newTicket.id,
				})
				.returning("*");

			const [created_by] = await db("user").where({
				id: ticket.created_by,
			});

			return {
				...newTicket,
				created_by,
				ticket_status: status,
			};
		} catch (error) {
			throw new Error({
				message: error.message,
			});
		}
	}

	// find ticket based on what is passed in as filter
	async findTicket(filter) {
		return db(this.tableName).where(filter).first();
	}

	//returns all the tickets Status
	async allTicketStatus() {
		return db("ticket_status");
	}

	// Returns all tickets that have been resolved
	resolvedTickets() {
		return db("resolved_tickets");
	}

	// Returns a specific status for a specific ticket using the ticket ids
	async ticketStatus(ticket_id) {
		const ticket = await db(this.tableName)
			.join(`ticket_status`, `ticket_status.ticket_id`, `${this.tableName}.id`)
			.where(`ticket_status.ticket_id`, ticket_id)
			.first();

		return ticket;
	}

	// Method for solving a ticket, It Updates a ticket status from pending(default) to solved, which means a ticket has been solved
	async solveTicket({ solution, ticket_id, solved_by }) {
		try {
			// Ticket To Be updated
			const ttbu = await db("ticket_status").where({ ticket_id: ticket_id }).first();

			//Update ticket
			await db("ticket_status")
				.where({ ticket_id: ticket_id })
				.update({ ...ttbu, state: "solved" })
				.returning("*");

			/**
			 * Do you want a ticket to have multiple solutions?
			 * OR do you want a ticket to have just one solution?
			 *
			 * Answer:
			 *  Multiple solutions so that different users can give different answers to a questions
			 */
			const [ticketSolution] = await db("resolved_tickets")
				.insert({
					solution,
					resolved_by: solved_by,
					ticket_id,
				})
				.returning("*");

			const ticket = await this.findTicket({ id: ticketSolution.ticket_id });

			const resolved_by = await db("user").where({ id: ticketSolution.resolved_by }).first();

			console.log(ticketSolution);
			console.log(ticket);
			console.log(resolved_by);
			return {
				id: ticketSolution.id,
				solution: ticketSolution.solution,
				ticket,
				resolved_by,
			};
		} catch (error) {
			console.log(error);
			throw new Error({
				message: error.message,
			});
		}
	}

	//Model to Delete a ticket
	async deleteTicket(id) {
		const ticketToDelete = await this.findTicket(id);
		if (!ticketToDelete) throw new Error(`Ticket with the id of ${id.id} does not exist`);

		const ticket = await db(this.tableName).where(id).del();
		return ticket;
	}

	async updateTicket(ticket) {
		if (!ticket.id) throw new Error(`Ticket Id is needed to update a ticket`);

		const [updatedTicket] = await db(this.tableName)
			.where({ id: ticket.id })
			.update(ticket)
			.returning("*");

		return updatedTicket;
	}

	async fetchTicketSolution(ticket_id) {
		try {
			const ticket = await this.findTicket({ id: ticket_id });

			// Throw error is we want find a ticket with the id passed into this method
			if (!ticket) {
				throw Error(`Couldn't find ticket with ID:${ticket_id}`);
			}

			const ticketSolution = await db("resolved_tickets").where("ticket_id", ticket_id);
			return ticketSolution;
		} catch (error) {
			// Error Handling
			const { message, ...msgError } = error;

			throw Error({
				message: message,
				msgError,
			});
		}
	}
}

module.exports = Tickets;
