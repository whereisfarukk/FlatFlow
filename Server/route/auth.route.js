const router = require("express").Router();

const { signupPostController, loginPostController, logoutController, updatePasswordController } = require("../controllers/authController");

router.post("/register", signupPostController);
router.post("/login", loginPostController);
router.post("/change-password", updatePasswordController);
router.post("/logout", logoutController);

module.exports = router;
