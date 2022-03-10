const { register } = require("../controller/registerController");
const router = require("express").Router();

router.post("/register", register);

module.exports = router;
