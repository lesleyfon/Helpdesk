exports.seed = async function (knex) {
	await knex("ticket_status").insert([
		{
			state: "pending",
			ticket_id: "c0456bfc-0038-4b0c-b2c8-433c65b4dae2",
		},
	]);
};
