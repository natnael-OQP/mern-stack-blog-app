const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const Post = require("../model/Post");

// GET
const getPost = asyncHandler(async (req, res) => {});
//  CREATE POST
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
// UPDATE POST
const updatePost = asyncHandler(async (req, res) => {});
// DElETE POST
const deletePost = asyncHandler(async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			res.status(400).json({ message: "Post NOT Found" });
		}
		if (req.body.username === post.username) {
			await Post.findByIdAndDelete(req.params.id);
			res.status(200).json({ message: "post deleted successfully" });
		} else {
			res.status(401).json({ message: "you can delete only  your post" });
		}
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = {
	getPost,
	createPost,
	deletePost,
	updatePost,
};
