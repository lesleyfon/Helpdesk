const { user } = require('./../models/index');

class Query{

    welcome(){
        console.log("hello")
        return "Welcome to Help Desk"
    }
     async allUsers () {
        return await user.fetchAllUser()
    }
}


module.exports = new Query();