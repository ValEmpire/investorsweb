const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/user.middleware");

const { validate } = require("../validators");

const { imageUploadSchema } = require("../validators/image.validator");

const {
  uploadUserImage,
  updateUserImage,
} = require("../controllers/image.controller");

const { userImageMiddleware } = require("../middlewares/image.middleware");

router
  .route("/user")
  .post(userAuth, validate(imageUploadSchema), uploadUserImage)
  .put(
    userAuth,
    userImageMiddleware,
    validate(imageUploadSchema),
    updateUserImage
  );

module.exports = router;
