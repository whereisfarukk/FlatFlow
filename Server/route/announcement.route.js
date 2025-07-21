const router = require("express").Router();
const { announcementController } = require("../controllers/announcement.controller");
router.post("/", announcementController);

module.exports = router;
