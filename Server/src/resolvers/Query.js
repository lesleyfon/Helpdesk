const { user_model, ticket_model } = require('./../models/index');
const { getUserDetails: AuthUser } = require("./../utils/utils");

class Query{

    welcome(){
        return "Welcome to Help Desk"
    }
     async allUsers (root, args, context) {
        await AuthUser(context);
        return await user_model.fetchAllUser()
    }

    async allTickets(root, args, context){
        
        await AuthUser(context);
    
        return await ticket_model.fetchAllTickets();
    }
}


module.exports = new Query();