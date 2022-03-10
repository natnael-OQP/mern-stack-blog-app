const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const Post = require("../model/Post");
//  create post
const createPost = asyncHandler(async (req, res) => {
	try {
		const { title, desc, username, photo, categories } = req.body;
		if (!username || !title || !desc) {
			res.status(400).json({ message: "fill required fields" });
		}
		const post = await Post.create({
			title,
			desc,
			username,
			photo,
			categories,
		});
		res.status(200).json(post);
	} catch (error) {
		res.status(400).json({
			message: "title already taken!",
		});
	}
});
// GET
const getPost = asyncHandler(async (req, res) => {
	// if (req.body.userID === req.params.id) {
	// 	try {
	// 		var user = await User.findById(req.params.id);
	// 		if (!user) {
	// 			res.status(401).json({ message: "User NOT Found" });
	// 		}
	// 		const { password, ...others } = user._doc;
	// 		res.status(200).json(others);
	// 	} catch (error) {
	// 		res.status(401).json(error);
	// 	}
	// } else {
	// 	res.status(401).json({ message: "you can Get only  your account" });
	// }
});

const deletePost = asyncHandler(async (req, res) => {});
const updatePost = asyncHandler(async (req, res) => {});

module.exports = {
	getPost,
	createPost,
	deletePost,
	updatePost,
};
