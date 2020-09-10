exports.seed = async function (knex) {
	await knex("user").insert([
		{
			id: "6846bf46-c568-4abc-a89a-686d46437f2a",
			first_name: "Lesley",
			last_name: "Lesley",
			phone_number: 555555555,
			email: "lesley@gmail.com",
			password: "password",
		},
		{
			id: "4aff829b-168e-4232-87bf-42c79c5e834f",
			first_name: "Joseph",
			last_name: "Claude",
			phone_number: "4152403839",
			email: "Joseph.claude@yahoo.com",
			password: "password",
		},
	]);
};
