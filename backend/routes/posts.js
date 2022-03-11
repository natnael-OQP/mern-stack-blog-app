const router = require("express").Router();
const {
	createPost,
	deletePost,
	updatePost,
	getPost,
} = require("../controller/postController");

router.post("/", createPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);
router.get("/:id", getPost);

module.exports = router;
