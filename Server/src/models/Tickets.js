const db = require("./../data/db.config");

class Tickets {
  tableName = "ticket";

  //Find all tickets
  fetchAllTickets() {
    return db(this.tableName);
  }

  //Add a new ticket to the database
  async createTicket(ticket) {
    await db(this.tableName).insert(ticket);

    const newTicket = await this.findTicket({ title: ticket.title });
    // Create a status for a ticket when  a ticket is created
    const status = await db("ticket-status").insert({
      ticket_id: newTicket.id,
    });

    return newTicket;
  }

  // find ticket based on what is passed in as filter
  async findTicket(filter) {
    return db(this.tableName).where(filter).first();
  }

  //returns all the tickets Status
  async allTicketStatus() {
    return db("ticket-status");
  }

  // Returns all tickets that have been resolved
  resolvedTickets() {
    return db("resolved-tickets");
  }

  // Returns a specific status for a specific ticket using the ticket ids
  async ticketStatus(ticket_id) {
    const ticket = await db(this.tableName)
      .join(`ticket-status`, `ticket-status.ticket_id`, `${this.tableName}.id`)
      .where(`ticket-status.ticket_id`, ticket_id)
      .first();

    return ticket;
  }

  // Method for solving a ticket, It Updates a ticket status from pending(default) to solved, which means a ticket has been solved
  async solveTicket({ solution, ticket_id, solved_by }) {
    await db("ticket-status")
      .where({ ticket_id })
      .update({ state: "solved" })
      .returning("*");

    const [ticketSolution] = await db("resolved-tickets")
      .where({ ticket_id })
      .update({
        solution,
        resolved_by: solved_by,
        ticket_id,
      })
      .returning("*");

    const ticket = this.findTicket({ id: ticketSolution.ticket_id });
    const resolved_by = db("user")
      .where({ id: ticketSolution.resolved_by })
      .first();

    return {
      id: ticketSolution.id,
      solution: ticketSolution.solution,
      ticket,
      resolved_by,
    };
  }
}

module.exports = Tickets;
