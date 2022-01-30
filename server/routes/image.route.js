const express = require("express");
const router = express.Router();

const { validate } = require("../validators");

const { imageUploadSchema } = require("../validators/image.validator");

const { upload } = require("../controllers/image.controller");

const { imageMiddleware } = require("../middlewares/image.middleware");

router.route("/").post(validate(imageUploadSchema), upload);

module.exports = router;
