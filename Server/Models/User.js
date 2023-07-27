const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
	},
	secret: {
		type: String,
	},
	firstLogin: {
		type: Boolean,
		required: true,
		default: false,
	},
});

module.exports = mongoose.model("User", userModel);
