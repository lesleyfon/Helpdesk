const jwt = require("jsonwebtoken");
const JWT_SECRETE = "273146745YJFMJDABFLJKUSHGDFLNB";

/**
 *
 * @param {token} userInfo token to be verified and converted to userId and email
 */
function verifyToken(userInfo) {
  return jwt.verify(userInfo, JWT_SECRETE);
}

function signToken({ userId, email }) {
  return jwt.sign({ userId, email }, JWT_SECRETE, {
    expiresIn: "7 days",
  });
}

module.exports = {
  signToken,
  JWT_SECRETE,
  verifyToken,
};
