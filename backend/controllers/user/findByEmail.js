import user from "../../models/user.js";

const findByEmail = async (email) => {
	const foundUser = await user.findOne({ email });
	return foundUser;
};
export default findByEmail;
