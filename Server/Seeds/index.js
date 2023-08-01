const mongoose = require("mongoose");
const User = require("../Models/User");
require("dotenv").config();

const url = process.env.DB_URL;

mongoose
	.connect(url || "mongodb://localhost:27017/imageApp")
	.then(() => {
		console.log("MONGO CONNECTION OPEN!!!");
	})
	.catch((err) => {
		console.log("OH NO MONGO ERROR!!!!");
		console.log(err);
	});

const userData = [
	{
		username: "",
		password: "",
		secret: "",
	},
];

const seedDb = async () => {
	for (const user of userData) {
		const { username, password, secret } = user;
		const u = new User({
			username,
			password,
			secret,
		});
		await u.save();
	}
};

seedDb().then(() => mongoose.connection.close());
