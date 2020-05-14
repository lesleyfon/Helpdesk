const db = require("./../data/db.config.js");

class User {
    dbname = "user";


    fetchAllUser(){
        return db(this.dbname)
    }

    async signup(user){

        await  db(this.dbname).insert(user).select("*");
        
        let signup_user = await this.findUser(user);

        return signup_user
    }


    async findUser(filter){
        return db(this.dbname).where(filter).first()
    }
}


module.exports = User