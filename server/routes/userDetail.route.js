const express = require("express");
const router = express.Router();

/**
 * Validators
 */
const { validate } = require("../validators");
const {
  createUserDetailSchema,
} = require("../validators/userDetail.validator");

/**
 * Middlewares
 */
const { userAuth } = require("../middlewares/user.middleware");
const {
  userDetailMiddleware,
} = require("../middlewares/userDetail.middleware");

/**
 * Controllers
 */
const {
  createUserDetail,
  updateUserDetail,
  deleteUserDetail,
} = require("../controllers/userDetails.controller");

/**
 * Endpoints
 */
router
  .route("/")
  .post(
    userAuth,
    validate(createUserDetailSchema),
    userDetailMiddleware,
    createUserDetail
  )
  .put(
    userAuth,
    validate(createUserDetailSchema),
    userDetailMiddleware,
    updateUserDetail
  )
  .delete(userAuth, userDetailMiddleware, deleteUserDetail);

module.exports = router;
