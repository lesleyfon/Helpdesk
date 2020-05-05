exports.seed = async knex => {
    await knex("ticket").insert([
        {
            title: "Front end Test/ Test Failing ",
            description: "font end test failing after mocking redux store and react router dom",
            category: "FrontEnd test",
            
        }
    ])
 }