const { user_model } = require("./../models/index");

class Mutations {
  async signup(root, args, context) {

    const user = {
      first_name: args.first_name,
      last_name: args.last_name,
      phone_number: parseInt(args.phone_number),
      email: args.email,
      password: args.password,
    };
    return await user_model.signup(user);
  }
}

module.exports = new Mutations();
