import user from "../../models/user.js";

const saveUser = (firstName, lastName, password, email) => {
	const newUser = new user({ firstName, lastName, password, email });
	return newUser.save();
};

export default saveUser;
