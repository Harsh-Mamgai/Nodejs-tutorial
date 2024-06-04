const express = require('express');
const postController = require('../controllers/postcontrollers.js');
const checkAuthMiddleware = require("../middleware/check-auth.js");

const router = express.Router();//helps to define groups of routes in separate files or modules,

router.post("/", checkAuthMiddleware.checkAuth, postController.save);
router.get("/", postController.index);
router.get("/:id", postController.show);
//patch method is used when you want to update only specific fields of resource without modifying the entire resource. 
router.patch("/:id", checkAuthMiddleware.checkAuth, postController.update);
router.delete("/:id", checkAuthMiddleware.checkAuth, postController.destroy);

module.exports = router;
