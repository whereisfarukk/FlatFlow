const router = require("express").Router();

const { signupPostController, loginPostController, logoutController } = require("../controllers/authController");

router.post("/register", signupPostController);
router.post("/login", loginPostController);
router.post("/logout", logoutController);

module.exports = router;
