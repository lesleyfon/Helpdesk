const db = require('./../data/db.config')


class Tickets {

    dbname = 'ticket'

    fetchAllTickets(){
        return db(this.dbname);
    }
}


module.exports = Tickets