const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const url = process.env.DB_URL || "mongodb://localhost:27017/cyberquest";

const UserRoutes = require("./Routes/User");
const ProgramRoutes = require("./Routes/Program");

const app = express();
app.use(bodyParser.json());

mongoose
	.connect(url)
	.then(() => {
		console.log("MONGO CONNECTION OPEN!!!");
	})
	.catch((err) => {
		console.log("OH NO MONGO ERROR!!!!");
		console.log(err);
	});

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use("/user", UserRoutes);
app.use("/program", ProgramRoutes);

app.get("/", (req, res) => {
	res.status(200).json({
		message: "Things are working fine",
	});
});

app.listen(process.env.PORT || 8080, () => {
	console.log("Listening to http://localhost:8080");
});
