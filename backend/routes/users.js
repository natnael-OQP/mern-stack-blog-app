const express = require("express");
const router = express.Router();
// controller
const { deleteUser, updateUser } = require("../controller/userController");

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
