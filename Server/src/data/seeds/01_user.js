exports.seed = async function (knex) {
  await knex("user").insert([
    {
      id: "92783295-eae2-4f6b-b434-25127243da6c",
      first_name: "Lesley",
      last_name: "Lesley",
      phone_number: 555555555,
      email: "Lesley",
      password: "password",
    },
  ]);
};