const asyncHandler = require("express-async-handler");
const User = require("../model/User");
// register

const register = asyncHandler(async (req, res) => {
	try {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			res.status("404").json({ message: "fill required fields" });
		}
		const user = await User.create({
			username,
			email,
			password,
		});
		res.status(200).json(user);
	} catch (error) {
		res.status("404").json({ message: error });
	}
});
// login
const login = asyncHandler(async (req, res) => {});

module.exports = {
	register,
	login,
};
