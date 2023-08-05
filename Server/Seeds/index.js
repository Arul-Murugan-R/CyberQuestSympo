const mongoose = require("mongoose");
const User = require("../Models/User");
require("dotenv").config();

const url =
	"mongodb+srv://Balaguru:Vatsala%40123@imageapp.aqnzhse.mongodb.net/cyberquest";

mongoose
	.connect(url)
	.then(() => {
		console.log("MONGO CONNECTION OPEN!!!");
	})
	.catch((err) => {
		console.log("OH NO MONGO ERROR!!!!");
		console.log(err);
	});

const userData = [
	{
		teamname: "jk",
		pass: "",
	},
];

const seedDb = async () => {
	for (const user of userData) {
		const { teamname: username } = user;
		const u = new User({
			username,
			password: `${username}@123`,
		});
		await u.save();
	}
};

seedDb().then(() => mongoose.connection.close());
