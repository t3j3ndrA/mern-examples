import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const App = () => {
	const [cookies, setCookie, removeCookie] = useCookies(["name"]);
	const [token, setToken] = useState("");
	const navigate = useNavigate();
	console.log("cookies-tokne", cookies);
	useState(() => {
		if (cookies.token) {
			console.log("cookies.token", cookies.token);
			console.log("cookies", cookies);
			setToken(cookies.token);
			console.log(token);
		}
	}, [cookies]);

	if (token)
		return (
			<>
				<Navbar />
				<div className="mx-auto">
					<p className="text-center mt-10 text-2xl">
						Welcome {token.firstName + " " + token.lastName}
					</p>
					<button
						onClick={() => {
							removeCookie("token");
							setToken("");
							navigate(0);
						}}
						className="rounded-md block mt-5 mx-auto px-4 py-2 bg-teal-400 text-white"
					>
						Logout
					</button>
					<p className="text-center mt-5 text-2xl">
						Wooh! You are now registered with {token.email}
					</p>
				</div>
			</>
		);
	return (
		<>
			<Navbar />
			<div className="mx-auto">
				<p className="text-center mt-10 text-2xl">No user is registered</p>
				<Link to="/register">
					<button className="rounded-md block mt-5 mx-auto px-4 py-2 bg-teal-400 text-white">
						Register
					</button>
				</Link>
				<p className="text-center mt-5 text-2xl">
					Please register to continue using our services
				</p>
			</div>
		</>
	);
};

export default App;
