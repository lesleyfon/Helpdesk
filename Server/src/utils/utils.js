const { verifyToken } = require("./jwt");
const { user_model } = require("./../models/index");


exports.getUserDetails = async function (context) {

  const Authorization = context.request.get("Authorization");

  if (!Authorization) throw Error("You are not Authorized");

  const token = Authorization.replace("Bearer", "");
  console.log(token)
  const { userId, email } = verifyToken(token);

  const user = await user_model.findUser({ id : userId, email});
  
  if(!user.email || !user.id) throw Error("Invalid User");

  return {
    userId,
    email
  }
};
