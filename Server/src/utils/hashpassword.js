
const bcryptjs = require("bcryptjs");

exports.hashPassword = async function(password){
    return await bcryptjs.hash(password, 12);
}