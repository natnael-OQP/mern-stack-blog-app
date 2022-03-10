const express = require("express");
const router = express.Router();
// controller
const {
	deleteUser,
	updateUser,
	getUser,
} = require("../controller/userController");

router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
