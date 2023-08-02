const ProgramModel = require("../Models/Program");
const axios = require("axios");
const { questionsData } = require("../questionData");
const userModel = require("../Models/User");
const options = {
	method: "POST",
	url: process.env.RAPID_API_URL,
	headers: {
		"content-type": "application/json",
		"x-compile": "rapidapi",
		"Content-Type": "application/json",
		"X-RapidAPI-Key": process.env.RAPID_API_KEY,
		"X-RapidAPI-Host": process.env.RAPID_API_HOST,
	},
	data: {
		language: "",
		lang: "",
		code: "",
		input: "",
	},
};

module.exports.save = async (req, res, next) => {
	try {
		const { userId, content, questionNo, language, compilerId } = req.body;
		const savedContent = await ProgramModel.findOne({ userId, questionNo });
		if (savedContent) {
			savedContent.content = content;
			savedContent.language = language;
			savedContent.compilerId = compilerId;
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
				compilerId,
			});
			await newcontent.save();
			return res.status(200).json({
				message: "Saved",
				code: newcontent.content,
				questionNo: newcontent.questionNo,
				language: newcontent.language,
				compilerId: newcontent.compilerId,
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

module.exports.submitProgram = async (req, res, next) => {
	try {
		const { language, code, questionNo, userId } = req.body;
		let pass = true;

		if (language === "c") {
			options.url = process.env.C_COMPILER_URL;
			options.headers["X-RapidAPI-Host"] = process.env.C_COMPILER_HOST;
			options.data.language = language;
		}

		options.data.lang = language;
		const user = await userModel.findById(userId);

		if (
			user.hintsFound.findIndex(
				(item) => item.questionNo === questionNo
			) === -1
		) {
			for (const item of questionsData[questionNo - 1].hiddenTestCase) {
				options.data.code = code;
				options.data.input = item.input;

				const response = await axios.request(options);
				console.log(response.data)
				if (response.data.output.replaceAll("\n", "") !== item.output) {
					console.log(response.data.output,response.data.output.replaceAll("\n", ""));
					pass = false;
					break;
				}
			}
			if (pass) {
				user.hintsFound.push({
					hint: questionsData[questionNo - 1].finalOutput,
					questionNo,
				});
				await user.save();
				return res.status(200).json({
					message: "All test cases passed!",
					hint: questionsData[questionNo - 1].finalOutput,
					questionNo,
				});
			}
			return res.status(201).json({
				message: "Hidden test case failure!",
			});
		} else
			return res.status(202).json({
				message: "All test cases passed!",
			});
	} catch (e) {
		console.log(e);
		return res.status(400).json({
			message: "Error occured!",
		});
	}
};
