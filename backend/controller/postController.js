const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const Post = require("../model/Post");

// GET POST
const getPost = asyncHandler(async (req, res) => {
	try {
		var post = await Post.findById(req.params.id);
		if (!post) {
			res.status(401).json({ message: "Post NOT Found" });
		}
		res.status(200).json(post);
	} catch (error) {
		res.status(401).json(error);
	}
});
// GET ALL POST
const getAllPost = asyncHandler(async (req, res) => {
	try {
		let post;
		const { cat, user } = req.query;
		if (user) {
			post = await Post.find({ username: user });
		} else if (cat) {
			post = await Post.find({
				categories: { $in: [cat] },
			});
		} else if (!cat || !user) {
			post = await Post.find();
		} else {
			res.status(401).json({ message: "Posts NOT Found" });
		}
		res.status(200).json(post);
	} catch (error) {
		res.status(401).json(error);
	}
});
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
const updatePost = asyncHandler(async (req, res) => {
	try {
		const { title, desc, username, photo, categories } = req.body;
		const post = await Post.findById(req.params.id);
		if (!post) {
			res.status(400).json({ message: "Post NOT Found" });
		}
		if (username === post.username) {
			const newPost = {
				title,
				desc,
				username,
				photo,
				categories,
			};
			const updatedPost = await Post.findByIdAndUpdate(
				req.params.id,
				newPost,
				{ new: true }
			);
			res.status(200).json(updatedPost);
		} else {
			res.status(401).json({ message: "you can delete only  your post" });
		}
	} catch (error) {
		res.status(400).json(error);
	}
});
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
	getAllPost,
	createPost,
	deletePost,
	updatePost,
};
