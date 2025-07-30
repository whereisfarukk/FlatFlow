const router = require("express").Router();

const { signupPostController, loginPostController, logoutController, updatePasswordController, updateEmailController, whoAmI } = require("../controllers/authController");

router.get("/me", whoAmI);

router.post("/register", signupPostController);
router.post("/login", loginPostController);
router.post("/change-password", updatePasswordController);
router.post("/change-email", updateEmailController);
router.post("/logout", logoutController);

module.exports = router;
