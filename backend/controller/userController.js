const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt = require("bcrypt");
// GET
const getUser = asyncHandler(async (req, res) => {
	try {
	} catch (error) {}
});
// SET
const setUser = asyncHandler(async (req, res) => {});
// DELETE
const deleteUser = asyncHandler(async (req, res) => {});
// UPDATE
const updateUser = asyncHandler(async (req, res) => {
	if (req.body.userID === req.params.id) {
		var { userID, username, email, password, profilePic } = req.body;
		if (username || email || profilePic || password) {
			if (password) {
				// hash password
				const salt = await bcrypt.genSalt(10);
				password = await bcrypt.hash(password, salt);
			}
			try {
				// new data
				const userData = {
					username,
					email,
					profilePic,
					password,
				};
				const user = await User.findByIdAndUpdate(userID, userData, {
					new: true,
				});
				res.status(200).json(user);
			} catch (error) {}	
		} else {
			res.status("401").json({
				message: "write what you want to update!",
			});
		}
	} else {
		res.status("401").json({
			message: "you can update only our account !",
		});
	}
});

module.exports = {
	getUser,
	setUser,
	deleteUser,
	updateUser,
};
