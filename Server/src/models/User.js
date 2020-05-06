const db = require("./../data/db.config.js");

class User {
    dbname = "user";


    fetchAllUser(){
        return db(this.dbname)
    }
}


module.exports = User