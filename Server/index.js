const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
require("dotenv").config();

const UserRoutes = require("./Routes/User");
const ProgramRoutes = require("./Routes/Program");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,PATCH,DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
	next();
});

const url = process.env.DB_URL || "mongodb://localhost:27017/cyberquest";

mongoose
	.connect(url)
	.then(() => {
		console.log("MONGO CONNECTION OPEN!!!");
	})
	.catch((err) => {
		console.log("OH NO MONGO ERROR!!!!");
		console.log(err);
	});

app.use("/user", UserRoutes);
app.use("/program", ProgramRoutes);

app.use("/", (req, res) => {
	res.status(200).json({
		message: "Things are working fine",
	});
});
app.all("*", (req, res, next) => {
	next(new ExpressError("Page not found", 404));
});
app.listen(process.env.PORT || 8080, () => {
	console.log("Listening to http://localhost:8080");
});