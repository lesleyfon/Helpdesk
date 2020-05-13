const db = require('./../data/db.config')


class Tickets {

    tableName = 'ticket'

    fetchAllTickets(){
        return db(this.tableName);
    }

    async createTicket(ticket){
         await db(this.tableName).insert(ticket)
         const newTicket = await this.findTicket({title: ticket.title})
        return newTicket
    }

    async findTicket(filter){
        return db(this.tableName).where(filter).first();
    }

    async allTicketStatus(){
       return db("ticket-status")
    }
}


module.exports = Tickets