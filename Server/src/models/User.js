const db = require("./../data/db.config.js");
const { hashPassword } = require('./../utils/hashpassword')

class User {
    dbname = "user";


    fetchAllUser(){
        return db(this.dbname)
    }

    async signup(user){
        const password = await hashPassword(user.password);
        user.password = password;

        await  db(this.dbname).insert(user).select("*");
        let signup_user = await this.findUser(user);
        
        return signup_user
    }

    async findUser(filter){
        return db(this.dbname).where(filter).first()
    }
}


module.exports = User