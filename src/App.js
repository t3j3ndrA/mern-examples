import React from "react";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";
const App = () => {
	axios.defaults.withCredentials = true;
	console.log(".back", process.env.REACT_APP_BACKEND);
	const [cookies, setCookie, removeCookie] = useCookies(["user-id"]);
	console.log("Sn frontend cookies = ", cookies);
	const handleGetRoot = () => {
		axios
			.get(process.env.REACT_APP_BACKEND, { withCredentials: true })
			.then((response) => response.data)
			.then((data) => {
				console.log(data);
			})
			.catch((err) => console.log(err));
	};
	const handleUser = () => {
		axios
			.get(process.env.REACT_APP_BACKEND + "/user", { withCredentials: true })
			.then((response) => response.data)
			.then((data) => {
				console.log("/user", data);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<button onClick={() => handleGetRoot()}>Get /</button>
			<button onClick={() => handleUser()}>Get /user</button>
		</div>
	);
};

export default App;
