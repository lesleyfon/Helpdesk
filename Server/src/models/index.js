// File for exporting all the models
const UserModel = require("./User");
const TicketModel = require("./Tickets");

module.exports = {
	user_model: new UserModel(),
	ticket_model: new TicketModel(),
};
