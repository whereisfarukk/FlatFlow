const router = require("express").Router();
const { meetingSchedulePostController } = require("../controllers/committee.controller");
const { isAuthenticated, isAdmin } = require("../middleware/auth.middleware");

router.post("/", isAuthenticated, isAdmin, meetingSchedulePostController);
module.exports = router;
