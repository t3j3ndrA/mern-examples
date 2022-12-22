const express = require("express");
const app = express();
const env = require("dotenv");

env.config();
const path = require("path");
const port = process.env.PORT || 5000;

app.listen(port, () =>
	console.log("server is up and running on port : " + port)
);

console.log("developed by : " + process.env.developer_name);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
	res.json({ msg: "server is up and running" });
});

// __dirname will give the abolute path of server.js file
// this middleware is responsible for serving static files
app.use(express.static(path.join(__dirname, "..", "/frontend/build")));

app.get("*", (req, res) =>
	// go one folder up to access frontend
	// go to build and serve index.html from there
	res.sendFile(path.join(__dirname, "..", "/frontend/build/index.html"))
);
