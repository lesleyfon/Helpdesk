const { user_model, ticket_model } = require("./../models/index");
const { signToken } = require("./../utils/jwt");
const { getUserDetails } = require("./../utils/utils");
const { hashPassword, verifyPassword } = require("./../utils/hashpassword");

class Mutations {
  async signup(_, args, context) {
    if (!args.first_name || !args.last_name || !args.email || !args.password)
      throw new Error("Please provide all necessary information to SignUp");

    const checkIfUserExist = await user_model.findUser({ email: args.email });

    if (checkIfUserExist)
      throw Error(
        `User with email ${args.email} already exist. Try a different email`
      );

    const hPassword = await hashPassword(args.password);

    const { password, ...user } = await user_model.signup({
      first_name: args.first_name,
      last_name: args.last_name,
      phone_number: parseInt(args.phone_number),
      email: args.email,
      password: hPassword,
    });

    return {
      token: signToken({ userId: user.id, email: user.email }),
      user,
    };
  }

  /**
   *
   * @param {*} root = Read's the parent
   * @param {*} args =  It carries the arguments for the operation
   * @param {*} context = The context argument is a plain JavaScript object that every resolver in the resolver chain can read from and write to - it thus basically is a means for resolvers to communicate.
   */
  async login(_, args, context) {
    if (!args.email || !args.password)
      throw new Error("Please provide and email and a password");

    const dbUser = await user_model.findUser({
      email: args.email,
    });

    if (!dbUser)
      throw Error(`User with the email of ${args.email} doesn't exist`);

    const { password, ...user } = dbUser;

    const comparePassword = await verifyPassword(args.password, password);

    if (!comparePassword) throw Error(`Invalid password`);

    return {
      token: signToken({ userId: user.id, email: user.email }),
      user,
    };
  }

  // Creating a new ticket
  async addTicket(root, args, context) {
    try {
      const { title, description, category } = args;
      const { userId } = await getUserDetails(context);

      if (!title || !description || !category) {
        throw new Error(
          "Please Make sure you are filling all the fields to add a new ticket"
        );
      }

      const ticket = await ticket_model.createTicket({
        title,
        description,
        category,
        created_by: userId,
      });

      return ticket;
    } catch (error) {
      throw new Error(error);
    }
  }

  async solveATicket(root, args, context) {
    const { userId } = await getUserDetails(context);

    const { solution, ticket_id } = args;

    const resolvedTicket = await ticket_model.solveTicket({
      solution,
      ticket_id,
      solved_by: userId,
    });

    return resolvedTicket;
  }

  async deleteTicket(_, args, context) {
    await getUserDetails(context);
    if (!args.id) {
      throw Error(`Please provide Id to be able to delete a ticket `);
    }
    const deletedTicket = await ticket_model.deleteTicket(args);

    if (!deletedTicket)
      throw new Error(`Ticket with id of ${args.id} has already been deleted`);

    return {
      id: args.id,
      info: `Ticket with the ID of ${args} has been deleted`,
    };
  }

  async updateTicket(root, args, context) {
    await getUserDetails(context);
    const updatedTicket = await ticket_model.updateTicket(args);

    return updatedTicket;
  }
}

module.exports = new Mutations();
