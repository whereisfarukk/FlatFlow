const router = require("express").Router();
const { financialRecordPostController } = require("../controllers/financialReport.controller");
router.post("/", financialRecordPostController);
module.exports = router;
