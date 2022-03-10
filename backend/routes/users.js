const express = require("express");
const {
	getUser,
	setUser,
	deleteUser,
	updateUser,
} = require("../controller/userController");
const router = express.Router();

router.get("/", getUser);

module.exports = router;
