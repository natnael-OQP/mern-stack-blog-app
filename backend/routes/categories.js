const router = require("express").Router();
const {
	getCategory,
	createCategory,
} = require("../controller/categoryController");

router.post("/", createCategory);
router.get("/", getCategory);

module.exports = router;
