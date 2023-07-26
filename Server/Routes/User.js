const router = require("express").Router();
const userController = require("../Controllers/User");

router.get("/login", userController.login);
router.get("/logout", userController.logout);

module.exports = router;
