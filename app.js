const express = require("express");
const cors = require("cors");
const cookieParse = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
// console.log(process.env.client_base_url.toString());
app.use(
	cors({ credentials: true, origin: process.env.client_base_url.toString() })
);

app.use(express.json());
app.use(cookieParse());

app.get("/", (req, res) => {
	res.cookie("cross-site-cook", "hehe");
	res.json({ msg: "server is up and running" });
});

app.post("/", (req, res) => {
	console.log("cookie from client : ", req.cookies);
	res.cookie("server-cook", "server123", {
		sameSite: "none",
		secure: true,
	});
	return res.json({ uid: "client123", msg: "post: server is up and running" });
});

app.listen(process.env.PORT || 5000, () =>
	console.log("Litening on " + process.env.PORT || 5000)
);
