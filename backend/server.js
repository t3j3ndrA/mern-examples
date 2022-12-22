const express = require("express");
const env = require("dotenv");
const path = require("path");

env.config();

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () =>
	console.log("server is up and running on port : " + port)
);

console.log("developed by : " + process.env.developer_name);

app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
	res.json({ msg: "server is up and running" });
});

// for the deployment
if (process.env.NODE_ENV === "production") {
	const __dirname = path.resolve();
	app.use(express.static(path.join(__dirname, "/frontend/build")));
	app.get("*", (req, res) =>
		res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
	);
}
