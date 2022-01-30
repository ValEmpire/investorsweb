const express = require("express");
const router = express.Router();

const { validate } = require("../validators");

const { imageUploadSchema } = require("../validators/image.validator");

const {
  uploadUserImage,
  updateUserImage,
} = require("../controllers/image.controller");

const { userImageMiddleware } = require("../middlewares/image.middleware");

router
  .route("/")
  .post(validate(imageUploadSchema), uploadUserImage)
  .put(userImageMiddleware, validate(imageUploadSchema), updateUserImage);

module.exports = router;
