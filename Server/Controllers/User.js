const userModel = require("../Models/User");

module.exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await userModel.findOne({ username });
		if (user.password === password && !user.firstLogin) {
			user.firstLogin = true;
			return res.status(200).json({
				message: "Login success!",
				user,
			});
		} else {
			const { secret } = req.body;
			if (secret === process.env.SECRET)
				return res.status(200).json({
					message: "Login success!",
					user,
				});
		}
		return res.status(400).json({
			message: "Authentication failure!",
			user,
		});
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
