const { user_model, ticket_model } = require("./../models/index");
const { signToken, verifyToken } = require("./../utils/jwt");
const { getUserDetails } = require("./../utils/utils");
const { hashPassword, verifyPassword } = require("./../utils/hashpassword");

class Mutations {
  async signup(root, args, context) {
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
  async login(root, args, context) {
    const { password, ...user } = await user_model.findUser({
      email: args.email,
    });

    if (!user)
      throw Error(`User with the email of ${args.email} doesn't exist`);

    const comparePassword = await verifyPassword(args.password, password);

    if (!comparePassword) throw Error(`Invalid password`);

    return {
      token: signToken({ userId: user.id, email: user.email }),
      user,
    };
  }

  // Creating a new ticket
  async addTicket(root, args, context) {
    const { userId } = await getUserDetails(context);

    const ticket = await ticket_model.createTicket({
      ...args,
      user_id: userId,
    });

    return ticket;
  }

  async solveATicket(root, args, context) {
    const { solution, ticket_id, solved_by } = args;

    const resolvedTicket = await ticket_model.solveTicket({
      solution,
      ticket_id,
      solved_by,
    });

    return resolvedTicket;
  }
}

module.exports = new Mutations();
