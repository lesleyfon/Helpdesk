const db = require("./../data/db.config.js");

class User {
    name = "users";


    fetchAllUser(){
        return db("users")
    }
}


module.exports = User