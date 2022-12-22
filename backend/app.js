import express from "express";
import cors from "cors";
import env from "dotenv";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// routes
import register from "./routes/register/register.js";
import user from "./routes/user/user.js";

// run consumer for listening for emails queue
import "./rabitmq/consumer.js";

env.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/api/v1/register", register);
app.use("/api/v1/user", user);

// health api
app.get("/api/v1", (req, res) => {
	res.json({ status: "Server is Up and running!" });
});

// react build provider
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log("__dirname = ", __dirname);

app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

// database connection
mongoose.connect(process.env.MONGODB_URI, () => {
	console.log("Successfuly connected with database");
});

// process.env.PORT is set in deployment by hosting site
const port = process.env.PORT | 5000;

app.listen(port, () => console.log(`Server is up and running on ${port}`));
