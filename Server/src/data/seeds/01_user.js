exports.seed = async function (knex){
    await knex("user").insert([
        {
        first_name: "Lesley",
        last_name: "Lesley",
        phone_number: 555555555,
        email: "Lesley",
        password: "password"
        }
    ])
}