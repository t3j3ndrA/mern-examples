import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Register = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [success, setSuccess] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");

	const [cookies, setCookie, removeCookie] = useCookies(["name"]);
	const navigate = useNavigate();
	useEffect(() => {
		if (cookies.token) {
			navigate("/");
		}
	}, [cookies]);

	const validate = () => {
		if (!firstName) {
			setError(true);
			setErrorMessage("First Name cannot be empty");
			return false;
		}
		if (!lastName) {
			setError(true);
			setErrorMessage("Last Name cannot be empty");
			return false;
		}
		if (!email) {
			setError(true);
			setErrorMessage("Email cannot be empty");
			return false;
		}
		if (!password) {
			setError(true);
			setErrorMessage("Password cannot be empty");
			return false;
		}
		if (password !== confirmPassword) {
			setError(true);
			setErrorMessage("Password does not matches");
			return false;
		}
		return true;
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setSuccess(false);
		if (!validate()) return;
		setError(false);
		const user = { firstName, lastName, email, password };
		console.log("user >> ", user);
		const resposnse = await axios.post("/api/v1/register", user);
		const data = resposnse.data;
		if (data.code === 2) {
			setError(true);
			setErrorMessage(data.msg);
		}

		if (data.code === 1) {
			setSuccess(true);
			setSuccessMessage(data.msg);
		}
	};

	return (
		<>
			<Navbar />
			<form
				className="flex flex-col mx-auto gap-4 mt-10 content-center w-80"
				onSubmit={(e) => {
					onSubmit(e);
				}}
			>
				<input
					onChange={(e) => setFirstName(e.target.value)}
					type={"text"}
					name="firstName"
					className={
						"px-4 py-1  border-b-gray-300  border-b-2 outline-none focus:border-b-teal-700"
					}
					placeholder="First Name"
				/>
				<input
					onChange={(e) => setLastName(e.target.value)}
					name="lastName"
					type={"text"}
					className={
						"px-4 py-1  border-b-gray-300  border-b-2 outline-none focus:border-b-teal-700"
					}
					placeholder="Last Name"
				/>
				<input
					onChange={(e) => setEmail(e.target.value)}
					type={"text"}
					name="email"
					className={
						"px-4 py-1  border-b-gray-300  border-b-2 outline-none focus:border-b-teal-700"
					}
					placeholder="Email"
				/>
				<input
					onChange={(e) => setPassword(e.target.value)}
					type={"password"}
					name="password"
					className={
						"px-4 py-1  border-b-gray-300  border-b-2 outline-none focus:border-b-teal-700"
					}
					placeholder="Password"
				/>
				<input
					type={"password"}
					name="confirmPassword"
					onChange={(e) => setConfirmPassword(e.target.value)}
					className={
						"px-4 py-1  border-b-gray-300  border-b-2 outline-none focus:border-b-teal-700"
					}
					placeholder="Confirm Password"
				/>
				<p className="text-center text-red-700 text-sm">
					{error ? errorMessage : ""}
				</p>
				<p className="text-center text-green-700 text-sm">
					{!error && success ? successMessage : ""}
				</p>
				<button
					type="submit"
					className="rounded-md block  px-4 py-2 bg-teal-500 text-white"
				>
					Register
				</button>
			</form>
		</>
	);
};
