const { user_model, ticket_model } = require('./../models/index');
const { getUserDetails: AuthUser } = require("./../utils/utils");

class Query{

    /**
     * Test Query: 
     */
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

        return allStatus;
    }


    async allResolvedTickets(root, args, context){
        await AuthUser(context);

        const resolvedTicketsInfo = await ticket_model.resolvedTickets();

        return resolvedTicketsInfo.map(async info => ({
            id: info.id,
            solution: info.solution,
            ticket: await ticket_model.findTicket({id: info.ticket_id}),
            resolved_by: await user_model.findUser({id: info.resolved_by})
        }))
    }

    async ticketStatus(root, args, context){
        await AuthUser(context);
        const {ticket_id } = args;

        const {id, state, ...ticket} = await ticket_model.ticketStatus(ticket_id);

        return {
            id,
            state,
            ticket
        };
    }


}


module.exports = new Query();