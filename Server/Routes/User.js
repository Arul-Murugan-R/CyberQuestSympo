const router = require("express").Router();
const userController = require("../Controllers/User");

router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.post("/gethints", userController.getHints);

module.exports = router;
