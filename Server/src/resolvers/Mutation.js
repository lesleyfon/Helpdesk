const { user_model, ticket_model } = require("./../models/index");
const { signToken } = require("./../utils/jwt");
const { hashPassword, verifyPassword } = require("./../utils/hashpassword");

class Mutations {


  async signup(root, args, context) {

    const checkIfUserExist = await user_model.findUser({ email: args.email });
    if(checkIfUserExist) throw Error(`User with email ${args.email} already exist. Try a different email`)

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

    if (!user) throw Error(`User with the email of ${args.email} doesn't exist`);

    const comparePassword = await verifyPassword(args.password, password);

    if (!comparePassword) throw Error(`Invalid password`);

    return {
      token: signToken({ userId: user.id, email: user.email }),
      user,
    };
  }


  async addTicket(root, args, context){
    const ticket  = await ticket_model.createTicket(args);

    return ticket;

  }
}

module.exports = new Mutations();
