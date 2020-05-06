const db = require("./../data/db.config.js");

class User {
    name = "users";


    fetchAllUser(){
        return db("user")
    }
}


module.exports = User