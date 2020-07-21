// Module for exporting all the resolvers
const {
	allUsers,
	welcome,
	allTickets,
	fetchTicket,
	allTicketStatus,
	allResolvedTickets,
	ticketStatus,
	ticketSolution,
} = require("./Query");

const {
	signup,
	login,
	addTicket,
	solveATicket,
	deleteTicket,
	updateTicket,
} = require("./Mutation");

module.exports = {
	Query: {
		welcome,
		allUsers,
		allTickets,
		fetchTicket,
		allTicketStatus,
		allResolvedTickets,
		ticketStatus,
		ticketSolution,
	},

	Mutation: {
		signup,
		login,
		addTicket,
		solveATicket,
		deleteTicket,
		updateTicket,
	},
};
