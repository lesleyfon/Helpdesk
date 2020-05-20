// Module for exporting all the resolvers
const {allUsers, welcome, allTickets, fetchTicket, allTicketStatus, allResolvedTickets, ticketStatus } = require("./Query");
const { signup, login, addTicket } = require('./Mutation');

module.exports= {
    Query : {
        welcome,
        allUsers,
        allTickets,
        fetchTicket,
        allTicketStatus,
        allResolvedTickets,
        ticketStatus
    },

    Mutation : {
        signup,
        login, 
        addTicket

    }
}
