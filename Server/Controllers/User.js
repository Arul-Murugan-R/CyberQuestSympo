const userModel = require("../Models/User");

module.exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await userModel.findOne({ username });
		if (!user)
			return res.status(400).json({
				message: "User not found!",
			});
		if (!user.firstLogin && user.password === password) {
			user.firstLogin = true;
			await user.save();
			return res.status(200).json({
				message: "Login success!",
				user,
			});
		} else {
			if (password === process.env.SECRET) {
				user.logoutCount += 1;
				await user.save();
				return res.status(200).json({
					message: "Login success!",
					user,
				});
			} else {
				return res.status(500).json({
					message:
						"Your password had been changed. Consult organisers.",
				});
			}
		}
		// return res.status(400).json({
		// 	message: "Authentication failure!",
		// 	user,
		// });
	} catch (e) {
		return res.status(400).json({
			message: "Login error! Try again",
			error: e,
		});
	}
};

module.exports.logout = (req, res, next) => {
	try {
		return res.status(200).json({
			message: "Logout success!",
		});
	} catch (e) {
		return res.status(400).json({
			message: "Logout unsuccessfull! Try again",
			error: e,
		});
	}
};

module.exports.getHints = async (req, res, next) => {
	const { userId } = req.body;
	try {
		const user = await userModel.findById(userId);
		if (user.hintsFound.length > 0)
			return res.status(200).json({
				hints: user.hintsFound,
			});
		return res.status(201).json({
			message: "No hints found",
		});
	} catch (e) {
		return res.status(210).json({
			message: "Fetch unsuccessfull! Try again",
			error: e,
		});
	}
};
