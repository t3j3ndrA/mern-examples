import "./App.css";
import axios from "axios";

function App() {
	const handleGet = () => {
		axios
			.get("/api")
			.then((response) => console.log(response.data))
			.catch((err) => console.log(err));
	};

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
		</>
	);
}

export default App;
