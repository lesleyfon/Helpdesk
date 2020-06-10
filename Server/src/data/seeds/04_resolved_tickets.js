exports.seed = async function (knex) {
  await knex("resolved_tickets").insert([
    {
      solution: "to test component you need to mock the redux store",
      ticket_id: "c0456bfc-0038-4b0c-b2c8-433c65b4dae2",
      resolved_by: "4aff829b-168e-4232-87bf-42c79c5e834f",
    },
  ]);
};
