// Module for exporting all the resolvers
const {allUsers, welcome } = require("./Query")


module.exports= {
    Query : {
        welcome,
        allUsers
    }
}
