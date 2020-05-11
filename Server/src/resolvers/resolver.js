// Module for exporting all the resolvers
const {allUsers, welcome, allTickets } = require("./Query");
const { signup, login, addTicket } = require('./Mutation');

module.exports= {
    Query : {
        welcome,
        allUsers,
        allTickets,
    },

    Mutation : {
        signup,
        login, 
        addTicket
    }
}
