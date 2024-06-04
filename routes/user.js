const express = require("express");
const userController = require("../controllers/usercontroller.js");
const router = express.Router();

router.post("/sign-up", userController.signUp);
router.post("/login", userController.login);

module.exports = router;