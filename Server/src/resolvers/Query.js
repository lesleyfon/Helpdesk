const { user_model, ticket_model } = require('./../models/index');
const { getUserDetails } = require("./../utils/utils");

class Query{

    welcome(){
        return "Welcome to Help Desk"
    }
     async allUsers () {
        return await user_model.fetchAllUser()
    }

    async allTickets(root, args, context){
        const userDetails = await getUserDetails(context);

        return await ticket_model.fetchAllTickets();
    }
}


module.exports = new Query();