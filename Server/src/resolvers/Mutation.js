const { user_model } = require("./../models/index");
const { signToken } = require("./../utils/jwt")
const { hashPassword } = require('./../utils/hashpassword')

class Mutations {
  async signup(root, args, context) {

    const hPassword = await hashPassword(args.password);
    
    const {password, ...user} = await user_model.signup({
        first_name: args.first_name,
        last_name: args.last_name,
        phone_number: parseInt(args.phone_number),
        email: args.email,
        password: hPassword
      });

    return {
        token: signToken({userId: user.id, email: user.email}),
        user
    }
  }
}

module.exports = new Mutations();
