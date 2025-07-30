const router = require("express").Router();
const { announcementController } = require("../controllers/announcement.controller");

// importing middlewares
const { isAuthenticated } = require("../middleware/auth.middleware");

router.post("/", isAuthenticated, announcementController);

module.exports = router;
