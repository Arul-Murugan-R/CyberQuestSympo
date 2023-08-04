const mongoose = require("mongoose");
const User = require("../Models/User");
require("dotenv").config();

const url = "";

mongoose
	.connect(url)
	.then(() => {
		console.log("MONGO CONNECTION OPEN!!!");
	})
	.catch((err) => {
		console.log("OH NO MONGO ERROR!!!!");
		console.log(err);
	});

const userData = [];

const seedDb = async () => {
	for (const user of userData) {
		const { username, password } = user;
		const u = new User({
			username,
			password,
		});
		await u.save();
	}
};

seedDb().then(() => mongoose.connection.close());
