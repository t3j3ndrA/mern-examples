import React, { useState, useEffect } from "react";
import { Link, useRoutes } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

const Navbar = () => {
	const [cookies, setCookie, removeCookie] = useCookies([
		"magic-link-kbhx.onrender.com",
	]);
	const [token, setToken] = useState("");
	const navigate = useNavigate();
	useState(() => {
		if (cookies.token) {
			console.log("cookies.token", cookies.token);
			console.log("cookies", cookies);
			setToken(cookies.token);
			console.log(token);
		}
	}, [cookies]);

	return (
		<nav>
			<div className=" px-5 py-2 bg-teal-500 flex flex-row justify-around    gap-6  ">
				<p className="text-2xl font-bold text-white">MyCompany</p>
				{token ? (
					<>
						{" "}
						<div className="text-white flex flex-row gap-3 content-center">
							<button
								onClick={() => {
									removeCookie("token");
									setToken("");
									navigate(0);
								}}
								className="text-white justify-end flex content-center"
							>
								Logout
							</button>
							<span>{token.firstName + " " + token.lastName}</span>
						</div>
					</>
				) : (
					<Link to={"/register"}>
						<p className="text-white justify-end">Register</p>
					</Link>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
