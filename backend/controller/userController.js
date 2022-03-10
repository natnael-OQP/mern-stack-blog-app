const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const Post = require("../model/Post");
const bcrypt = require("bcrypt");
// GET
const getUser = asyncHandler(async (req, res) => {
	if (req.body.userID === req.params.id) {
		try {
			var user = await User.findById(req.params.id);
			if (!user) {
				res.status(401).json({ message: "User NOT Found" });
			}
			const { password, ...others } = user._doc;
			res.status(200).json(others);
		} catch (error) {
			res.status(401).json(error);
		}
	} else {
		res.status(401).json({ message: "you can Get only  your account" });
	}
});

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
			res.status(401).json({
				message: "write what you want to update!",
			});
		}
	} else {
		res.status(401).json({
			message: "you can update only our account !",
		});
	}
});
// DELETE
const deleteUser = asyncHandler(async (req, res) => {
	if (req.body.userID === req.params.id) {
		try {
			var user = await User.findById(req.params.id);
			if (!user) {
				res.status(401).json({ message: "User NOT Found" });
			}
			await Post.deleteMany({ username: user.username });
			await User.findByIdAndDelete(req.body.userID);
			res.status(200).json({ message: "user deleted successfully" });
		} catch (error) {
			res.status(401).json(error);
		}
	} else {
		res.status(401).json({ message: "you can only delete your account" });
	}
});

module.exports = {
	getUser,
	deleteUser,
	updateUser,
};
