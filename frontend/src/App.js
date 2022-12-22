import "./App.css";
import axios from "axios";

function App() {
	const handleGet = () => {
		axios
			.get("/api")
			.then((response) => console.log(response.data))
			.catch((err) => console.log(err));
	};
	const handleLogin = () => {
		axios
			.post("/api/login", { username: "tejendra", password: "pass@123" })
			.then((response) => console.log(response.data))
			.catch((err) => console.log(err));
	};
	console.log(process.env.REACT_APP_DEV_NAME);
	return (
		<>
			<h1>A sample fullstack app</h1>
			<button
				onClick={() => {
					handleGet();
				}}
			>
				GET /
			</button>
			<button
				onClick={() => {
					handleLogin();
				}}
			>
				LOG IN
			</button>
		</>
	);
}

export default App;
