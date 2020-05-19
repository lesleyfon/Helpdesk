// Module for exporting all the resolvers
const {allUsers, welcome, allTickets, fetchTicket, allTicketStatus, allResolvedTickets } = require("./Query");
const { signup, login, addTicket } = require('./Mutation');

module.exports= {
    Query : {
        welcome,
        allUsers,
        allTickets,
        fetchTicket,
        allTicketStatus,
        allResolvedTickets
    },

    Mutation : {
        signup,
        login, 
        addTicket

    }
}
