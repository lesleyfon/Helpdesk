// Module for exporting all the resolvers
const {allUsers, welcome, allTickets } = require("./Query");
const { signup } = require('./Mutation');

console.log("hello")
module.exports= {
    Query : {
        welcome,
        allUsers,
        allTickets,
    },

    Mutation : {
        signup,
    }
}
