const ProgramModel = require("../Models/Program");

module.exports.save = async (req, res, next) => {
	try {
		const { userId, content } = req.body;
		const savedContent = await ProgramModel.findById(userId);
		if (savedContent) {
			savedContent.content = content;
			await savedContent.save();
		} else {
			const newcontent = new ProgramModel({ content, userId });
			await newcontent.save();
		}
		return res.status(200).json({
			message: "Saved",
		});
	} catch (e) {
		return res.status(400).json({
			message: "Unable to save! Try again",
		});
	}
};
