const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Program = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	content: {
		type: String,
	},
	questionNo: {
		type: String,
		required: true,
	},
	language:{
		type:String,
	},
	compilerId:{
		type:String,
	}
});

module.exports = mongoose.model("Program", Program);
