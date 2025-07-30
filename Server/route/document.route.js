const router = require("express").Router();
const multer = require("multer");

// importing middlewares
const { isAuthenticated } = require("../middleware/auth.middleware");

const { documentPostController, documentGetController } = require("../controllers/document.controller");
const upload = multer({ storage: multer.diskStorage({}), limits: { fileSize: 5000000 } });

router.post("/", upload.single("file"), documentPostController);
router.get("/", isAuthenticated, documentGetController);
module.exports = router;
