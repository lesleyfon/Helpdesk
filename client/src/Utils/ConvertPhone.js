import jwt from "jsonwebtoken";
import { AUTH_TOKEN } from "../constants";

const { REACT_APP_JWT_SECRETE } = process.env;
export const formatNumber = function (telNumber) {
	let str = telNumber.split("").splice(6, 10);
	str.unshift("******");
	str = str.join("");

	return str;
};

// This Utils functions get a logged in users email and id from the token

export const loggedInUser = () => {
	// Hide  the secrete in an env file
	const { userId, email } = jwt.verify(localStorage.getItem(AUTH_TOKEN), REACT_APP_JWT_SECRETE);
	console.log(userId);
	return { userId, email };
};
