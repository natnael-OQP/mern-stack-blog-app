const router = require("express").Router();
const {
	createPost,
	deletePost,
	updatePost,
	getPost,
    getAllPost,
} = require("../controller/postController");

router.get("/", getAllPost);
router.get("/:id", getPost);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

module.exports = router;
