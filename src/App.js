import { useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
	const [cookies, setCookie, removeCookie] = useCookies();
	const serverUri = "https://cookies-server.onrender.com/";
	const logIn = () => {
		axios
			.post(serverUri)
			.then((response) => response.data)
			.then((data) => {
				console.log(data);
				setCookie("logged-in-user", data?.uid);
			})
			.catch((errr) => console.log(errr));
	};

	const handleLogOut = () => {
		removeCookie("logged-in-user");
	};

	console.log("cookie : ", cookies);
	useEffect(() => {
		setCookie("initial", "initial-cookie");
	}, []);

	const handleGet = () => {
		axios
			.get(serverUri)
			.then((resp) => resp.data)
			.then((data) => console.log(data));
	};
	return (
		<div>
			<p>App</p>
			<button
				onClick={() => {
					logIn();
				}}
			>
				Log in
			</button>
			<button
				onClick={() => {
					handleLogOut();
				}}
			>
				Log out
			</button>
			<button
				onClick={() => {
					handleGet();
				}}
			>
				Set get cookie
			</button>
		</div>
	);
}

export default App;
