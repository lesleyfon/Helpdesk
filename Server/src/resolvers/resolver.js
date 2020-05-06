// Module for exporting all the resolvers
const {allUsers, welcome, allTickets } = require("./Query")


module.exports= {
    Query : {
        welcome,
        allUsers,
        allTickets,
    }
}
