const db = require('./../data/db.config')


class Tickets {

    dbname = 'ticket'

    fetchAllTickets(){
        return db(this.dbname);
    }

    async createTicket(ticket){
         await db(this.dbname).insert(ticket)
         const newTicket = await this.findTicket({title: ticket.title})
        return newTicket
    }

    async findTicket(filter){
        return db(this.dbname).where(filter).first();
    }
}


module.exports = Tickets