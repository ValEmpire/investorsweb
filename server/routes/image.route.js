const express = require("express");
const router = express.Router();

/**
 * Validators
 */
const { validate } = require("../validators");
const { imageUploadSchema } = require("../validators/image.validator");

/**
 * Middlewares
 */
const { userImageMiddleware } = require("../middlewares/image.middleware");
const { projectImageMiddleware } = require("../middlewares/image.middleware");
const { userAuth } = require("../middlewares/user.middleware");

/**
 * Controllers
 */
const {
  uploadProjectImage,
  updateProjectImage,
} = require("../controllers/image.controller");

const {
  uploadUserImage,
  updateUserImage,
} = require("../controllers/image.controller");

/**
 * Enpoints
 */
router
  .route("/user")
  .post(userAuth, validate(imageUploadSchema), uploadUserImage)
  .put(
    userAuth,
    validate(imageUploadSchema),
    userImageMiddleware,
    updateUserImage
  );

router
  .route("/project")
  .post(
    userAuth,
    validate(imageUploadSchema),
    projectImageMiddleware,
    uploadProjectImage
  )
  .put(
    userAuth,
    validate(imageUploadSchema),
    projectImageMiddleware,
    updateProjectImage
  );

module.exports = router;
