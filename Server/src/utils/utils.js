const { verifyToken } = require("./jwt");
const { user_model } = require("./../models/index");

/**
 * @function getUserDetails Utility function for grabbing the user token and verifying if a user is authorized or not
 * @param context request headers gotten from the graphql context
 * @returns {id, email}
 */
exports.getUserDetails = async function (context) {
  const Authorization = context.request.get("Authorization");

  if (!Authorization) throw Error("You are not Authorized");

  const token = Authorization.replace("Bearer", "");

  const { userId, email } = verifyToken(token);

  if (!userId || !email)
    throw new Error(
      `Could not get user id and email from the Token. Please make suer you are setting the correct token userid and email`
    );
  const user = await user_model.findUser({ id: userId, email });

  if (!user.email || !user.id) throw Error("Invalid User");

  return {
    userId,
    email,
  };
};
