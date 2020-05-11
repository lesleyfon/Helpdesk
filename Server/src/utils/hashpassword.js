
const bcryptjs = require("bcryptjs");

exports.hashPassword = async function(password){
    return await bcryptjs.hash(password, 12);
}

/**
 * Check is password is valid.
 * @param {password} password = Password user is trying to signup with
 * @param {hash} hash = Password that was saved in the database when the user signup. This password was hash with the @hashPassword utility function
 * 
 */
exports.verifyPassword = async function(password, hash){
    return await bcryptjs.compareSync(password, hash)
}