exports.seed = async knex => {
    await knex("ticket").insert([
        {
            id:  "c0456bfc-0038-4b0c-b2c8-433c65b4dae2",
            title: "Front end Test/ Test Failing ",
            description: "font end test failing after mocking redux store and react router dom",
            category: "FrontEnd test",
            [`created_by`]: "6846bf46-c568-4abc-a89a-686d46437f2a",
            
        }
    ])
 }