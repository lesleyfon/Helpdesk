const jwt = require("jsonwebtoken")
const JWT_SECRETE=  "273146745YJFMJDABFLJKUSHGDFLNB";

 function verifyToken (){

}


function signToken ({userId, email}){
    return  jwt.sign({userId, email}, JWT_SECRETE, {
        expiresIn: "7 days",
    })
}

module.exports = {
    signToken,
    JWT_SECRETE,
}