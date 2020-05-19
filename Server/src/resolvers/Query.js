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

    async fetchTicket(root, args, context ){
        await AuthUser(context);

        const {user_id, ...ticket} = await ticket_model.findTicket({id: args.id});

        const user = await user_model.findUser({id: user_id});

        return {
            ...ticket,
            created_by: {
                ...user
            }
        };
    }

    async allTicketStatus(root, args, context){
        await AuthUser(context);
        const allStatus = await ticket_model.allTicketStatus();
        console.log(allStatus);
        return allStatus;
    }


    async allResolvedTickets(root, args, context){
        await AuthUser(context);
        const resolvedTickets= await ticket_model.resolvedTickets();
        
        return resolvedTickets
    }
}


module.exports = new Query();