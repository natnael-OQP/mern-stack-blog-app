const router = require("express").Router();
const { createPost } = require("../controller/postController");

router.post("/", createPost);

module.exports = router;
