// Module for exporting all the resolvers
const {allUsers, welcome, allTickets, fetchTicket } = require("./Query");
const { signup, login, addTicket } = require('./Mutation');

module.exports= {
    Query : {
        welcome,
        allUsers,
        allTickets,
        fetchTicket
    },

    Mutation : {
        signup,
        login, 
        addTicket
    }
}
