const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const UserRoutes = require("./Routes/User");

const app = express();
app.use(express.json());

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

app.listen(5000, () => console.log("Server running at 5000"));
