const ProgramModel = require("../Models/Program");

module.exports.save = async (req, res, next) => {
	try {
		const { userId, content, questionNo ,language,compilerId } = req.body;
		const savedContent = await ProgramModel.findOne({ userId, questionNo });
		if (savedContent) {
			savedContent.content = content;
			savedContent.language = language
			savedContent.compilerId = compilerId
			await savedContent.save();
			return res.status(201).json({
				message: "Saved",
				program: savedContent,
			});
		} else {
			const newcontent = new ProgramModel({
				content,
				userId,
				questionNo,
				language,
				compilerId
			});
			await newcontent.save();
			return res.status(200).json({
				message: "Saved",
				code: newcontent.content,
				questionNo: newcontent.questionNo,
				language:newcontent.language,
				compilerId:newcontent.compilerId
			});
		}
	} catch (e) {
		return res.status(400).json({
			message: "Unable to save! Try again",
		});
	}
};

module.exports.getAllPrograms = async (req, res, next) => {
	try {
		const { userId } = req.body;
		const allPrograms = await ProgramModel.find({ userId });
		if (allPrograms)
			return res.status(200).json({
				message: "Success!",
				programs: allPrograms,
			});
	} catch (e) {
		return res.status(400).json({
			message: "Error",
			error: e,
		});
	}
};
