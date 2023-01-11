const express = require("express");
const cors = require("cors");
const cookieParse = require("cookie-parser");
const dotenv = require("dotenv");
const session = require("express-session");
dotenv.config();

const app = express();

const host =
	process.env.NODE_ENV === "production"
		? process.env.client_base_url.toString()
		: "http://localhost:3000";

console.log("host is : ", host);
app.use(
	cors({ origin: "https://cookies-client-1.onrender.com", credentials: true })
);
app.use(express.json());
app.use(cookieParse());

// app.use(
// 	session({
// 		secret: "my-secrets-1234",
// 		saveUninitialized: true,
// 		resave: false,
// 		cookie: {
// 			httpOnly: true,
// 			maxAge: 60 * 60,
// 		},
// 	})
// );

app.get("/", (req, res) => {
	// req.session.user = "tej";
	res.cookie("user-id", "tej123", {
		httpOnly: true,
		domain: "onrender.com",
	});
	res.cookie("faltu", "not-working", { domain: "onrender.com" });

	res.json({ msg: "server is up and running" });
});

app.get("/user", (req, res) => {
	const cookies = req.cookies;
	res.json({ cookies: cookies });
});

app.listen(process.env.PORT || 5000, () =>
	console.log("Litening on " + (process.env.PORT || 5000))
);
