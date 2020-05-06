const { user_model, ticket_model } = require('./../models/index');

class Query{

    welcome(){
        return "Welcome to Help Desk"
    }
     async allUsers () {
        return await user_model.fetchAllUser()
    }

    async allTickets(){
        console.log("await ticket_model.fetchAllTickets()")
        return await ticket_model.fetchAllTickets();
    }
}


module.exports = new Query();