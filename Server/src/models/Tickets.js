const db = require("./../data/db.config");

class Tickets {
  tableName = "ticket";

  fetchAllTickets() {
    return db(this.tableName);
  }

  async createTicket(ticket) {
    await db(this.tableName).insert(ticket);
    const newTicket = await this.findTicket({ title: ticket.title });
    return newTicket;
  }

  async findTicket(filter) {
    return db(this.tableName).where(filter).first();
  }

  async allTicketStatus() {
    return db("ticket-status");
  }
  resolvedTickets() {
    return db("resolved-tickets");
  }
  async ticketStatus(ticket_id) {
    const ticket = await db(this.tableName).join(
      `ticket-status`,
      `ticket-status.ticket_id`,
      `${this.tableName}.id`
    ).where(
        `ticket-status.ticket_id`, ticket_id
    ).first();

    return ticket;
  }
}

module.exports = Tickets;
