import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, min: 6 },
	isVerified: { type: Boolean, default: false },
});

export default mongoose.model("users", userSchema);
