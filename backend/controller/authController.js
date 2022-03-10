const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../model/User");
// register

const register = asyncHandler(async (req, res) => {
	try {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			res.status("404").json({ message: "fill required fields" });
		}
		var salt = await bcrypt.genSalt(10);
		var hashPassword = await bcrypt.hash(password, salt);
		const user = await User.create({
			username,
			email,
			password: hashPassword,
		});
		res.status(200).json(user);
	} catch (error) {
		res.status("404").json({
			message: "username or password already taken!",
		});
	}
});
// login
const login = asyncHandler(async (req, res) => {
	try {
		const { username, password: Password } = req.body;
		const user = await User.findOne({ username });
		// check username
		!user && res.status("404").json({ message: "Wrong credentials" });
		// check password
		const match = await bcrypt.compare(Password, user.password);
		!match && res.status("404").json({ message: "Wrong credentials" });
		// if it matches
		const { password, ...others } = user._doc;
		res.status(200).json(others);
	} catch (error) {
		res.status("404").json({ message: "oops" });
	}
});

module.exports = {
	register,
	login,
};
