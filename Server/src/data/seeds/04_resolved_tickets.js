exports.seed = async function (knex) {
  await knex("resolved-tickets").insert([
    {
      solution: "to test component you need to mock the redux store",
      ticket_id:"c0456bfc-0038-4b0c-b2c8-433c65b4dae2",
      resolved_by: "92783295-eae2-4f6b-b434-25127243da6c",
      
    },
  ]);
};
