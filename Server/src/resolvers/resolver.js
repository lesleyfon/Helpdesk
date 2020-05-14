// Module for exporting all the resolvers
const {allUsers, welcome, allTickets, fetchTicket, allTicketStatus } = require("./Query");
const { signup, login, addTicket } = require('./Mutation');

module.exports= {
    Query : {
        welcome,
        allUsers,
        allTickets,
        fetchTicket,
        allTicketStatus
    },

    Mutation : {
        signup,
        login, 
        addTicket
    }
}
