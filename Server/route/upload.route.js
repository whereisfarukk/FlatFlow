const router = require("express").Router();
const multer = require("multer");

const { uploadPdf } = require("../controllers/upload");
const upload = multer({ storage: multer.diskStorage({}), limits: { fileSize: 5000000 } });

router.post("/", upload.single("file"), uploadPdf);

module.exports = router;
