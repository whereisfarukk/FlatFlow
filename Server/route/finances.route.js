const router = require("express").Router();
const { financialRecordPostController } = require("../controllers/financialReport.controller");
// importing middlewares
const { isAuthenticated } = require("../middleware/auth.middleware");

router.post("/", isAuthenticated, financialRecordPostController);
module.exports = router;
